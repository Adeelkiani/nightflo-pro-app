import { View, StyleSheet, Image } from "react-native";
import { GlobalConsts } from "../../../consts/GlobalConsts";
import { getImageUrl } from "../../../utils/GetImageUrl";
import LatoText from "../../auth/LatoText";

const PromotersHorizontalListItem = ({ userItem, isDoorTeam, showEmail }) => {
  function getTextDetails() {
    if (showEmail) {
      return (
        <LatoText style={{ color: GlobalConsts.Colors.primaryGreenTextColor }}>
          {userItem.organizer.userType == "PROMOTOR" ? "Promoter" : "Door team"}
        </LatoText>
      );
    }

    return (
      <LatoText style={{ color: "#FFFFFFAA" }}>
        {isDoorTeam
          ? userItem.organizer.email
          : `In ${userItem.eventCount} Events`}
      </LatoText>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.displayPic}
          source={{
            uri: getImageUrl(userItem),
          }}
        />
        <LatoText
          style={{
            fontSize: 12,
            color: "white",
            marginTop: 5,
          }}
          maxLines={2}
        >
          {userItem.organizer.fullName}
        </LatoText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 80,
    marginHorizontal: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: { width: "20%", height: "100%", padding: 4 },
  displayPic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF33",
    borderColor: "white",
    borderWidth: 1,
  },
});

export default PromotersHorizontalListItem;
