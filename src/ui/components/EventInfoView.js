import { StyleSheet, View } from "react-native";
import React from "react";
import { GlobalConsts } from "../../consts/GlobalConsts";
import GreyContainerView from "./GreyContainerView";
import LatoText from "../auth/LatoText";
import moment from "moment";

export default function EventInfoView({
  paddingVertical = 10,
  paddingHorizontal = 10,
  marginVertical = 0,
  marginHorizontal = 0,
  marginTop = 0,
  flex = 1,
  selectedEvent,
}) {
  let date = moment(selectedEvent.eventDate).format("dddd, MMMM DD, YYYY");

  return (
    <GreyContainerView
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
      paddingVertical={paddingVertical}
      paddingHorizontal={paddingHorizontal}
      marginTop={marginTop}
      flex={flex}
      borderWidth={1}
    >
      <LatoText style={styles.title}>{selectedEvent?.eventName ?? ""}</LatoText>
      <LatoText style={styles.description}>{date ?? ""}</LatoText>
    </GreyContainerView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: GlobalConsts.Colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    color: GlobalConsts.Colors.transparent60,
    fontSize: 12,
    marginTop: 5,
    fontWeight: "400",
  },
});
