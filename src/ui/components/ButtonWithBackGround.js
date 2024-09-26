import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import LatoText from "../auth/LatoText";
import { GlobalConsts } from "../../consts/GlobalConsts";
import { Colors, MD2Colors } from "react-native-paper";

const ButtonWithBackGround = ({
  text,
  height = 50,
  color = GlobalConsts.Colors.primary100,
  borderRadius = 8,
  textColor = MD2Colors.black,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.inputContainer,
          { height: height },
          { backgroundColor: color },
          { borderRadius: borderRadius },
          pressed && styles.pressed,
        ];
      }}
      onPress={onPress}
    >
      <LatoText style={[styles.input, { color: textColor }]}>{text}</LatoText>
    </Pressable>
  );
};

export default ButtonWithBackGround;

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 12,
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {},
  inputInvalid: {
    borderColor: "rgba(255, 0 , 0 , 0.3)",
  },
  pressed: {
    opacity: 0.7,
  },
});
