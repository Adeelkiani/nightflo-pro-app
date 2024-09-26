import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalConsts } from "../../consts/GlobalConsts";
import LatoText from "../auth/LatoText";
import { LinearGradient } from "expo-linear-gradient";

function GrayBoxIconButton({
  onPress,
  leftMargin,
  topMargin,
  assetIcon,
  width = 35,
  height = 35,
  marginHorizontal = 5,
  title,
  backgroundColor = GlobalConsts.Colors.primaryGreen,
  textColor = GlobalConsts.Colors.black,
  borderRadius = 5,
  isDisabled = false,
  linearGradient = [
    GlobalConsts.Colors.PRIMARY_GRADIENT_1,
    GlobalConsts.Colors.PRIMARY_GRADIENT_2,
  ],
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: isDisabled ? 0.4 : pressed ? 0.7 : 1,
        },
      ]}
      disabled={isDisabled}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <LinearGradient
        colors={linearGradient ?? [backgroundColor, backgroundColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.buttonContainer,
          {
            borderRadius,
            marginLeft: leftMargin,
            marginTop: topMargin,
            width: width,
            height: height,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: borderRadius,
            marginHorizontal: marginHorizontal,
          },
        ]}
      >
        <View style={styles.contentContainer}>
          {assetIcon}
          {title && (
            <LatoText
              style={{
                color: textColor,
                fontSize: 18,
                paddingHorizontal: 5,
                fontSize: 14,
              }}
            >
              {title}
            </LatoText>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export default GrayBoxIconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
