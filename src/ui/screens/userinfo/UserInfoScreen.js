import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts.js";
import BackButton from "../../components/BackButton.js";
import Button from "../../components/Button.js";
import { showAlert } from "../../../utils/Alert.js";
import { modifyuser } from "../../../redux/UserReucer.js";
import { BASE_URL, getAxiosClient } from "../../apis/TallyApi.js";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { parseExpoError } from "../../../utils/AxiosErrorParser.js";
import { storeUserData } from "../../../utils/TallyAsyncStorage.js";
import RootViewKeyboard from "../../components/RootViewKeyboard.js";
import LatoText from "../../auth/LatoText.js";
import CameraSvg from "../../../svgs/CameraSvg.js";
import axios from "axios";
import * as Application from "expo-application";
import CustomTextInput from "../../components/CustomTextInput.js";
import { MD2Colors } from "react-native-paper";

export const fetchImageFromUri = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};
export const pickImage = async () => {
  const cameraRollStatus =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  // const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
  if (cameraRollStatus.status !== "granted") {
    showAlert("Permission is required to access photos.");
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (result.cancelled) {
    return;
  }

  const manipResult = await manipulateAsync(
    result.assets[0].uri,
    [{ resize: { width: 300 } }],
    { compress: 1, format: SaveFormat.JPEG }
  );

  return manipResult.uri;
};

const UserInfoScreen = ({ route }) => {
  const [geoLocation, setGeoLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchParams = () => {
      if (route.params && route.params.location) {
        console.log("CreateEventFunctionalComponent", route.params.location);
        setLocation(route.params.location);
      } else {
        console.log("CreateEventFunctionalComponent nothing passed");
      }
    };

    fetchParams();
  }, [route]);

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const [inputInvalid, setInputInvalid] = useState({
    fullName: false,
    location: false,
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  function updateInputValueHandler(inputType, enteredValue) {
    // console.log(inputType, enteredValue);
    switch (inputType) {
      case "fullName":
        setFullName(enteredValue);
        break;

      case "location":
        setLocation(enteredValue);
        break;
    }
  }

  const handleImagePicked = async (result, response) => {
    let appVersion = Application.nativeApplicationVersion ?? "1.0.0";

    let signedUrl = await axios.get(`${BASE_URL}userimage`, {
      headers: {
        Authorization: `Bearer ${response.data.payLoad.token}`,
        appVersion: appVersion,
        platform: Platform.OS,
      },
    });

    signedUrl = signedUrl.data.payLoad.signedUrl;

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
  };

  const submitHandler = () => {
    console.log("User Info Screen Signup was Clicked");
    const namePattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    let nameInvalid = !namePattern.test(fullName?.trim());
    let locationInvalid = !(location.length > 6);
    setInputInvalid({
      ...inputInvalid,
      fullName: nameInvalid,
      location: locationInvalid,
    });

    if (nameInvalid) {
      showAlert("Invalid Name Entered");
      return;
    }

    if (locationInvalid) {
      showAlert("Invalid Location.");
    }

    if (!nameInvalid && !locationInvalid) {
      dispatch(modifyuser({ fullName: fullName, address: location }));
      console.log("Moving to OTP Scrren");

      signupUser();
    } else {
    }
  };

  const storeData = async (value) => {
    try {
      await storeUserData(value);
    } catch (e) {
      console.error(e);
    }
  };

  const signupUser = async () => {
    if (!imageUri) {
      showAlert("Please Select a Profile Picture");
      return;
    }

    setIsLoading(true);
    const userPayload = {
      email: currentUser.email,
      password: currentUser.password?.trim(),
      fullName: fullName?.trim(),
      userType: currentUser.userType,
      address: location,
    };

    try {
      let response = await getAxiosClient().post("users/signup", userPayload);

      if (imageUri) {
        await handleImagePicked(imageUri, response);
      }
      let userData = {
        ...currentUser,
        imageUrl: response.data.payLoad.imageUrl,
      };

      await storeData(userData);

      dispatch(modifyuser({ ...response.data.payLoad }));
    } catch (err) {
      let response = parseExpoError(err);

      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const locateMeHandler = async () => {
    setIsLoading(true);
    try {
      navigation.navigate("PickLocationScreen", {
        screen: "UserInfoScreen",
        navigatedForEvent: false,
        isCreatingProfile: true,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <RootViewKeyboard loading={loading}>
        <View style={styles.container}>
          <BackButton></BackButton>
          <View style={styles.content}>
            <View style={styles.topContainer}>
              <LatoText style={styles.topText}>
                Let’s sign you up, quickly
              </LatoText>
            </View>
            <View style={styles.imageContainer}>
              <Pressable
                style={{
                  backgroundColor: "#FFFFFF33",
                  height: 90,
                  width: 90,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 45,
                  overflow: "hidden",
                }}
                onPress={async () => {
                  const uri = await pickImage();
                  setImageUri(uri);
                }}
              >
                {!imageUri && <CameraSvg height={30} width={30}></CameraSvg>}
                {imageUri && (
                  <Image
                    style={{ width: 120, height: 120 }}
                    source={{ uri: imageUri }}
                  ></Image>
                )}
              </Pressable>
            </View>
            <View style={styles.textFields}>
              <CustomTextInput
                placeHolder={"Email"}
                value={currentUser.email}
                editable={false}
                leftImage={
                  <Image
                    style={{
                      height: 22,
                      width: 22,
                    }}
                    tintColor={MD2Colors.white}
                    source={require("../../../../assets/email_icon.png")}
                  />
                }
              />
              <CustomTextInput
                placeHolder={"Full Name"}
                editable={true}
                invalidInput={inputInvalid.fullName}
                onUpdateValue={updateInputValueHandler.bind(this, "fullName")}
                leftImage={
                  <Image
                    style={{
                      height: 22,
                      width: 22,
                    }}
                    tintColor={MD2Colors.white}
                    source={require("../../../../assets/profile_icon.png")}
                  />
                }
              />
              <View style={{ justifyContent: "center" }}>
                <CustomTextInput
                  editable={false}
                  placeHolder={"Address"}
                  value={location}
                  invalidInput={inputInvalid.location}
                  onUpdateValue={updateInputValueHandler.bind(this, "location")}
                />
                <Pressable
                  onPress={locateMeHandler}
                  style={({ pressed }) => {
                    return [
                      styles.floatingTextButton,
                      { justifyContent: "center", alignItems: "flex-end" },
                      pressed && GlobalStyles.pressed,
                    ];
                  }}
                >
                  <LatoText style={styles.pinkTextStyle}>
                    Pick Location
                  </LatoText>
                </Pressable>
              </View>
              <View style={{ justifyContent: "center" }}>
                <CustomTextInput
                  editable={false}
                  value={currentUser.typeToDisplay}
                />
                <Pressable
                  style={({ pressed }) => {
                    return [
                      styles.floatingTextButton,
                      { justifyContent: "center", alignItems: "flex-end" },
                      pressed && GlobalStyles.pressed,
                    ];
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <LatoText style={styles.pinkTextStyle}>Choose</LatoText>
                </Pressable>
              </View>
            </View>
            <View style={styles.signupButton}>
              {/* <ButtonWithBackGround text={"SignUp & Continue"} style={{backgroundColor: '#D770FF'}}></ButtonWithBackGround> */}

              <Button onPress={submitHandler} height={50}>
                Sign up & continue
              </Button>
            </View>
          </View>
        </View>
      </RootViewKeyboard>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    resizeMode: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255, 255 , 255 , 0.3)",
    borderWidth: 1,
  },

  content: {
    flex: 1,
    marginTop: 4,
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    color: "white",
    fontSize: 24,
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textFields: {
    flex: 3.5,
    marginTop: 5,
    marginHorizontal: 20,
  },
  signupButton: {
    flex: 1,

    marginLeft: 20,
    marginRight: 20,
  },
  floatingTextButton: {
    position: "absolute",
    bottom: 12,
    top: 12,
    right: 12,
    paddingRight: 14,
    left: 12,
  },
  pinkTextStyle: {
    color: GlobalConsts.Colors.primaryGreenTextColor,
  },
  scrollContainer: { height: Dimensions.get("window").height * 0.85 },
});

export default UserInfoScreen;
