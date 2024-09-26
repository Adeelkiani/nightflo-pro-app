import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // You can use any icon library
import { GlobalConsts } from "../../consts/GlobalConsts";
import LatoText from "../auth/LatoText";
import { AssetImages } from "../../../assets";

const SummaryCounter = ({
  title = "Member",
  count = 0,
  alignItems = "flex-start",
  paddingLeft = 8,
  paddingRight = 5,
  asset = AssetImages.promoterCount,
}) => {
  return (
    <View style={[styles.container, { alignItems, paddingLeft, paddingRight }]}>
      <Image source={asset} style={styles.icon} resizeMode="contain" />
      <LatoText style={styles.countText}>{count}</LatoText>
      <LatoText style={styles.labelText}>{title}</LatoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalConsts.Colors.primaryGreen50, // Dark blue background
    paddingVertical: 5,
    borderRadius: 16,
    justifyContent: "center",
    flex: 1, // Adjust width based on your design
    height: 105, // Adjust height based on your design
    marginHorizontal: 8,
  },
  icon: { width: 25, height: 25 },
  countText: {
    color: GlobalConsts.Colors.primaryGreenTextColor,
    fontSize: 24, // Adjust size based on design
    fontWeight: "bold",
    marginVertical: 5,
  },
  labelText: {
    color: "white",
    fontSize: 12, // Adjust based on design
  },
});

export default SummaryCounter;
