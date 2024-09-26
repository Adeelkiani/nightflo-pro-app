import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import { useState } from "react";
import RootViewKeyboard from "../../components/RootViewKeyboard";
import LatoText from "../../auth/LatoText";
import BackArrowButton from "../../components/BackArrowButton";
import SignupForm from "../../auth/SignupForm";
import Button from "../../components/Button";
import { modifyuser } from "../../../redux/UserReucer";
import {
  storeUserData,
  updateClubImage,
} from "../../../utils/TallyAsyncStorage";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { BASE_URL, getAxiosClient } from "../../apis/TallyApi";
import { showAlert } from "../../../utils/Alert";
import axios from "axios";
import * as Application from "expo-application";
import Loading from "../../components/Loading";

export const fetchImageFromUri = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

const SignUpScreen = ({ route, navigation }) => {
  const { userType } = route.params;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    clubName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    location: "",
    imageUri: "",
  });
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    clubName: userType != "CLUB_OWNER",
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    city: false,
    location: false,
    imageUri: false,
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function submitHandler() {
    console.log("User Info Screen Signup was Clicked");
    const namePattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let clubNameIsValid = formData.clubName?.trim().length > 2;
    let nameIsValid = namePattern.test(formData.fullName?.trim());
    let emailIsValid = emailPattern.test(formData.email?.trim());
    let passwordIsValid = formData.password.length >= 6;
    let confirmPasswordIsValid = formData.password === formData.confirmPassword;
    let cityIsValid = formData.city.trim().length > 2;
    let locationIsValid = formData.location.length > 6;
    console.log("city ", formData.city);

    setCredentialsInvalid({
      clubName: !clubNameIsValid,
      name: !nameIsValid,
      email: !emailIsValid,
      password: !passwordIsValid,
      confirmPassword: !confirmPasswordIsValid,
      city: !cityIsValid,
      location: !locationIsValid,
    });

    if (userType == "CLUB_OWNER" && !clubNameIsValid) {
      showAlert("Invalid Club Name Entered");
      return;
    }

    if (!nameIsValid) {
      showAlert("Please enter a valid full name");
      return;
    }

    if (!emailIsValid) {
      showAlert("Please enter a valid email address");
      return;
    }

    if (!passwordIsValid) {
      showAlert("Please enter a valid password, minimum of 6 characters");
      return;
    }

    if (!confirmPasswordIsValid) {
      showAlert("Password doesn't match");
      return;
    }

    if (!cityIsValid) {
      showAlert("Please select a valid City");
    }

    if (!locationIsValid) {
      showAlert("Please select a valid location");
    }

    if (nameIsValid && locationIsValid) {
      dispatch(
        modifyuser({ fullName: formData.fullName, address: formData.location })
      );
      console.log("Moving to OTP Scrren");

      signupUser();
    } else {
    }
  }

  const storeData = async (value) => {
    try {
      await storeUserData(value);
    } catch (e) {
      console.error(e);
    }
  };

  const signupUser = async () => {
    if (!formData.imageUri) {
      showAlert(
        "Please Select a " +
          (userType == "CLUB_OWNER" ? "Club" : "Profile") +
          " Picture"
      );
      return;
    }

    setIsLoading(true);
    var userPayload = {
      email: formData.email,
      password: formData.password?.trim(),
      fullName: formData.fullName?.trim(),
      userType: userType,
      address: formData.location,
    };

    if (userType == "CLUB_OWNER") {
      userPayload = {
        name: formData.clubName,
        ownerName: formData.fullName?.trim(),
        ownerEmail: formData.email?.trim(),
        password: formData.password?.trim(),
        imageUrl: formData.imageUri,
        location: formData.location,
        city: formData.city?.trim(),
      };
    }

    try {
      if (userType == "CLUB_OWNER") {
        var response = await getAxiosClient().post(
          "clubRegistration/registerWithAccount",
          userPayload
        );

        let userData = {};
        let imageResponse = {};

        if (formData.imageUri) {
          imageResponse = await handleImagePicked(
            formData.imageUri,
            response,
            `clubImage/${response.data.payLoad.club.id}`
          );
        }

        userData = {
          ...response.data.payLoad,
          club: {
            ...response.data.payLoad?.club,
            imageUrl: imageResponse?.data?.payLoad?.imageUrl ?? "",
          },
        };

        console.log("SAVING CLUB: ", userData);
        await storeData(userData);
        dispatch(modifyuser({ ...userData }));
      } else {
        var response = await getAxiosClient().post(
          "/users/signup",
          userPayload
        );
        if (formData.imageUri) {
          imageResponse = await handleImagePicked(
            formData.imageUri,
            response,
            "userimage"
          );
        }

        userData = {
          ...response.data.payLoad,
          imageUrl: imageResponse?.data?.payLoad?.imageUrl,
        };

        await storeData(userData);
        dispatch(modifyuser({ ...response.data.payLoad }));
      }

      console.log("stored and dispatching userData");
    } catch (err) {
      let response = parseExpoError(err);

      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagePicked = async (
    result,
    response,
    endPoint = "userimage"
  ) => {
    let appVersion = Application.nativeApplicationVersion ?? "1.0.0";

    let imageResponse = await axios.get(`${BASE_URL}${endPoint}`, {
      headers: {
        Authorization: `Bearer ${response.data.payLoad.token}`,
        appVersion: appVersion,
        platform: Platform.OS,
      },
    });

    let signedUrl = imageResponse.data.payLoad.signedUrl;

    const imageExt = "jpg";
    const imageMime = `image/jpg`;
    const img = await fetchImageFromUri(result);

    await fetch(signedUrl, {
      method: "PUT",
      body: img,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    return imageResponse;
  };

  return (
    <>
      <SafeAreaView style={GlobalStyles.themeContainer}>
        <BackArrowButton />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.textContainer}>
              <LatoText style={styles.largeText}>
                {userType == "CLUB_OWNER"
                  ? "Register your club"
                  : "Register your account"}
              </LatoText>
            </View>
            <View style={styles.topSpace}></View>
            <View style={styles.authContainer}>
              <SignupForm
                userType={userType}
                formData={formData}
                credentialsInvalid={credentialsInvalid}
                onInputChange={handleInputChange}
                navigation={navigation}
              />
            </View>
          </ScrollView>
          <View style={styles.buttons}>
            <Button height={60} onPress={submitHandler}>
              {"Register"}
            </Button>
          </View>
        </View>
        <Loading isLoading={isLoading} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  scrollContainer: { height: Dimensions.get("window").height },
  largeText: {
    fontSize: 34,
    color: "white",
    marginVertical: 9,
    fontWeight: "bold",
    alignSelf: "center",
  },
  smallText: {
    fontSize: 16,
    color: "white",
    marginVertical: 9,
  },
  topSpace: {
    marginTop: 25,
  },
  mainContainer: {
    flex: 1,
  },
  bottomSpace: {
    flex: 0,
  },
  imageContainer: {
    marginLeft: 23,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: "5%",
  },
  authContainer: {
    padding: 16,
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    color: GlobalConsts.Colors.white,
    fontSize: 18,
    marginLeft: 25,
    fontFamily: "Poppins",
  },
  space: { margin: 10 },
});

export default SignUpScreen;
