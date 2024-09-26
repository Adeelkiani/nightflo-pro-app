import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../../consts/GlobalConsts";
import LatoText from "../../auth/LatoText";
import NotificationSvg from "../../../svgs/NotificationSvg";
import { getDisplayNameOfRole } from "../../../utils/StringUtils";

const RequestListItem = ({ item, acceptRequest, rejectRequest }) => {
  let textTodisplay = "";

  if (item.event) {
    textTodisplay = `You are invited to join "${
      item.event.eventName
    }" as a ${getDisplayNameOfRole("ADMIN")} by ${item.eventOwner?.fullName}.`;
  } else {
    textTodisplay = `You are invited to join "${
      item.owner?.fullName
    }'s" community as a ${getDisplayNameOfRole(item.organizer.userType)}.`;
  }
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.image}>
            <NotificationSvg height={70} color={"#19C893"}></NotificationSvg>
          </View>
        </View>

        <View style={styles.requestContainer}>
          <LatoText
            style={{
              color: "white",
              fontSize: 16,
              flex: 1,
            }}
          >
            {textTodisplay}
          </LatoText>
          <View style={{ flex: 1, flexDirection: "row", marginRight: 8 }}>
            <Pressable
              style={({ pressed }) => {
                return [
                  {
                    backgroundColor: "#F284D022",
                    height: 50,
                    flex: 1,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  },

                  pressed && GlobalStyles.pressed,
                ];
              }}
              onPress={() => {
                rejectRequest(item);
              }}
            >
              <LatoText style={{ color: "#F284D0", fontSize: 18 }}>
                Reject
              </LatoText>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                return [
                  {
                    backgroundColor: "#19C89322",
                    height: 50,
                    flex: 1,
                    marginLeft: 8,
                    marginRight: 8,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  pressed && GlobalStyles.pressed,
                ];
              }}
              onPress={() => {
                acceptRequest(item);
              }}
            >
              <LatoText style={{ color: "#19C893", fontSize: 18 }}>
                Accept
              </LatoText>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={{ height: 1, width: "100%", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "#FFFFFF22", width: "80%", height: "100%" }}
        ></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 150,
    marginTop: 8,
    marginLeft: 20,
    flexDirection: "row",
  },
  iconContainer: {
    flex: 2.5,
    alignItems: "center",
    paddingTop: 8,
  },
  requestContainer: {
    flex: 7.5,
    marginTop: 20,
  },
  image: {
    height: 70,
    width: 70,
    backgroundColor: "#FFFFFF10",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
});

export default RequestListItem;
