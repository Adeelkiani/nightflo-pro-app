import React from "react";
import { View, StyleSheet } from "react-native";

const DottedBorderView = ({
  borderWidth = 1,
  dotColor = "white",
  width = 45,
  height = 45,
  style,
  children,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: borderWidth,
          borderColor: dotColor,
          borderRadius: width / 2,
          width: width,
          height: height,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderStyle: "dashed", // Set border style to dotted
    borderColor: "black", // Set border color
    padding: 10, // Optional: Add padding for content inside the border
  },
});

export default DottedBorderView;
