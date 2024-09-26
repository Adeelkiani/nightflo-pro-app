import { useState } from "react";
import { Dimensions, StyleSheet, View, Text, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "../ui/components/CustomTextInput";
import { Verify } from "../consts/DisplayConsts";
import { GlobalConsts } from "../consts/GlobalConsts";
import LatoText from "../ui/auth/LatoText";
import Button from "../ui/components/Button";
import { Colors, MD2Colors } from "react-native-paper";
import { showAlert } from "./Alert";

export default function ExitLockModePopup({
  heading,
  closePressed,
  onVerifyPressed,
}) {
  const [values, setValues] = useState({
    password: "",
  });

  const height = 380;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "password":
        setValues({ ...values, password: enteredValue });
        break;
    }
  }

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={50}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      enableAutoAutomaticScroll={false}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ height: "100%" }]}
    >
      <LinearGradient
        colors={["#A249AB", "#863C8F", "#632E6A"]}
        start={[0, 0.5]}
        end={[1, 1]}
        style={{ ...styles.container, height: height }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headingContainer}>
            <LatoText style={styles.heading}>{heading}</LatoText>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 20,
              padding: 10,
            }}
          >
            <LatoText style={{ color: MD2Colors.white }}>
              Please enter your passwored to be verified in order to exit lock
              mode
            </LatoText>
          </View>

          <CustomTextInput
            placeHolder="Password"
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
            secure
            value={values.password}
          />

          <Button
            backgroundColor={GlobalConsts.Colors.primaryGreenTextColor}
            height={50}
            style={{ marginTop: 12 }}
            onPress={() => {
              let errors = "";

              const _password = values.password.trim();

              if (!values.password) {
                errors += "Password is not specified\n";
              }

              if (values.password.length < 6) {
                errors += "Password must be 6 characters long\n";
              }

              if (!errors || errors.length === 0) {
                let finalValues = {
                  ...values,
                };
                if (onVerifyPressed) {
                  onVerifyPressed(finalValues);
                }
              } else {
                showAlert(errors);
              }
            }}
          >
            {Verify}
          </Button>

          <Button
            backgroundColor={"#FF4141"}
            height={50}
            style={{ marginTop: 8 }}
            onPress={() => {
              closePressed();
            }}
          >
            Close
          </Button>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: "100%",
    backgroundColor: GlobalConsts.Colors.PURPLE_GRADIENT_1,
    marginTop: Dimensions.get("window").height / 2 / 2,
    marginLeft: Dimensions.get("window").width / 2 - 175,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 25,
  },
  heading: {
    color: "#fff",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  headingContainer: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 15,
  },
});
