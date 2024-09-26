import { View, StyleSheet, Image } from "react-native";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import { getImageUrl } from "../../../utils/GetImageUrl";
import LatoText from "../../auth/LatoText";

const InviteListItem = ({ userItem }) => {
  return (
    <>
      <View style={styles.container}>
        <LatoText numberOfLines={1} style={styles.nameText}>
          {userItem.organizer?.fullName}
        </LatoText>
        <View style={styles.contentContainer}>
          <View style={styles.description}>
            <LatoText style={{ color: "#FFFFFFAA" }}>
              {userItem.organizer?.email}
            </LatoText>
          </View>
          <View style={styles.status}>
            <LatoText
              style={[
                { color: GlobalConsts.Colors.primaryGreenTextColor },
                userItem.requestStatus == "ACCEPTED" && { color: "#19C893" },
              ]}
            >
              {userItem.requestStatus}
            </LatoText>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    margin: 4,
  },
  nameText: {
    textAlign: "left",
    fontSize: 15,
    color: "white",
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: GlobalConsts.Colors.primaryGrayBackground,
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 15,
    marginTop: 5,
  },
  description: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  image: { width: "22%", justifyContent: "center" },
  status: {
    flex: 0.4,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  displayPic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF33",
  },
});

export default InviteListItem;
