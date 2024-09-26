import { StyleSheet, View } from "react-native";
import React from "react";
import { GlobalConsts } from "../../consts/GlobalConsts";

export default function GreyContainerView({
  backgroundColor = GlobalConsts.Colors.transparent10,
  borderRadius = 5,
  children,
  paddingVertical = 0,
  paddingHorizontal = 0,
  marginVertical = 0,
  marginHorizontal = 0,
  borderColor = GlobalConsts.Colors.iron,
  borderWidth = 0,
  marginTop = 0,
  flex = 1,
  justifyContent = "flex-start",
  minHeight = 50,
}) {
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius,
          paddingHorizontal,
          paddingVertical,
          marginVertical,
          marginHorizontal,
          borderColor,
          borderWidth,
          marginTop,
          justifyContent,
          minHeight,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({});
