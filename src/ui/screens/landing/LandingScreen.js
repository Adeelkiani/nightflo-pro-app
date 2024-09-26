import { View, StyleSheet, Image, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../../components/Button";
import SpannableBuilder from "react-native-spannable-string";
import RootView from "../../components/RootView";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import LatoText from "../../auth/LatoText";

const LandingScreen = ({ navigation }) => {
  // const [googleRequest, googleResponse, googlePromptAsync] =
  // Google.useAuthRequest({
  //   expoClientId:
  //     "357342441835-gdjtq5aq4eiqbo86vkph2e1dge2jt6mu.apps.googleusercontent.com",
  //   iosClientId:
  //     "357342441835-gdjtq5aq4eiqbo86vkph2e1dge2jt6mu.apps.googleusercontent.com",
  // });

  // useEffect(() => {
  //   const authUser = async () => {
  //     if (googleResponse?.type === "success") {
  //       const { authentication } = googleResponse;
  //       showAlert(authentication.accessToken);
  //       loginWithGoogle(authentication.accessToken);
  //     } else {
  //       console.log("Invalid Signup Google");
  //     }
  //   };
  //
  //   authUser();
  // }, [googleResponse]);

  // const loginWithGoogle = async (token) => {
  //   console.log(token);
  //   try {
  //     let response = await getAxiosClient().post("/users/google", {
  //       token: token,
  //     });
  //
  //     console.log("Axios response ", response.data);
  //   } catch (err) {
  //     let error = parseExpoError(err);
  //     console.log("Axios Error ", err.response.data.message);
  //     showAlert(error.message);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };
  //
  // const faceBookLoginHandler = () => {
  //   console.log("Facebook Login was clicked");
  //   getExpoClient();
  // };
  //
  // const googleLoginHandler = () => {
  //   googlePromptAsync();
  //   // loginWithGoogle("hi there");
  // };
  const navigateToLoginScreen = () => {
    navigation.navigate("LoginScreen");
    console.log("Login with Email Clicked");
  };
  const navigateToRolesScreen = () => {
    navigation.navigate("RoleScreen");
    console.log("Navigate to Signup");
  };
  return (
    <>
      <RootView>
        <View style={styles.contentSpaceTop}></View>

        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../../assets/app_logo.png")}
            />
          </View>
          <View style={styles.space}></View>
          <View style={styles.contentSpaceBottom}></View>
          <View style={styles.buttonsContainer}>
            <View style={{}}>
              <View style={styles.buttons}>
                <Button height={60} onPress={navigateToLoginScreen}>
                  Sign In
                </Button>
              </View>
              <View style={{ marginTop: 15 }}></View>
              <View style={styles.buttons}>
                <Button height={60} onPress={navigateToRolesScreen}>
                  Register
                </Button>
              </View>

              {/* <IconButton
                text={"Sign Up"}
                onPress={emailLoginHandler}
              >
                {"Continue with email"}
              </IconButton> */}
            </View>
          </View>

          <View style={styles.space}></View>
          <View style={styles.contentSpaceBottom}></View>
          <View style={GlobalStyles.row}>
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

          <View style={styles.space}></View>

          <View style={styles.contentSpaceBottom}></View>

          <View style={styles.textContainer}>
            <View
              style={{
                flex: 1,
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
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentSpaceTop: { flex: 1.25 },
  contentContainer: {
    flex: 7.5,
    justifyContent: "center",
    alignItems: "stretch",
  },
  contentSpaceBottom: { flex: 1.25 },
  imageContainer: {
    flex: 5.5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    height: "95%",
    width: "100%",
  },
  buttonsContainer: { flex: 3.5, marginHorizontal: 35 },
  space: { flex: 1 },
  textContainer: { flex: 1.25 },
  buttonStyle: { padding: 25 },
  socialContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "55%",
  },
  facebookStyle: {
    backgroundColor: "#236BFE",
    minHeight: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginRight: 15,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderRadius: 8,
  },
  googleStyle: {
    backgroundColor: "#FD5A4D",
    minHeight: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.7,
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
});

export default LandingScreen;
