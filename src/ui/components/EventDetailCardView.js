import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SvgIcons } from "../../svgs/index";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import LatoText from "../auth/LatoText";
import moment from "moment";
import EventFlyerSvg from "../../svgs/EventFlyerSvg";
import GrayBoxIconButton from "./GrayBoxIconButton";
import { MD2Colors } from "react-native-paper";

import Button from "./Button";
import { AssetImages } from "../../../assets";

export default function EventDetailCardView({
  event,
  onNotesPressed,
  onGuestListPressed,
  onEventTicketPressed,
  onEventTablePressed,
  currentUser,
  onEventSummaryPressed,
}) {
  let isClubOwner = currentUser?.isClubOwner;
  let isAdmin = currentUser?.isAdmin;
  let isDoorTeam = currentUser?.isDoorTeam;
  let isPromoter = currentUser?.isPromoter;

  let date = moment(event.startTime).format("dddd, DD MMMM YYYY");
  let startTime = moment(event.startTime).format("ddd MMM DD YYYY hh:mm a");
  let endTime = moment(event.endTime).format("ddd MMM DD YYYY hh:mm a");

  return (
    <View style={styles.container}>
      <LatoText
        maxLines={2}
        style={{
          color: GlobalConsts.Colors.primaryGreen,
          fontSize: 24,
          fontWeight: "800",
          flex: 1,
          textAlign: "center",
        }}
      >
        {event.eventName}
      </LatoText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <GrayBoxIconButton
          onPress={() => {
            onEventSummaryPressed();
          }}
          title="Event Summary"
          width={110}
          height={30}
          borderRadius={15}
        />
        <View style={styles.actionButtonContainer}>
          {onNotesPressed && (
            <GrayBoxIconButton
              height={30}
              width={45}
              borderRadius={15}
              assetIcon={
                <Image
                  source={AssetImages.messageIcon}
                  style={GlobalStyles.icon}
                />
              }
              onPress={() => {
                onNotesPressed();
              }}
              marginHorizontal={0}
            />
          )}
        </View>
      </View>

      <View style={styles.detailContainer}>
        <View
          style={{
            alignItems: "start",
            flex: 1,
          }}
        >
          <View style={styles.innerRowView}>
            <SvgIcons.LocationIconSvg />
            <LatoText style={styles.locationText} maxLines={2}>
              {event.location}
            </LatoText>
          </View>

          <View style={[styles.innerRowView, { marginTop: 5 }]}>
            <Image
              style={{
                height: 18,
                width: 22,
                resizeMode: "contain",
                tintColor: GlobalConsts.Colors.primaryGreen,
              }}
              source={AssetImages.calender}
            />
            <LatoText style={styles.innerRowSecond}>{date}</LatoText>
          </View>
          <View style={[styles.innerRowView, { marginTop: 5 }]}>
            <Image
              style={{
                height: 18,
                width: 22,
                resizeMode: "contain",
                tintColor: GlobalConsts.Colors.primaryGreen,
              }}
              source={AssetImages.clock}
            />
            <LatoText
              style={styles.innerRowSecond}
            >{`Begins ${startTime}\nEnds ${endTime}`}</LatoText>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={() => {
              if (event.imageUrl) {
                navigation.navigate("EventImageScreen", {
                  imageUrl: event.imageUrl,
                });
              } else {
                showAlert("No image found for this event");
              }
            }}
            style={({ pressed }) => [
              {
                width: 120,
                height: 100,
                backgroundColor: "#EAFFFF33",
                borderRadius: 8,
                overflow: "hidden",
              },
              pressed && GlobalStyles.pressed,
            ]}
          >
            {!event.imageUrl && (
              <EventFlyerSvg width={35} height={35}></EventFlyerSvg>
            )}
            {event.imageUrl && (
              <Image
                style={{
                  flex: 1,
                }}
                source={{
                  uri: event.imageUrl,
                }}
              ></Image>
            )}
          </Pressable>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <LatoText
          style={{
            color: GlobalConsts.Colors.primaryGreen,
            fontSize: 16,
            marginTop: 15,
            fontWeight: "600",
          }}
          numberOfLines={1}
        >
          Details:
        </LatoText>

        <LatoText
          style={{
            fontSize: 14,
            color: MD2Colors.grey500,
            fontWeight: "200",
            marginTop: 15,
          }}
          numberOfLines={5}
        >
          {`  ${event.description ?? ""}`}
        </LatoText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <GrayBoxIconButton
          onPress={() => onGuestListPressed()}
          title="Guest List"
          width={80}
          height={30}
          borderRadius={15}
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <GrayBoxIconButton
            onPress={() => onEventTicketPressed()}
            title="Tickets"
            width={60}
            height={30}
            borderRadius={15}
          />
          <GrayBoxIconButton
            onPress={() => onEventTablePressed()}
            title="Tables"
            width={60}
            height={30}
            borderRadius={15}
          />
        </View>
      </View>
      {/* {(isClubOwner || isAdmin || isDoorTeam || isPromoter) &&
        renderInviteGuestButton()} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 12,
    padding: 20,
  },
  innerRowView: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
  },
  detailContainer: { flexDirection: "row", marginTop: 15 },
  locationText: {
    flex: 1,
    marginLeft: 10,
    color: GlobalConsts.Colors.primaryGreen,
    fontSize: 14,
    fontWeight: "400",
  },
  innerRowSecond: {
    flex: 1,
    marginLeft: 10,
    color: MD2Colors.white,
    fontSize: 14,
    fontWeight: "400",
  },
  actionButtonContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
});
