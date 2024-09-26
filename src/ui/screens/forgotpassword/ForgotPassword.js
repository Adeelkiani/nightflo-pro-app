import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Keyboard,
  Dimensions,
} from "react-native";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import LatoText from "../../auth/LatoText";
import BackButton from "../../components/BackButton";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import CustomTextInput from "../../components/CustomTextInput";
import Button from "../../components/Button";
import { useEffect } from "react";
import { getAxiosClient } from "../../apis/TallyApi";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import EventCreatedSvg from "../../home/events/EventCreatedSvg";
import RootViewKeyboard from "../../components/RootViewKeyboard";
import { showAlert } from "../../../utils/Alert";
import { Image } from "react-native";
import { MD2Colors } from "react-native-paper";
import BackArrowButton from "../../components/BackArrowButton";
import CustomLoginTextInput from "../../components/CustomLoginTextInput";

function BottomSheet({ textToDisplay }) {
  const navigation = useNavigation();
  return (
    <View style={styles.eventCreatedBottomSheet}>
      <View style={styles.eventCreatedPopup}>
        <LatoText style={styles.eventCreatedText}>{textToDisplay}</LatoText>

        <Button
          height={50}
          minWidth={"80%"}
          onPress={() => {
            navigation.goBack();
          }}
        >
          Login
        </Button>
      </View>
      <View
        style={{
          width: "100%",
          height: 350,
          position: "absolute",
          alignItems: "center",
        }}
      >
        <EventCreatedSvg
          style={{
            position: "absolute",

            marginBottom: 100,
          }}
          width={100}
          height={100}
        ></EventCreatedSvg>
      </View>
      <Pressable
        style={{
          width: "100%",
          height: 60,
          paddingBottom: 180,
          position: "absolute",
        }}
        onPress={() => {
          navigation.goBack();
        }}
      ></Pressable>
    </View>
  );
}

const ForgotPasswordScreen = ({ navigation, route }) => {
  const email = route.params.email;
  const [loading, setLoading] = useState(false);
  const [showbottomSheet, setBottomSheetShown] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [isSecurePassword, setSecurePassword] = useState(true);

  const onOtpEntered = (val) => {
    Keyboard.dismiss();
    if (val.length === 4) {
      setOtpValue(val);
    }
  };

  useEffect(() => {
    const sendPasswordResetEmail = async () => {
      console.log("Email found for password reset", email);
      try {
        setLoading(true);
        let response = await getAxiosClient().post("/users/forgotPassword", {
          email: email,
        });

        setLoading(false);
      } catch (error) {
        let parsedError = parseExpoError(error);
        showAlert(parsedError.message);
        setLoading(false);
        navigation.goBack();
      } finally {
      }
    };
    sendPasswordResetEmail();
  }, []);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "password":
        setPassword(enteredValue);
        break;

      case "repPassword":
        setRepPassword(enteredValue);
        break;
    }
  }

  function onChangeSecure() {
    setSecurePassword(!isSecurePassword);
  }

  const resetPasswordApi = async () => {
    console.log("Email found for password reset", email);
    try {
      setLoading(true);
      let response = await getAxiosClient().post("/users/resetPassword", {
        email: email,
        totp: otpValue,
        password: password,
      });

      setLoading(false);
      setBottomSheetShown(true);
      setPassword("");
      setRepPassword("");
    } catch (error) {
      let parsedError = parseExpoError(error);
      showAlert(parsedError.message);
      setLoading(false);
      //   navigation.goBack();
    } finally {
    }
  };

  const resetPassword = () => {
    if (otpValue.length < 4) {
      showAlert("Please Enter OTP");
      return;
    }
    const passwordIsValid = password.length > 6;
    const repPasswordValid = repPassword.length > 6;
    if (!passwordIsValid || !repPasswordValid) {
      showAlert("Passwords must be 6 Characters Long.");
      return;
    } else if (password != repPassword) {
      showAlert("Password and Repeat Password do not match.");
      setPassword("");
      setRepPassword("");
      return;
    } else {
      resetPasswordApi();
    }
  };

  const performApiCall = async () => {};

  return (
    <>
      <RootViewKeyboard loading={loading}>
        <View style={styles.container}>
          <BackArrowButton />
          <LatoText
            style={[GlobalStyles.heading, { marginTop: 20, marginBottom: 20 }]}
          >
            Password Reset
          </LatoText>

          <View style={styles.placesContainer}>
            <LatoText
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "400",
              }}
            >
              {`No Problem, we all forget. We have an OTP\ncode on ${email}\nPlease enter below`}
            </LatoText>
            <OTPInputView
              style={{
                width: Dimensions.get("window").width * 0.8,
                height: 65,
                marginTop: 50,
              }}
              pinCount={4}
              onCodeFilled={onOtpEntered}
              placeholderTextColor={GlobalConsts.Colors.placeHolder}
              codeInputFieldStyle={GlobalStyles.otpCodeInputStyle}
              codeInputHighlightStyle={GlobalStyles.otpCodeInputHighlightStyle}
            />

            <View
              style={{
                borderColor: "#FFFFFF55",
                borderWidth: 0.5,
                width: "100%",
                marginTop: 40,
              }}
            ></View>
            <LatoText
              style={{
                color: "white",
                width: "100%",
                paddingLeft: 12,
                marginTop: 50,
                marginBottom: 20,
                fontSize: 18,
              }}
            >
              Enter your new password
            </LatoText>

            <View style={{ flexDirection: "row" }}>
              <CustomLoginTextInput
                style={{ flex: 1 }}
                placeHolder="Password"
                onUpdateValue={updateInputValueHandler.bind(this, "password")}
                secure={isSecurePassword}
                value={password}
                rightImage={
                  <Pressable onPress={onChangeSecure}>
                    <Image
                      style={{
                        height: 22,
                        width: 26,
                        resizeMode: "contain",
                      }}
                      tintColor={MD2Colors.white}
                      source={
                        isSecurePassword
                          ? require("../../../../assets/eye_slash.png")
                          : require("../../../../assets/eye_icon.png")
                      }
                    />
                  </Pressable>
                }
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <CustomLoginTextInput
                style={{ flex: 1 }}
                placeHolder="Confirm Password"
                onUpdateValue={updateInputValueHandler.bind(
                  this,
                  "repPassword"
                )}
                secure={isSecurePassword}
                value={repPassword}
                rightImage={
                  <Pressable onPress={onChangeSecure}>
                    <Image
                      style={{
                        height: 22,
                        width: 26,
                        resizeMode: "contain",
                      }}
                      tintColor={MD2Colors.white}
                      source={
                        isSecurePassword
                          ? require("../../../../assets/eye_slash.png")
                          : require("../../../../assets/eye_icon.png")
                      }
                    />
                  </Pressable>
                }
              />
            </View>
            <Button
              height={60}
              style={{
                width: "94%",
                marginTop: 20,
                paddingRight: 5,
              }}
              onPress={resetPassword}
            >
              Reset Password
            </Button>
          </View>
        </View>
        {showbottomSheet && (
          <BottomSheet textToDisplay={"Password Changed"}></BottomSheet>
        )}
      </RootViewKeyboard>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 15 },
  placesContainer: {
    marginLeft: 12,
    marginRight: 12,
    flex: 1,
    alignItems: "center",
  },
  eventCreatedBottomSheet: {
    width: "100%",
    justifyContent: "flex-end",
  },
  eventCreatedPopup: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 300,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  eventCreatedText: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 25,
  },
  imageContainer: {
    height: 150,

    borderColor: GlobalConsts.Colors.primaryGreenTextColor,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 20,
    marginTop: 4,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E770E41C",
    overflow: "hidden",
  },
});

export default ForgotPasswordScreen;
