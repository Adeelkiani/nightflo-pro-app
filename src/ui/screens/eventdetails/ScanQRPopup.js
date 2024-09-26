import { useState } from "react";
import { Dimensions, StyleSheet, View, Alert } from "react-native";
import LatoText from "../../auth/LatoText";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MD2Colors } from "react-native-paper";
import { Platform } from "react-native";
import { GlobalConsts } from "../../../consts/GlobalConsts";

const height = Dimensions.get("window").height - 200;
const width = Dimensions.get("window").width - 20;

const ScanQRPopup = ({
  data,
  heading,
  description = null,
  closePressed,
  onQRScanned,
}) => {
  const [values, setValues] = useState({
    eventId: data.eventId,
    code: "",
  });

  const [scanned, setScanned] = useState(false);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    onQRScanned(data);
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={50}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      enableAutoAutomaticScroll={false}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ height: "100%" }]}
    >
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.headingContainer}>
            <LatoText style={styles.heading}>{heading}</LatoText>
            {description && (
              <LatoText style={styles.description}>{description}</LatoText>
            )}
          </View>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.barCodeView}
          >
            <View
              style={{
                flex: 1,
                marginBottom: 30,
                justifyContent: "flex-end",
              }}
            >
              <Button
                backgroundColor={GlobalConsts.Colors.primaryGreen}
                linearGradient={null}
                height={50}
                style={{ marginTop: 8 }}
                marginLeft={10}
                marginRight={10}
                borderRadius={5}
                onPress={() => {
                  closePressed();
                }}
              >
                Close
              </Button>
            </View>
          </BarCodeScanner>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    marginTop: Dimensions.get("window").height / 2 - height / 2,
    marginLeft: Dimensions.get("window").width / 2 - width / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 25,
  },
  heading: {
    color: "#000",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 5,
  },
  description: {
    color: "#fff",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 2,
    marginBottom: 5,
  },
  headingContainer: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  barCodeView: {
    flex: 1,
  },
});

export default ScanQRPopup;
