import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Share,
  ActivityIndicator,
  Pressable,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalConsts } from "../../../consts/GlobalConsts";
import Button from "../Button";
import QRCode from "react-native-qrcode-svg";
import LatoText from "../../auth/LatoText";
import { MD2Colors } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { getAxiosClient } from "../../apis/TallyApi";
import { MaterialIcons } from "@expo/vector-icons";
import BackArrowButton from "../BackArrowButton";
import { isLoading } from "expo-font";

export default function InvitePopup({
  heading,
  closePressed,
  eventName,
  eventId = "",
  organizerId = "",
  organizerName = "",
  ticketOrTableId = "",
  isDisplayAsText = false,
  isTypeTicket = true,
}) {
  const [svg, setSvg] = useState("");
  const [qrFailed, setQRFailed] = useState({ isFailed: false, error: "" });
  const [loadingQR, setLoadingQR] = useState(false);
  const [shareableLink, setShareableLink] = useState("");

  const [qrData, setQRData] = useState({
    isTypeTicket,
  });

  function generateSharingMessage(inviteLink) {
    const message = `You are invited to get the ${
      isTypeTicket === true ? "E-Ticket" : "E-Table"
    } from ${organizerName ?? "organizer"}`;
    return `${message}\n\n${inviteLink ?? ""}`;
  }

  useFocusEffect(
    React.useCallback(() => {
      // getTicketInviteLink();
      generateLink();
      return function cleanup() {
        console.log("Cleanup job execution has started");
      };
    }, [])
  );

  async function getTicketInviteLink() {
    try {
      setLoadingQR(true);
      let response = await getAxiosClient().post("invite/viaTicketLink", {
        eventId: eventId,
        organizerId: organizerId,
        ticketId: ticketOrTableId,
      });
      let responseData = response.data.payLoad;
      if (responseData) {
        setQRFailed({ isFailed: false, message: "" });
        setQRData({
          ...qrData,
          inviteLink: responseData.inviteLink,
        });
      }
    } catch (err) {
      let response = parseExpoError(err);
      setQRFailed({
        isFailed: true,
        error: response.message,
      });
    } finally {
      setLoadingQR(false);
    }
  }

  const generateLink = () => {
    const customerAppLink = `nightflo://booking/open?info=${encodeURIComponent(
      "your_custom_info"
    )}`;

    setShareableLink(customerAppLink);
    return customerAppLink;
  };

  function renderQRView() {
    return (
      <QRCode
        value={qrData}
        logoSize={20}
        size={150}
        logoBackgroundColor="transparent"
        color={getTypeColor()}
        getRef={(ref) => {
          setSvg(ref);
        }}
      />
    );
  }

  function onLinkPressed() {}

  function renderAsText() {
    return (
      <View style={{ padding: 25, justifyContent: "space-between", flex: 1 }}>
        <LatoText
          style={{
            color: GlobalConsts.Colors.white,
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {`Send this Link to the guest\nto access ${
            isTypeTicket === true ? "E-Ticket" : "E-Table"
          }`}
        </LatoText>
        <LatoText
          style={{
            textDecorationLine: "underline",
            color: GlobalConsts.Colors.primaryGreen,
            fontSize: 18,
          }}
          onPress={() => {
            onLinkPressed();
          }}
        >
          {shareableLink}
        </LatoText>
      </View>
    );
  }

  function renderLoaderView() {
    return (
      <ActivityIndicator
        size="large"
        color={GlobalConsts.Colors.primaryGreen}
      />
    );
  }

  function renderContent() {
    if (!loadingQR) {
      if (isDisplayAsText) {
        return renderAsText();
      } else {
        return renderQRView();
      }
    } else {
      return renderLoaderView();
    }
  }

  function renderButtonContent() {
    if (qrFailed.isFailed) {
      return "Regenerate";
    } else {
      if (isDisplayAsText) {
        return "Share Link";
      } else {
        return "Share Invite";
      }
    }
  }

  async function openShareTextScreen() {
    const shareOptions = {
      title: `Nightflo E-Ticket`,
      message: generateSharingMessage(qrData?.inviteLink),
    };
    Share.share(shareOptions).catch((err) => console.error(err));
  }

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={50}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      enableAutoAutomaticScroll={false}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ height: "100%" }]}
    >
      <SafeAreaView
        style={{
          ...styles.container,
          backgroundColor: GlobalConsts.Colors.black,
        }}
      >
        <BackArrowButton
          onPress={() => {
            closePressed();
          }}
        />
        <View style={styles.innerContainer}>
          <View style={styles.dialogContainer}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                flex: 1,
              }}
            >
              {renderContent()}
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: "flex-end",
                marginHorizontal: 20,
              }}
            >
              {qrFailed.isFailed && (
                <Button
                  height={50}
                  style={{ marginTop: 12 }}
                  onPress={() => {
                    if (qrFailed.isFailed) {
                      getUniqueHashAPI();
                    } else {
                    }
                  }}
                >
                  {renderButtonContent()}
                </Button>
              )}
            </View>
          </View>
          <View>
            {!loadingQR && !qrFailed.isFailed && (
              <Button
                height={50}
                style={{ marginTop: 8 }}
                onPress={() => {
                  const generatedLink = generateLink();
                  console.log("GENERATED LINK: ", generateLink);
                  // openShareTextScreen();
                }}
              >
                Share
              </Button>
            )}
            <Button
              height={50}
              style={{ marginTop: 8 }}
              onPress={() => {
                closePressed();
              }}
            >
              Close
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 1,
    height: Dimensions.get("window").height / 1,
    backgroundColor: GlobalConsts.Colors.whiteSolidBackground,
    paddingBottom: 50,
    paddingHorizontal: 15,
  },
  innerContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 50,
  },
  dialogContainer: {
    height: 350,
    backgroundColor: GlobalConsts.Colors.primaryGrayBackground,
    marginTop: 80,
    shadowColor: "#000",
    marginHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 25,
  },
  heading: {
    color: GlobalConsts.Colors.black,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "600",
    marginTop: 20,
  },
  headingContainer: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  qrCodeNumberView: {
    marginTop: 10,
  },
  qrCodeNumberText: {
    color: MD2Colors.black,
  },
});
