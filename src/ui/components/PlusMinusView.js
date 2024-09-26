import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import LatoText from "../auth/LatoText";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";

export default function PlusMinusView({
  title = "None",
  isMultipleTicketView = false,
  quotaUsed = 0,
  defaultValue = 0,
  onMinusPressed,
  onPlusPressed,
}) {
  return (
    <View style={styles.tabsContainer}>
      <View>
        <LatoText
          style={[
            styles.settingTitle,
            {
              fontSize: 16,
              fontWeight: "normal",
            },
          ]}
          maxLines={1}
        >
          {title}
        </LatoText>
        <LatoText
          style={[
            styles.descriptionText,
            {
              fontSize: 12,
              fontWeight: "normal",
            },
          ]}
          maxLines={1}
        >
          {isMultipleTicketView
            ? `Will generate ${defaultValue} tickets`
            : `Quota used ${quotaUsed} out of ${quotaUsed + defaultValue}`}
        </LatoText>
      </View>
      <View style={styles.infoContainer}>
        <Pressable
          style={({ pressed }) => {
            return [styles.infoItem, pressed && GlobalStyles.pressed];
          }}
          onPress={() => {
            if (onMinusPressed) {
              onMinusPressed();
            }
          }}
        >
          <Entypo
            name="squared-minus"
            size={24}
            color={GlobalConsts.Colors.primaryGreenTextColor}
          />
        </Pressable>

        <LatoText
          style={[
            styles.infoItemText,
            {
              fontSize: 24,
              fontWeight: "bold",
            },
          ]}
        >
          {defaultValue}
        </LatoText>
        <Pressable
          style={({ pressed }) => {
            return [styles.infoItem, pressed && GlobalStyles.pressed];
          }}
          onPress={() => {
            if (onPlusPressed) {
              onPlusPressed();
            }
          }}
        >
          <MaterialIcons
            name="add-box"
            size={24}
            color={GlobalConsts.Colors.primaryGreenTextColor}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    backgroundColor: GlobalConsts.Colors.CARD_LIGHT_GREY,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    marginVertical: 15,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  settingTitle: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  descriptionText: {
    color: GlobalConsts.Colors.SLATE_GRAY,
    fontSize: 12,
    marginTop: 5,
  },
  infoItemText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  infoItem: {
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    flex: 0.5,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
