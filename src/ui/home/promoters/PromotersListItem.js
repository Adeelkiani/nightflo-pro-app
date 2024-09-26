import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { GlobalConsts } from "../../../consts/GlobalConsts";
import RightArrowSvg from "../../../svgs/RightArrowSvg";
import DeleteSvg from "../../../svgs/DeleteSvg";
import { getImageUrl } from "../../../utils/GetImageUrl";
import LatoText from "../../auth/LatoText";

const PromotersListItem = ({
  userItem,
  isDoorTeam,
  showEmail,
  onDeletePressed,
  showRemove,
}) => {
  function getTextDetails() {
    return (
      <LatoText style={{ color: "#FFFFFFAA", marginTop: 5 }}>
        {`In ${userItem.eventCount} Events`}
      </LatoText>
    );
  }

  function renderDeleteButton() {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={onDeletePressed}>
        <DeleteSvg width={25} height={25} />
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <LatoText numberOfLines={1} style={styles.nameText}>
          {userItem.organizer.fullName}
        </LatoText>
        <View style={styles.contentContainer}>
          <View style={styles.image}>
            <Image
              style={styles.displayPic}
              source={{
                uri: getImageUrl(userItem),
              }}
            />
          </View>
          <View style={styles.description}>
            <LatoText style={{ color: "#FFFFFFAA" }}>
              {userItem.organizer.email}
            </LatoText>
            {getTextDetails()}
          </View>
          {showRemove && (
            <View style={styles.status}>{renderDeleteButton()}</View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    margin: 4,
    marginHorizontal: 20,
  },
  image: { paddingRight: 15, justifyContent: "center" },
  description: {
    flex: 1,
    justifyContent: "center",
  },
  status: {
    flex: 0.5,
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  displayPic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF33",
  },
  deleteButton: {
    width: 40,
    marginRight: 5,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: GlobalConsts.Colors.primaryGrayBackground,
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 15,
    marginTop: 10,
  },
  nameText: {
    textAlign: "left",
    fontSize: 18,
    color: "white",
    paddingHorizontal: 10,
    fontWeight: "700",
  },
});

export default PromotersListItem;
