import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalConsts } from "../../consts/GlobalConsts";
import LatoText from "../auth/LatoText";

function FlatButtonWithBorder({
  children,
  onPress,
  height = 50,
  width,
  borderRadius = 8,
  borderWidth = 1,
  borderColor = GlobalConsts.Colors.primary100,
  textColor = GlobalConsts.Colors.primary100,
  backgroundColor = "#EF7FD511",
  fontSize,
  fontWeight,
  marginTop = 12,
  marginLeft = 0,
  marginRight = 0,
}) {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          {
            borderRadius: borderRadius,
            borderColor: borderColor,
            height: height,
            backgroundColor: backgroundColor,
            width: width,
            borderWidth: borderWidth,
            marginTop: marginTop,
            marginLeft,
            marginRight,
          },
          styles.button,
          pressed && styles.pressed,
        ];
      }}
      onPress={onPress}
    >
      <View>
        <LatoText
          style={[
            styles.buttonText,
            { color: textColor, fontSize, fontWeight },
          ]}
        >
          {children}
        </LatoText>
      </View>
    </Pressable>
  );
}

export default FlatButtonWithBorder;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
  },
});
