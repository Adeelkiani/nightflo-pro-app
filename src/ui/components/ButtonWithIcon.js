import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalConsts } from "../../consts/GlobalConsts";
import InviteIconSvg from "../../svgs/InviteIconSvg";
import { LinearGradient } from "expo-linear-gradient/build/LinearGradient";
function ButtonWithIcon({
  children,
  onPress,
  minWidth = 30,
  height = 50,
  iconSize = 25,
  linearGradient = ["#00F0C5", "#008A71"],
  borderRadius = 20,
  marginTop = 0,
  marginBottom = 0,
  backgroundColor = GlobalConsts.Colors.primaryGreen,
  textColor = "#000",
  icon = <InviteIconSvg width={iconSize} color={"#000"} />,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { minWidth: minWidth, height: height, marginTop, marginBottom },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={linearGradient ?? [backgroundColor, backgroundColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.buttonContainer, { borderRadius }]}
      >
        {icon}
        {children && (
          <Text style={[styles.buttonText, { color: textColor }]}>
            {children}
          </Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

export default ButtonWithIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    marginLeft: 5,
  },
});
