import { View, StyleSheet, Image } from "react-native";
import LatoText from "../../../auth/LatoText";
import { GlobalConsts } from "../../../../consts/GlobalConsts";
import { getImageUrl } from "../../../../utils/GetImageUrl";
import { USER_ROLES } from "../../../../consts/EnumsConts";
import { getDisplayNameOfRole } from "../../../../utils/StringUtils";
import moment from "moment";

const SummaryCategoryItem = ({ label, category, onCategorySelected }) => {
  const formatedDate = moment(bookingData?.createdAt).format(
    "DD/MM/YYYY hh:mm a"
  );
  function getRoleDisplayName() {
    return `${getDisplayNameOfRole(bookingData?.invitedBy?.userType ?? "")}`;
  }

  return (
    <>
      <View style={[styles.container]}>
        <Image
          style={styles.displayPic}
          source={{
            uri: bookingData.bookedBy?.imageUrl,
          }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 15,
            justifyContent: "center",
          }}
        >
          {bookingData?.invitedBy && renderInvitedBy()}

          <View style={styles.description}>
            <LatoText
              numberOfLines={1}
              style={[
                {
                  textAlign: "left",
                  fontSize: 24,
                  color: "white",
                  fontWeight: "500",
                },
              ]}
            >
              {bookingData.bookedBy.fullName}
            </LatoText>
            <LatoText
              style={{
                color: GlobalConsts.Colors.white,
                marginTop: 5,
                fontSize: 12,
              }}
            >
              {bookingData?.bookedBy?.email ?? ""}
            </LatoText>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <LatoText
                style={{
                  color: GlobalConsts.Colors.white,
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                {formatedDate}
              </LatoText>
              <LatoText
                style={{
                  color: GlobalConsts.Colors.white,
                  marginTop: 5,
                  fontSize: 16,
                  color: GlobalConsts.Colors.primaryGreen,
                  fontWeight: "bold",
                }}
              >
                {`${bookingData?.ticket ? "Ticket" : "Table"}`}
              </LatoText>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    flexDirection: "row",
    margin: 8,
    marginHorizontal: 13,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: GlobalConsts.Colors.primaryGrayBackground,
  },
  description: { marginTop: 4 },
  status: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  displayPic: {
    width: 90,
    height: 100,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
    borderColor: GlobalConsts.Colors.primaryGreen,
  },
  roleText: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    color: GlobalConsts.Colors.grey81,
  },
  invitedByContainer: {
    alignItems: "flex-start",
  },
  invitedByInformation: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SummaryCategoryItem;
