import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import CustomLoginTextInput from "../components/CustomLoginTextInput";
import FlatButton from "../components/FlatButton";
import { MD2Colors } from "react-native-paper";
import { showAlert } from "../../utils/Alert";
import LatoText from "./LatoText";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import Checkbox from "expo-checkbox";
import {
  getEnableAuthentication,
  getRememberedEmail,
} from "../../utils/TallyAsyncStorage";
import { authenticate, getCredentials } from "../../utils/AuthenticationUtils";
import { LinearGradient } from "expo-linear-gradient";

const AuthForm = ({
  isLogin,
  credentialsInvalid,
  onSubmit,
  onForgotPassword,
  onForgotPasswordPressed,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setRememberMe] = useState(false);
  const [isSecurePassword, setSecurePassword] = useState(true);
  const [credentials, setCredentials] = useState();
  const [isAuthenticationEnabled, setIsAuthenticationEnabled] = useState(false);

  const { email: emailIsInvalid, password: passwordIsInvalid } =
    credentialsInvalid;

  function onChangeSecure() {
    setSecurePassword(!isSecurePassword);
  }

  useEffect(() => {
    async function getRememberInfo() {
      const rememberedEmail = await getRememberedEmail();
      console.log("REMEMBERED: ", rememberedEmail);
      setEmail(rememberedEmail);
    }

    getRememberInfo();

    return () => {};
  }, []);

  useEffect(() => {
    getCredentialsWithBiometrics();
    return () => {};
  }, []);

  useEffect(() => {
    return () => {};
  }, [credentials]);

  const getCredentialsWithBiometrics = async () => {
    let isAuthenticationEnabled = await getEnableAuthentication();
    setIsAuthenticationEnabled(isAuthenticationEnabled);
    if (isAuthenticationEnabled) {
      const success = await authenticate();
      if (success) {
        const credentials = await getCredentials();
        setCredentials(credentials);
        setEmail(credentials.username);
        setPassword(credentials.password);
        submitHandler(credentials.username, credentials.password);
      } else {
        console.log("Authentication failed");
        return null;
      }
    } else {
      console.log("Authentication is not enabled");
      return null;
    }
  };
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEmail(enteredValue);
        if (onForgotPassword) {
          onForgotPassword(enteredValue);
        }
        break;

      case "password":
        setPassword(enteredValue);
        break;
    }
  }

  function submitHandler(_email = null, _password = null) {
    onSubmit({
      email: _email !== null ? _email : email,
      password: _password !== null ? _password : password,
      isRememberMe: isRememberMe,
    });
  }

  return (
    <>
      <View>
        <LatoText style={styles.label}>Email</LatoText>
        <CustomLoginTextInput
          placeHolder="Email"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={email}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          rightImage={
            <Image
              style={{
                height: 18,
                width: 22,
                resizeMode: "contain",
              }}
              source={require("../../../assets/email_icon.png")}
            />
          }
        />

        <View style={styles.space}></View>

        <LatoText style={styles.label}>Password</LatoText>
        <CustomLoginTextInput
          placeHolder="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure={isSecurePassword}
          value={password}
          isInvalid={passwordIsInvalid}
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
                    ? require("../../../assets/eye_slash.png")
                    : require("../../../assets/eye_icon.png")
                }
              />
            </Pressable>
          }
        />

        <View style={styles.remember_section}>
          <Checkbox
            style={styles.checkbox}
            value={isRememberMe}
            onValueChange={setRememberMe}
            color={isRememberMe ? GlobalConsts.Colors.primaryGreen : undefined}
          />
          <LatoText style={styles.remember_me}>Remember me</LatoText>
        </View>

        {isAuthenticationEnabled && (
          <Pressable
            style={({ pressed }) => {
              return [
                { justifyContent: "center" },
                pressed && GlobalStyles.pressed,
              ];
            }}
            onPress={() => {
              getCredentialsWithBiometrics();
            }}
          >
            <LinearGradient
              colors={["#00F0C5", "#008A71"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linear_gradient}
            >
              <Image
                style={{
                  height: 60,
                  width: 60,
                  resizeMode: "contain",
                }}
                tintColor={MD2Colors.white}
                source={require("../../../assets/face_icon.png")}
              />
            </LinearGradient>
          </Pressable>
        )}
      </View>

      <View style={styles.buttons}>
        <Button
          height={60}
          onPress={() => {
            submitHandler();
          }}
        >
          {isLogin ? "Sign In" : "Signup"}
        </Button>
      </View>

      {isLogin && (
        <FlatButton
          style={{
            marginTop: 16,
            marginBottom: 8,
            alignSelf: "center",
            color: "white",
          }}
          childrenStyle={{
            color: "white",
          }}
          onPress={() => {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            const emailIsValid = reg.test(email);
            if (emailIsValid) {
              if (onForgotPasswordPressed) {
                onForgotPasswordPressed(email);
              }
            } else {
              showAlert("Please enter a valid email.");
            }
          }}
        >
          Forgot the password?
        </FlatButton>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
    paddingHorizontal: 4,
  },
  label: {
    color: GlobalConsts.Colors.white,
    fontSize: 16,
    marginLeft: 15,
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  space: { margin: 10 },
  checkbox: {
    margin: 8,
    borderColor: GlobalConsts.Colors.white,
    backgroundColor: "black",
    borderWidth: 1,
  },
  remember_section: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  remember_me: {
    color: GlobalConsts.Colors.white,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  linear_gradient: {
    width: 100,
    height: 100,
    borderRadius: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthForm;
