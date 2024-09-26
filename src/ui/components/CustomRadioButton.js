import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { GlobalConsts } from "../../consts/GlobalConsts";
import LatoText from "../auth/LatoText";

const CustomRadioButton = ({
  selected,
  onPress,
  label,
  color = GlobalConsts.Colors.primaryGreenTextColor,
  textColor = GlobalConsts.Colors.black,
}) => (
  <View style={{ margin: 8 }}>
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      onPress={onPress}
    >
      <View
        style={{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: color,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: color,
            }}
          />
        ) : null}
      </View>
      <LatoText
        style={{
          marginLeft: 10,
          color: textColor,
          fontSize: 15,
        }}
      >
        {label}
      </LatoText>
    </TouchableOpacity>
  </View>
);

export default CustomRadioButton;
