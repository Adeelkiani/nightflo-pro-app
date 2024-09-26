import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { View, StyleSheet, Image, FlatList, Dimensions } from "react-native";
import { getImageUrl } from "../../../utils/GetImageUrl";
import LatoText from "../../auth/LatoText";
import DottedBorderView from "../../components/DottedBorderView";
import { SvgIcons } from "../../../svgs";
import { PressableView } from "../../components/PressableView";
import GrayBoxIconButton from "../../components/GrayBoxIconButton";
import { GlobalConsts } from "../../../consts/GlobalConsts";

const EventOrganizerSubItem = ({
  title,
  userType,
  selectedEvent,
  listItems,
  icon,
  noMembersText,
  navigationRoute,
}) => {
  const navigation = useNavigation();

  function manageClicked() {
    navigation.navigate(navigationRoute, {
      selectedEvent: selectedEvent,
      userType: userType,
    });
  }

  function headerView() {
    return (
      <PressableView
        onPress={() => {
          manageClicked();
        }}
      >
        <DottedBorderView
          width={40}
          height={40}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <SvgIcons.PlusSvg />
        </DottedBorderView>

        <LatoText
          style={{
            fontSize: 12,
            color: "white",
            marginVertical: 4,
          }}
        >
          Manage
        </LatoText>
      </PressableView>
    );
  }

  function getFlatList() {
    return (
      <FlatList
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
          width: "100%",
        }}
        horizontal={true}
        data={listItems}
        // ListHeaderComponent={() => headerView()}
        keyExtractor={(item) => {
          return item.organizer.id;
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: Dimensions.get("window").width / 1.15,
              }}
            >
              {icon}
              <LatoText style={{ color: "white", fontSize: 12, marginTop: 0 }}>
                {noMembersText}
              </LatoText>
            </View>
          );
        }}
        renderItem={RenderOrganizerListItem}
      />
    );
  }

  return (
    <View
      style={{
        width: "100%",
        paddingBottom: 15,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          marginTop: 16,
        }}
      >
        <LatoText style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
          {title}
        </LatoText>
      </View>
      {getFlatList()}
      <GrayBoxIconButton
        assetIcon={<SvgIcons.AddSvg color={GlobalConsts.Colors.black} />}
        width={120}
        title={"Manage"}
        backgroundColor={GlobalConsts.Colors.primaryGreen}
        textColor={GlobalConsts.Colors.black}
        borderRadius={20}
        onPress={() => {
          manageClicked();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemStyle: {
    height: "100%",
    width: 70,
    alignItems: "center",
    marginHorizontal: 2,
  },
  displayPic: {
    width: 70,
    height: 70,
    borderRadius: 57,
    backgroundColor: "#FFFFFF33",
    borderColor: "white",
    borderWidth: 1,
  },
});

export default EventOrganizerSubItem;

function RenderOrganizerListItem(item) {
  let organizer = item.item.organizer;
  let time = moment.utc(item.item.createdAt).local();
  return (
    <View style={styles.listItemStyle}>
      <Image
        style={styles.displayPic}
        source={{
          uri: getImageUrl(organizer),
        }}
      />
      <LatoText
        style={{
          fontSize: 14,
          color: "white",
          marginVertical: 4,
          fontWeight: "900",
          textAlign: "center",
        }}
        maxLines={2}
      >
        {organizer.fullName}
      </LatoText>
    </View>
  );
}
