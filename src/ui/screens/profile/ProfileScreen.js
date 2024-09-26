import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import { modifyuser } from "../../../redux/UserReucer";
import CameraSvg from "../../../svgs/CameraSvg";
import { showAlert, showSuccessAlert } from "../../../utils/Alert";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { storeUserData } from "../../../utils/TallyAsyncStorage";
import { DeleteAccountAPI } from "../../apis/EndPoints";
import { getAxiosClient } from "../../apis/TallyApi";
import LatoText from "../../auth/LatoText";
import Button from "../../components/Button";
import RootViewKeyboard from "../../components/RootViewKeyboard";
import TallyTextInput from "../../components/TallyTextInput";
import DetailHeaderView from "../../components/DetailHeaderView";
import FlatButtonWithIcon from "../../components/FlatButtonWithIcon";
import BackgroundLinearGradient from "../../components/BackgroundLinearGradient";
import Loading from "../../components/Loading";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [inputInvalid, setInputInvalid] = useState({
    fullName: false,
    location: false,
  });
  const currentUser = useSelector((state) => {
    return state.mUser;
  });
  const errorModal = useSelector((state) => {
    return state.error;
  });

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleImagePicked = async (result) => {
    let apiResponse = await getAxiosClient().get("userimage");
    let signedUrl = apiResponse.data.payLoad.signedUrl;
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

    dispatch(modifyuser(apiResponse.data.payLoad));
    let userData = {
      ...currentUser,
      imageUrl: apiResponse.data.payLoad.imageUrl,
    };
    delete userData.signedUrl;
    console.warn(userData);
    await storeUserData(userData);
    setLoading(false);
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const pickImage = async () => {
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

    if (result.canceled) {
      return;
    }
    setLoading(true);

    const manipResult = await manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 300 } }],
      { compress: 1, format: SaveFormat.JPEG }
    );
    await handleImagePicked(manipResult.uri);
  };

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "fullName":
        setFullName(enteredValue);
        break;

      case "password":
        setPassword(enteredValue);
        break;

      case "repeatPassword":
        setRepeatPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    const namePattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    let nameInvalid = !namePattern.test(fullName);
    if (nameInvalid) {
      showAlert("Invalid Name Entered");
      return;
    }

    if (password.length == 0 && repeatPassword.length == 0) {
      console.log("Password was not modified");
    } else {
      if (password.length < 6 || repeatPassword.length < 6) {
        showAlert("Password Must be 6 characters Long");
        return;
      }

      if (password == repeatPassword) {
      } else {
        showAlert("Passwords do not match");
        return;
      }
    }

    performApiCall();
  }

  const performApiCall = async () => {
    try {
      let apiResponse = await getAxiosClient().post("users/editprofile", {
        fullName: fullName,
        password: password,
      });

      dispatch(modifyuser(apiResponse.data.payLoad));
      let userData = {
        ...currentUser,
        fullName: apiResponse.data.payLoad.fullName,
        token: apiResponse.data.payLoad.token,
      };
      delete userData.signedUrl;
      await storeUserData(userData);
      showSuccessAlert("Changes saved successfully");
    } catch (e) {
      console.error(e);
      let error = parseExpoError(e);
      showAlert(error.message);
    }
  };

  function renderHeading({
    title = "Title",
    marginBottom = 0,
    marginTop = 20,
  }) {
    return (
      <View style={[styles.headingContainer, { marginBottom, marginTop }]}>
        <View style={styles.placeHolderBox} />
        <LatoText style={styles.headingText}>{title}</LatoText>
      </View>
    );
  }

  function renderImageView() {
    return (
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          {!currentUser.imageUrl && (
            <CameraSvg height={30} width={30}></CameraSvg>
          )}
          {currentUser.imageUrl && (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: currentUser.imageUrl,
              }}
            ></Image>
          )}
        </View>
        <View>
          <LatoText style={styles.fullNameText}>
            {currentUser.fullName}
          </LatoText>
          <FlatButtonWithIcon
            height={35}
            minWidth={150}
            borderRadius={5}
            marginLeft={15}
            marginTop={8}
            backgroundColor={GlobalConsts.Colors.primaryGreen}
            iconColor={GlobalConsts.Colors.black}
            iconName={"edit"}
            iconSize={20}
            textMarginLeft={5}
            onPress={pickImage}
          >
            <LatoText style={styles.buttonText}>Edit Avatar</LatoText>
          </FlatButtonWithIcon>
        </View>
      </View>
    );
  }

  return (
    <BackgroundLinearGradient>
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView style={styles.container}>
          <DetailHeaderView title="Profile Settings" />
          <ScrollView>
            <View style={[styles.innerContainer]}>
              {renderHeading({
                title: "Avatar",
              })}

              {renderImageView()}

              <View style={[GlobalStyles.divider, { marginTop: 30 }]} />

              {renderHeading({ title: "Account Information" })}

              <View style={styles.textFields}>
                <TallyTextInput
                  placeHolder={"Email"}
                  value={currentUser.email}
                  editable={false}
                ></TallyTextInput>
                <TallyTextInput
                  placeHolder={"Full Name"}
                  editable={true}
                  value={fullName}
                  invalidInput={inputInvalid.fullName}
                  onUpdateValue={updateInputValueHandler.bind(this, "fullName")}
                ></TallyTextInput>

                <View style={[GlobalStyles.divider, { marginTop: 20 }]} />

                {renderHeading({ title: "Password", marginBottom: 20 })}

                <TallyTextInput
                  placeHolder={"New password"}
                  editable={true}
                  invalidInput={inputInvalid.fullName}
                  value={password}
                  secure={true}
                  onUpdateValue={updateInputValueHandler.bind(this, "password")}
                ></TallyTextInput>

                <TallyTextInput
                  placeHolder={"Repeat new password"}
                  editable={true}
                  secure={true}
                  invalidInput={inputInvalid.fullName}
                  value={repeatPassword}
                  onUpdateValue={updateInputValueHandler.bind(
                    this,
                    "repeatPassword"
                  )}
                ></TallyTextInput>
              </View>

              <View style={styles.signupButton}>
                <Button
                  onPress={submitHandler}
                  height={50}
                  linearGradient={null}
                >
                  Save changes
                </Button>
              </View>
            </View>
          </ScrollView>
          <Loading isLoading={loading} />
        </GestureHandlerRootView>
      </SafeAreaView>
    </BackgroundLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  textFields: {
    marginTop: 30,
  },
  signupButton: {
    marginTop: 30,
  },
  deleteButtonView: {
    flex: 0.5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  headingContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  placeHolderBox: {
    backgroundColor: GlobalConsts.Colors.primaryGreen50,
    width: 20,
    height: 35,
    borderRadius: 5,
  },
  headingText: {
    fontSize: 16,
    fontWeight: "500",
    color: GlobalConsts.Colors.white,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "500",
    color: GlobalConsts.Colors.black,
  },
  fullNameText: {
    fontSize: 16,
    fontWeight: "600",
    color: GlobalConsts.Colors.white,
    marginLeft: 15,
  },
  image: {
    backgroundColor: "#FFFFFF33",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
});

export default ProfileScreen;
