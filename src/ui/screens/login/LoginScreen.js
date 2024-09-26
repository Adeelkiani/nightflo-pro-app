import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import AuthContent from "../../auth/AuthContent";
import { modifyuser, setEmailPass } from "../../../redux/UserReucer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAxiosClient } from "../../apis/TallyApi";
import { showAlert } from "../../../utils/Alert";

import {
  storeRememberMe,
  storeUserData,
} from "../../../utils/TallyAsyncStorage";
import LatoText from "../../auth/LatoText";
import { GlobalStyles, GlobalConsts } from "../../../consts/GlobalConsts";
import { FontAwesome } from "@expo/vector-icons";
import SpannableBuilder from "react-native-spannable-string";
import Loading from "../../components/Loading";
import { saveCredentials } from "../../../utils/AuthenticationUtils";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler({ email, password, isRememberMe }) {
    setIsLoading(true);
    try {
      let response = await getAxiosClient().post("/users/signin", {
        email: email,
        password: password,
      });

      let userData = { ...response.data.payLoad };
      await storeUserData(userData);
      await storeRememberMe(isRememberMe ? email : "");
      await saveCredentials(email, password).catch((error) => {});

      dispatch(modifyuser({ ...userData }));
    } catch (err) {
      console.log("Axios Error ", err);
      showAlert(err.response?.data?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const navigateToRolesScreen = () => {
    navigation.navigate("RoleScreen");
    console.log("Navigate to Signup");
  };

  return (
    <>
      <SafeAreaView style={GlobalStyles.themeContainer}>
        <View style={styles.topSpace} />
        <View style={styles.mainContainer}>
          {/* <Pressable
            onPress={()=>{}}
          >
            <LatoText style={styles.skip}>Skip</LatoText>
          </Pressable> */}

          {/* <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../../assets/icon.png")}
            />
          </View> */}

          <View style={styles.textContainer}>
            <LatoText style={styles.largeText}>
              Welcome to Nightflo pro
            </LatoText>
          </View>
          <AuthContent
            styles={styles.authContainer}
            onAuthenticate={loginHandler}
            isLogin={true}
          />

          <View style={[GlobalStyles.row, { marginTop: 16 }]}>
            <View style={styles.horizontalLine}></View>
            <LatoText style={{ color: GlobalConsts.Colors.white }}>
              {"Or Continue With"}
            </LatoText>
            <View style={styles.horizontalLine}></View>
          </View>

          <View style={styles.socialContainer}>
            <View style={styles.socialIconBg}>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => {
                  return [pressed && styles.pressed];
                }}
              >
                <FontAwesome name="facebook" size={35} color="white" />
              </Pressable>
            </View>

            <View style={styles.socialIconBg}>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => {
                  return [pressed && styles.pressed];
                }}
              >
                <FontAwesome name="apple" size={35} color="white" />
              </Pressable>
            </View>

            <View style={styles.socialIconBg}>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => {
                  return [pressed && styles.pressed];
                }}
              >
                <FontAwesome name="google" size={35} color="white" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpace}>
          <View style={styles.textContainer}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Pressable onPress={navigateToRolesScreen}>
                {SpannableBuilder.getInstance({ fontSize: 16 })
                  .appendColored("Don't have an Account? ", "white")
                  .appendCustom("Register", {
                    color: "#00F0C5",
                    textDecorationLine: "underline",
                  })
                  .build()}
              </Pressable>
            </View>
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
  scrollContainer: { height: Dimensions.get("window").height },
  largeText: {
    fontSize: 22,
    color: "white",
    fontWeight: "400",
    alignSelf: "center",
  },
  smallText: {
    fontSize: 16,
    color: "white",
    marginVertical: 9,
    textAlign: "center",
    fontWeight: "300",
  },
  topSpace: {
    flex: 0.02,
  },
  mainContainer: {
    flex: 1,
  },
  bottomSpace: {
    flex: 0,
  },
  imageContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    justifyContent: "center",
    paddingBottom: "8%",
    marginTop: "10%",
  },
  authContainer: {
    flex: 1,
  },
  image: {
    height: 100,
    width: "80%",
    resizeMode: "contain",
  },

  skip: {
    color: "white",
    fontSize: "18px",
    alignSelf: "flex-end",
    marginRight: 20,
  },

  horizontalLine: {
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    width: "35%",
    height: 2,
  },
  socialIconBg: {
    backgroundColor: "#191919",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  socialContainer: {
    marginTop: 26,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "55%",
  },
  contentSpaceBottom: { flex: 0.75 },
});

export default LoginScreen;
