import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalConsts } from "../../consts/GlobalConsts";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import LatoText from "../auth/LatoText";
function FlatButtonWithIcon({
  children,
  onPress,
  iconName,
  height = 50,
  iconSize = 24,
  iconColor = GlobalConsts.Colors.primaryGreen,
  isMaterialCommunityIcons = false,
  textMarginLeft = 12,
  textColor = "white",
  backgroundColor = "transparent",
  borderRadius = 2,
  fontSize = 16,
  marginLeft = 0,
  marginTop = 0,
  minWidth = 50,
}) {
  let icnName = iconName ? iconName : "replay";
  return (
    <Pressable
      style={({ pressed }) => [
        {
          height: height,
          justifyContent: "center",
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          marginLeft,
          marginTop,
          minWidth,
        },
        styles.button,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isMaterialCommunityIcons && (
          <MaterialIcons name={icnName} size={iconSize} color={iconColor} />
        )}

        {isMaterialCommunityIcons && (
          <MaterialCommunityIcons
            name={icnName}
            size={iconSize}
            color={iconColor}
          />
        )}
        <LatoText
          style={[
            styles.buttonText,
            {
              marginLeft: textMarginLeft,
              color: textColor,
              fontSize: fontSize,
              fontWeight: "500",
            },
          ]}
        >
          {children}
        </LatoText>
      </View>
    </Pressable>
  );
}

export default FlatButtonWithIcon;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: GlobalConsts.Colors.primary100,
  },
});
