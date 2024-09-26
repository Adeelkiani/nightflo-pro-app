import { Pressable, StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { GlobalConsts } from "../../consts/GlobalConsts";
import LatoText from "../auth/LatoText";

function BackArrowButton({
  onPress,
  leftMargin = 20,
  topMargin = 20,
  label = "Back",
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && styles.pressed,
        { marginLeft: leftMargin, marginTop: topMargin },
      ]}
      onPress={() => {
        if (!onPress) {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }],
            });
          }
        } else {
          onPress();
        }
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.button}>
          <Image
            style={styles.image}
            source={require("../../../assets/back_button_icon.png")}
          />
        </View>
        <LatoText style={styles.text}>{label}</LatoText>
      </View>
    </Pressable>
  );
}

export default BackArrowButton;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: 20,
    width: 30,
    alignSelf: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  button: {
    backgroundColor: GlobalConsts.Colors.BACK_BTN,
    width: 50,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    marginLeft: 5,
  },
});
