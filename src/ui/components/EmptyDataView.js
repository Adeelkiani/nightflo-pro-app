import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LatoText from "../auth/LatoText";
import { GlobalConsts } from "../../consts/GlobalConsts";
import { MD2Colors, MD3Colors } from "react-native-paper";

export default function EmptyDataView({ message = "No data available" }) {
  return (
    <View style={styles.container}>
      <LatoText maxLines={2} style={styles.errorText}>
        {message}
      </LatoText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: MD2Colors.white,
    textAlign: "center",
  },
});
