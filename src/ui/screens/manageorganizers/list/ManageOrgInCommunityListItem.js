import { useState } from "react";
import { View, StyleSheet, Image, Switch } from "react-native";

import LatoText from "../../../auth/LatoText";
import FlatButtonWithIcon from "../../../components/FlatButtonWithIcon";
import { GlobalConsts, GlobalStyles } from "../../../../consts/GlobalConsts";
import { getImageUrl } from "../../../../utils/GetImageUrl";
import ButtonWithBackGround from "../../../components/ButtonWithBackGround";
import {
  ARCHIVE,
  Delete,
  Edit,
  UN_ARCHIVE,
} from "../../../../consts/DisplayConsts";
import { Colors, MD2Colors } from "react-native-paper";
import FlatButtonWithBorder from "../../../components/FlatButtonWithBorder";
const ManageOrgInCommunityListItem = ({
  userItem,
  isActivation,
  isArchived,
  onActivationTogge,
  onAddPressed,
  onEditPressed,
  isSubPromoter,
  onArchivePressed,
}) => {
  const [isEnabled, setIsEnabled] = useState(userItem.activated);
  const [isRequestAccepted, setIsRequestAccepted] = useState(
    userItem.requestStatus === "ACCEPTED" ? true : false
  );
  const toggleSwitch = () =>
    setIsEnabled((previousState) => {
      if (onActivationTogge) {
        onActivationTogge(!previousState, userItem);
      }

      return !previousState;
    });

  function getViewOfActivation(isArchived) {
    if (isActivation) {
      if (isRequestAccepted && !isSubPromoter) {
        return (
          <View>
            <Switch
              trackColor={{
                false: "#767577",
                true: GlobalConsts.Colors.primaryGreen,
              }}
              thumbColor={isEnabled ? "white" : "#FFFFFF"}
              ios_backgroundColor="white"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        );
      } else if (!isSubPromoter) {
        return (
          <View>
            <LatoText
              style={{
                color: GlobalConsts.Colors.primaryGreenTextColor,
                marginBottom: 8,
              }}
            >
              PENDING
            </LatoText>
          </View>
        );
      } else {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              width: 60,
            }}
          >
            <FlatButtonWithBorder
              onPress={() => {
                onEditPressed(userItem);
              }}
              height={39}
              borderRadius={5}
              borderColor={MD2Colors.grey400}
              textColor={MD2Colors.white}
              borderWidth={0}
              backgroundColor={MD2Colors.grey700}
            >
              <LatoText>{Edit}</LatoText>
            </FlatButtonWithBorder>
          </View>
        );
      }
    } else {
      return (
        <View
          style={{
            justifyContent: "space-around",
            height: 70,
          }}
        >
          <FlatButtonWithIcon
            onPress={() => {
              if (onAddPressed) {
                onAddPressed(userItem);
              }
            }}
            iconName={"add"}
            iconSize={15}
            iconColor={GlobalConsts.Colors.primaryGreen}
            textMarginLeft={2}
            height={35}
            fontSize={12}
            backgroundColor={GlobalConsts.Colors.transparent}
            borderRadius={5}
            textColor={GlobalConsts.Colors.primaryGreen}
          >
            Add
          </FlatButtonWithIcon>

          {onArchivePressed && (
            <FlatButtonWithIcon
              onPress={() => {
                if (onArchivePressed) {
                  onArchivePressed(!isArchived);
                }
              }}
              iconName={isArchived ? "unarchive" : "archive"}
              iconSize={15}
              iconColor={GlobalConsts.Colors.primaryGreen}
              textMarginLeft={2}
              height={35}
              fontSize={12}
              backgroundColor={GlobalConsts.Colors.transparent}
              borderRadius={5}
              textColor={GlobalConsts.Colors.primaryGreen}
            >
              {isArchived ? UN_ARCHIVE : ARCHIVE}
            </FlatButtonWithIcon>
          )}
        </View>
      );
    }
  }
  return (
    <>
      <View style={[styles.container, { height: isActivation ? 100 : 100 }]}>
        <View style={styles.description}>
          <LatoText
            numberOfLines={1}
            style={[
              {
                textAlign: "left",
                fontSize: 16,
                color: "white",
                fontWeight: "500",
              },
            ]}
          >
            {userItem.organizer.fullName}
          </LatoText>
          <LatoText
            style={{
              color: GlobalConsts.Colors.transparent60,
              marginTop: 5,
              fontSize: 12,
            }}
          >
            {userItem.organizer.email}
          </LatoText>
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.displayPic}
            source={{
              uri: getImageUrl(userItem),
            }}
          />
        </View>
        <View style={styles.status}>{getViewOfActivation(isArchived)}</View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "92%",
    flexDirection: "row",
    margin: 8,
    marginRight: 10,
    marginLeft: 18,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: GlobalConsts.Colors.primaryGreen,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: GlobalConsts.Colors.primaryGrayBackground,
  },
  description: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  status: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  imageContainer: {
    flex: 0.5,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  displayPic: {
    width: 80,
    height: "95%",
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
    borderColor: GlobalConsts.Colors.primaryGreen,
  },
});

export default ManageOrgInCommunityListItem;
