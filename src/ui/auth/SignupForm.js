import { useState } from "react";
import { Image, StyleSheet, View, Pressable, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomTextInput from "../components/CustomTextInput";
import LatoText from "./LatoText";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import { showAlert } from "../../utils/Alert";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

export const pickImage = async () => {
  const cameraRollStatus =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  // const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
  if (cameraRollStatus.status !== "granted") {
    showAlert("Permission is required to access photos.");
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

const SignupForm = ({
  userType,
  formData,
  credentialsInvalid,
  onInputChange,
  route,
  navigation,
}) => {
  const {
    clubName: clubNameIsInvalid,
    name: nameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: confirmPasswordIsInvalid,
    city: cityIsInvalid,
    location: locationIsInvalid,
  } = credentialsInvalid;

  const [isSecurePassword, setSecurePassword] = useState(true);
  const [isSecureConfirmPassword, setSecureConfirmPassword] = useState(true);

  function updateInputValueHandler(inputType, enteredValue) {
    console.log("SETTING DATA: ", inputType, enteredValue);
    onInputChange(inputType, enteredValue);
  }

  function updateSecure() {
    setSecurePassword(!isSecurePassword);
  }
  function updateSecureConfirmPassword() {
    setSecureConfirmPassword(!isSecureConfirmPassword);
  }

  function onLocateMeHandler() {
    navigation.navigate("PickLocationScreen", {
      isCreatingProfile: true,
      onGoBack: (data) => {
        updateInputValueHandler("location", data.location);
      },
    });
  }

  return (
    <>
      <View>
        {userType == "CLUB_OWNER" ? (
          <View>
            <LatoText style={styles.label}>Club/Venue Name</LatoText>
            <CustomTextInput
              placeHolder="Club/Venue Name"
              onUpdateValue={updateInputValueHandler.bind(this, "clubName")}
              value={formData.clubName}
              keyboardType="default"
              isInvalid={clubNameIsInvalid}
              rightImage={
                <Image
                  style={{
                    height: 18,
                    width: 22,
                    resizeMode: "contain",
                  }}
                  source={require("../../../assets/home_icon.png")}
                />
              }
            />
            <View style={styles.space}></View>
          </View>
        ) : (
          <></>
        )}

        <View>
          <LatoText style={styles.label}>
            {userType == "CLUB_OWNER" ? "Owner" : ""} Name
          </LatoText>
          <CustomTextInput
            placeHolder="Name"
            onUpdateValue={updateInputValueHandler.bind(this, "fullName")}
            value={formData.fullName}
            keyboardType="default"
            isInvalid={nameIsInvalid}
            rightImage={
              <Image
                style={{
                  height: 18,
                  width: 22,
                  resizeMode: "contain",
                }}
                source={require("../../../assets/people_icon.png")}
              />
            }
          />
          <View style={styles.space}></View>
        </View>

        <View>
          <LatoText style={styles.label}>
            {userType == "CLUB_OWNER" ? "Owner" : ""} Email
          </LatoText>
          <CustomTextInput
            placeHolder="Email"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={formData.email}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            rightImage={
              <Image
                style={{
                  height: 18,
                  width: 22,
                  resizeMode: "contain",
                }}
                source={require("../../../assets/people_email_icon.png")}
              />
            }
          />
          <View style={styles.space}></View>
        </View>

        <View>
          <LatoText style={styles.label}>Password</LatoText>
          <CustomTextInput
            placeHolder="******"
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
            value={formData.password}
            keyboardType="password"
            isInvalid={passwordIsInvalid}
            secure={isSecurePassword}
            rightImage={
              <Pressable onPress={updateSecure}>
                <Image
                  style={{
                    height: 18,
                    width: 22,
                    resizeMode: "contain",
                    tintColor: "gray",
                  }}
                  source={
                    isSecurePassword
                      ? require("../../../assets/eye_slash.png")
                      : require("../../../assets/eye_icon.png")
                  }
                />
              </Pressable>
            }
          />
          <View style={styles.space}></View>
        </View>

        <View>
          <LatoText style={styles.label}>Confirm Password</LatoText>
          <CustomTextInput
            placeHolder="******"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            value={formData.confirmPassword}
            keyboardType="password"
            isInvalid={confirmPasswordIsInvalid}
            secure={isSecureConfirmPassword}
            rightImage={
              <Pressable onPress={updateSecureConfirmPassword}>
                <Image
                  style={{
                    height: 18,
                    width: 22,
                    resizeMode: "contain",
                    tintColor: "gray",
                  }}
                  source={
                    isSecureConfirmPassword
                      ? require("../../../assets/eye_slash.png")
                      : require("../../../assets/eye_icon.png")
                  }
                />
              </Pressable>
            }
          />
          <View style={styles.space}></View>
        </View>

        <View>
          <LatoText style={styles.label}>Location (City)</LatoText>
          <CustomTextInput
            placeHolder="City"
            onUpdateValue={updateInputValueHandler.bind(this, "city")}
            value={formData.city}
            keyboardType="default"
            isInvalid={cityIsInvalid}
            rightImage={
              <Image
                style={{
                  height: 18,
                  width: 22,
                  resizeMode: "contain",
                }}
                source={require("../../../assets/city_icon.png")}
              />
            }
          />
          <View style={styles.space}></View>
        </View>

        <View>
          <LatoText style={styles.label}>Locate Me</LatoText>
          <CustomTextInput
            placeHolder="Locate Me"
            isEditable={false}
            onUpdateValue={updateInputValueHandler.bind(this, "location")}
            value={formData.location}
            keyboardType="default"
            isInvalid={locationIsInvalid}
            pressableCallback={onLocateMeHandler}
            rightImage={
              <Pressable
                onPress={onLocateMeHandler}
                style={({ pressed }) => {
                  return [
                    styles.floatingTextButton,
                    { justifyContent: "center" },
                    pressed && GlobalStyles.pressed,
                  ];
                }}
              >
                <Image
                  style={{
                    height: 18,
                    width: 22,
                    resizeMode: "contain",
                  }}
                  source={require("../../../assets/search_icon.png")}
                />
              </Pressable>
            }
          />

          <View style={styles.space}></View>
        </View>
        <View style={styles.space}></View>
        <View style={styles.uploadContainer}>
          <Pressable
            onPress={async () => {
              const uri = await pickImage();
              // setImageUri(uri);
              onInputChange("imageUri", uri);
            }}
          >
            {!formData.imageUri && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{
                    height: 63,
                    width: 63,
                    resizeMode: "contain",
                    marginBottom: 8,
                  }}
                  source={require("../../../assets/upload_icon.png")}
                />
                <LatoText style={styles.label}>
                  {userType == "CLUB_OWNER"
                    ? "Add picture of the club"
                    : "Add profile picture"}
                </LatoText>
              </View>
            )}
            {formData.imageUri && (
              <Image
                style={{ width: 120, height: 120 }}
                source={{ uri: formData.imageUri }}
              ></Image>
            )}
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: GlobalConsts.Colors.white,
    fontSize: 16,
    marginLeft: 25,
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  space: { margin: 5 },
  checkbox: {
    margin: 8,
    borderColor: GlobalConsts.Colors.white,
    backgroundColor: "black",
    borderWidth: 1,
  },
  uploadContainer: {
    width: "75%",
    height: 130,
    borderRadius: 50,
    backgroundColor: GlobalConsts.Colors.inputTextBackground,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default SignupForm;
