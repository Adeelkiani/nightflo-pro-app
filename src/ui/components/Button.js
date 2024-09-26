import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalConsts } from "../../consts/GlobalConsts";
import LatoText from "../auth/LatoText";
import { LinearGradient } from "expo-linear-gradient";

function Button({
  children,
  onPress,
  height = 45,
  disabled,
  minWidth,
  style,
  maxHeight,
  linearGradient = [GlobalConsts.Colors.PRIMARY_GRADIENT_1, GlobalConsts.Colors.PRIMARY_GRADIENT_2],
  borderRadius = 20,
  backgroundColor = GlobalConsts.Colors.primaryGreen,
  fontWeight = "400",
  fontSize = 20,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
}) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {
          height: height,
          minWidth: minWidth,
          maxHeight: maxHeight,
          borderRadius: borderRadius,
          marginLeft,
          marginRight,
          marginTop,
        },
        style,
        pressed && styles.pressed,
        disabled && styles.disabled,
        { justifyContent: "center" },
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={linearGradient ?? [backgroundColor, backgroundColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.buttonContainer, { borderRadius }]}
      >
        <LatoText
          style={[styles.buttonText, { fontWeight: fontWeight, fontSize }]}
        >
          {children}
        </LatoText>
      </LinearGradient>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "#000",
  },
  disabled: {
    opacity: 0.3,
  },
});
