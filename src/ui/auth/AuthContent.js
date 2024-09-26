import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AuthForm from "./AuthForm";
import { showAlert } from "../../utils/Alert";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();
  const [forgotEmail, setForgotEmail] = useState("");

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  const switchAuthMode = () => {
    if (isLogin) {
      navigation.replace("SignupScreen");
    } else {
      navigation.replace("LoginScreen");
    }
  };

  function submitHandler(credentials) {
    let { email, password, isRememberMe } = credentials;

    email = email.trim();
    password = password.trim();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const emailIsValid = reg.test(email);
    const passwordIsValid = password.length >= 6;

    setCredentialsInvalid({
      email: !emailIsValid,
      password: !passwordIsValid,
    });

    if (!emailIsValid || !passwordIsValid) {
      if (!emailIsValid) {
        showAlert("Email address is not valid");
      } else {
        showAlert("Password must be 6 Characters Long");
      }
      return;
    }

    onAuthenticate({ email, password, isRememberMe });
  }

  return (
    <>
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
          onForgotPassword={setForgotEmail}
          onForgotPasswordPressed={(email) => {
            navigation.navigate("ForgotPassword", { email: email });
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  authContent: {
    // flex: 0.7,
    marginHorizontal: 16,
    padding: 4,
  },
  buttons: {
    marginTop: 8,
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginBottom: "5%",
  },
  registerButton: {
    alignItems: "center",
    marginTop: 30,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  textContainer: { flex: 1.25 },
});

export default AuthContent;
