import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import FlatButtonWithIcon from "../../components/FlatButtonWithIcon";
import Button from "../../components/Button";
import { getAxiosClient } from "../../apis/TallyApi";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import useState from "react-usestateref";
import { modifyuser } from "../../../redux/UserReucer";
import { storeUserData } from "../../../utils/TallyAsyncStorage";
import RootView from "../../components/RootView";
import LatoText from "../../auth/LatoText";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import EventCreatedSvg from "../../home/events/EventCreatedSvg";
import { showAlert, showSuccessAlert } from "../../../utils/Alert";
import BackArrowButton from "../../components/BackArrowButton";
import { useEffect } from "react";

const OtpScreen = () => {
  let otpKey = 121412;
  const [loading, setIsLoading, loadingRef] = useState(false);
  const [verifyDisabled, setVerifyDisabled, disabledRef] = useState(true);
  const [otpValue, setOtpValue, otpValueRef] = useState("");
  const [showbottomSheet, setBottomSheetShown] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const resetTimer = () => {
    setSeconds(60);
    setIsActive(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const onOtpEntered = (val) => {
    Keyboard.dismiss();
    setVerifyDisabled(false);
    console.log("inOtpEntered" + val.length);
    if (val.length === 4) {
      console.log("calling verify api...");
      setOtpValue(val);
      verifyUserApi();
    }
  };

  const onUserTyping = (val) => {
    if (val) {
      if (val.length < 4) {
        setVerifyDisabled(true);
      }
    }
  };

  const onUseAppPressed = () => {
    storeUserData({ ...currentUser, isVerified: true });
    dispatch(modifyuser({ ...currentUser, isVerified: true }));
  };

  const verifyUserApi = async () => {
    setIsLoading(true);
    console.log("verifying otp...");
    try {
      let userPayLoad = { otp: otpValueRef.current };
      let response = await getAxiosClient().post(
        "users/verifyemail",
        userPayLoad
      );
      setBottomSheetShown(true);
    } catch (err) {
      let response = parseExpoError(err);
      showAlert(response.message);
      if (response.message.toLowerCase() === "user already verified") {
        onUseAppPressed();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitHandler = () => {
    verifyUserApi();
  };

  const resendHandler = async () => {
    setIsLoading(true);
    try {
      let userPayLoad = { otp: otpValueRef.current };
      let response = await getAxiosClient().get("users/resendotp");
      resetTimer();
      showSuccessAlert("OTP Sent");
    } catch (err) {
      let response = parseExpoError(err);

      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <RootView loading={loading}>
        <View style={styles.container}>
          {/* <BackArrowButton /> */}
          <View style={styles.content}>
            <View style={styles.otpContainer}>
              <LatoText style={GlobalStyles.heading}>Verify Email</LatoText>
              <LatoText
                style={[
                  GlobalStyles.normalText,
                  { marginTop: 5, textAlign: "left" },
                ]}
              >
                {`Enter verfication code that has been sent to your email "${currentUser.email}"`}
              </LatoText>

              <OTPInputView
                style={{
                  width: "80%",
                  height: 50,
                  marginTop: "20%",
                  alignSelf: "center",
                }}
                pinCount={4}
                onCodeFilled={onOtpEntered}
                placeholderTextColor={"#FFFFFF"}
                codeInputFieldStyle={GlobalStyles.otpCodeInputStyle}
                codeInputHighlightStyle={
                  GlobalStyles.otpCodeInputHighlightStyle
                }
                autoFocusOnLoad
                selectionColor="white"
              />
              <View
                style={{
                  marginTop: "20%",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {isActive ? (
                  <LatoText
                    style={{
                      color: GlobalConsts.Colors.primaryGreen,
                    }}
                  >
                    Resend Code {formatTime(seconds)}
                  </LatoText>
                ) : (
                  <FlatButtonWithIcon onPress={resendHandler}>
                    Resend
                  </FlatButtonWithIcon>
                )}

                <View style={styles.buttons}>
                  <Button
                    onPress={onSubmitHandler}
                    height={60}
                    disabled={verifyDisabled}
                  >
                    Confirm
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.confirmButton} />
          </View>
          {showbottomSheet && (
            <BottomSheet
              textToDisplay={"Welcome to Nightflo Pro"}
              onPress={onUseAppPressed}
            ></BottomSheet>
          )}
        </View>
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  otpContainer: {
    flex: 2,
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: "10%",
  },
  confirmButton: {
    flex: 1,
  },

  eventCreatedBottomSheet: {
    position: "absolute",
    width: "100%",
    height: "100%",

    justifyContent: "flex-end",
  },
  eventCreatedPopup: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 600,
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
  buttons: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    width: "100%",
  },
});

export default OtpScreen;
function BottomSheet({ textToDisplay, onPress }) {
  // const navigation = useNavigation();
  return (
    <View style={styles.eventCreatedBottomSheet}>
      <View style={styles.eventCreatedPopup}>
        <LatoText style={styles.eventCreatedText}>{textToDisplay}</LatoText>
        <LatoText
          style={{
            fontSize: 12,
            marginTop: 12,
            marginBottom: 12,
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          {"Nightflo Pro is a simple and easy to use App that helps Event Producers keep track of their Promoters’ performance and help Promoters follow their tally chart during the event using their mobile phones. Nightflo Pro can be used by various role types including Event Owners Promoters and Door Staff." +
            "\n\nWhy Use Nightflo Pro:\n\n" +
            "*Past Event Reports\n*In App Messaging\n*Promoters Tally reporting\n*Bar Revenue Reporting\n*Simple interface\n*Reliable\n*Large counter display"}
        </LatoText>

        <Button
          style={{ position: "absolute", bottom: 25 }}
          height={50}
          minWidth={"80%"}
        >
          Goto App
        </Button>
      </View>
      <View
        style={{
          width: "100%",
          height: 650,
          position: "absolute",
          alignItems: "center",
        }}
      >
        <EventCreatedSvg
          style={{
            position: "absolute",
            top: -20,
          }}
          width={150}
          height={150}
        ></EventCreatedSvg>
      </View>
      <Pressable
        style={{
          width: "100%",
          height: 60,
          paddingBottom: 180,
          position: "absolute",
        }}
        onPress={onPress}
      ></Pressable>
    </View>
  );
}
