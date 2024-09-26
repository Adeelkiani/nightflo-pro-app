import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { AssetImages } from "../../../assets";
import { Dimensions } from "react-native";
import LatoText from "../auth/LatoText";
import Button from "./Button";

const NoContentView = ({
  message = "No content available",
  assetImage = AssetImages.noContent,
  onActionPressed,
  buttonTitle = "Button",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.noEvent}>
        <Image
          style={{
            height: "20%",
            width: "35%",
            resizeMode: "contain",
          }}
          source={assetImage}
        />

        <LatoText style={styles.text}>{message}</LatoText>

        {onActionPressed && (
          <Button
            height={50}
            marginTop={10}
            minWidth={"90%"}
            onPress={() => {
              onActionPressed();
            }}
          >
            {buttonTitle}
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noEvent: {
    height: Dimensions.get("window").height * 0.86,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    width: "70%",
    textAlign: "center",
    marginTop: 20,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonContainer: {
    justifyContent: "center",
    borderRadius: 20,
    height: 65,
    width: "95%",
    margin: 16,
  },
});

export default NoContentView;
