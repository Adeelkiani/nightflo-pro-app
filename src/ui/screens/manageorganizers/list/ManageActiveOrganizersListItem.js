import moment from "moment";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import RightArrowSvg from "../../../../svgs/RightArrowSvg";
import { getImageUrl } from "../../../../utils/GetImageUrl";
import LatoText from "../../../auth/LatoText";
import FlatButton from "../../../components/FlatButton";
import FlatButtonWithIcon from "../../../components/FlatButtonWithIcon";

const ManageActiveOrganizersListItem = ({ userItem, isDoorTeam }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={styles.displayPic}
            source={{
              uri: getImageUrl(userItem),
            }}
          />
        </View>
        <View style={styles.space} />
        <View style={styles.description}>
          <LatoText
            numberOfLines={1}
            style={[{ textAlign: "left", fontSize: 20, color: "white" }]}
          >
            {userItem.member.fullName}
          </LatoText>
          <LatoText style={{ color: "#FFFFFFAA" }}>
            {userItem.member.email}
          </LatoText>
        </View>
        <View style={styles.status}>
          <FlatButtonWithIcon iconName={"add"}>Add</FlatButtonWithIcon>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 90,
    flexDirection: "row",
    margin: 8,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 0.5,
    borderBottomColor: "white",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  image: { width: "20%", height: "100%", padding: 4 },
  space: { width: "5%" },
  description: {
    width: "60%",
    height: "100%",

    justifyContent: "space-evenly",
  },
  status: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  displayPic: {
    width: "100%",
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FFFFFF33",
  },
});

export default ManageActiveOrganizersListItem;
