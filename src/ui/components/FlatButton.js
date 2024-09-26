import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalConsts } from "../../consts/GlobalConsts";
import LatoText from "../auth/LatoText";

function FlatButton({ children, onPress, style, childrenStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [style, styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <LatoText style={childrenStyle ?? styles.buttonText}>{children}</LatoText>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: GlobalConsts.Colors.primary100,
  },
});
