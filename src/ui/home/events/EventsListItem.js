import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Animated } from "react-native";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import LatoText from "../../auth/LatoText";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from "react-native-gesture-handler";
import { USER_ROLES } from "../../../consts/EnumsConts";
import { SwipeEdit, SwipeNote } from "../../../consts/DisplayConsts";
import { EventNotesRoute } from "../../../consts/NavigationConsts";
import LocationIconSvg from "./LocationIconSvg";
import { MD2Colors } from "react-native-paper";
import { AssetImages } from "../../../../assets";

const EventListItem = ({
  eventDetails,
  userRole,
  isClubOwner,
  isAdmin,
  isDoorTeam,
  isPromoter,
  customOnPress,
  onViewGuestsPressed,
}) => {
  const navigation = useNavigation();
  let startTime = moment(eventDetails.startTime).format(
    "ddd MMM DD YYYY hh:mm a"
  );
  let endTime = moment(eventDetails.endTime).format("ddd MMM DD YYYY hh:mm a");

  function onEventPressed() {
    if (customOnPress) {
      customOnPress({ event: eventDetails });
      return;
    }

    switch (userRole) {
      case USER_ROLES.CLUB_OWNER:
        navigation.navigate("EventDetails", { event: eventDetails });
        break;

      case USER_ROLES.ADMIN:
        navigation.navigate("EventDetails", { event: eventDetails });
        break;

      default:
        navigation.navigate("TeamEventDetailScreen", { event: eventDetails });

        break;
    }
  }

  const renderRightAction = () => {
    const pressHandler = () => {
      this.close();
      alert(text);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[
            styles.rightAction,
            { backgroundColor: GlobalConsts.Colors.SLATE_GRAY },
          ]}
          onPress={pressHandler}
        >
          <AntDesign
            style={{ paddingRight: 10 }}
            name="edit"
            size={28}
            color="#FFFFFF"
          />
          <LatoText style={styles.actionText}>{SwipeEdit}</LatoText>
        </RectButton>
      </Animated.View>
    );
  };

  const renderLeftAction = () => {
    const pressHandler = () => {
      this.close();
      alert(text);
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.leftAction, { backgroundColor: "#964CCC77" }]}
          onPress={pressHandler}
        >
          <MaterialIcons
            style={{ marginLeft: 17 }}
            name="comment"
            size={28}
            color="#FFFFFF"
          />
          <LatoText style={styles.actionText}>{SwipeNote}</LatoText>
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <>
      <GestureHandlerRootView>
        <Swipeable
          key={eventDetails.id}
          enabled={isClubOwner || isAdmin || isDoorTeam || isPromoter}
          friction={2}
          leftThreshold={110}
          rightThreshold={110}
          renderLeftActions={
            isClubOwner || isAdmin || isDoorTeam || isPromoter
              ? renderLeftAction
              : null
          }
          renderRightActions={isClubOwner ? renderRightAction : null}
          onSwipeableWillOpen={(direction) => {
            if (direction === "right") {
              navigation.navigate("CreateEventScreen", {
                selectedEvent: eventDetails,
              });
            } else {
              navigation.navigate(EventNotesRoute.name, {
                event: eventDetails,
              });
            }
          }}
        >
          <Pressable
            style={({ pressed }) => [
              styles.container,
              pressed && GlobalStyles.pressed,
            ]}
            onPress={onEventPressed}
          >
            <View style={styles.innerContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    if (eventDetails.imageUrl) {
                      navigation.navigate("EventImageScreen", {
                        imageUrl: eventDetails.imageUrl,
                      });
                    } else {
                    }
                  }}
                  style={({ pressed }) => [
                    styles.eventImageContainer,
                    pressed && GlobalStyles.pressed,
                  ]}
                >
                  {!eventDetails.imageUrl && (
                    <EventFlyerSvg width={35} height={35} />
                  )}
                  {eventDetails.imageUrl && (
                    <Image
                      width={85}
                      height={85}
                      style={{
                        width: 85,
                        height: 85,
                      }}
                      source={{
                        uri: eventDetails.imageUrl,
                      }}
                    ></Image>
                  )}
                </Pressable>
                <LatoText
                  style={[styles.eventName, { flex: 1, marginLeft: 15 }]}
                  maxLines={3}
                >
                  {eventDetails.eventName}
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
                  source={AssetImages.clock}
                />
                <LatoText style={styles.innerRowSecond}>{startTime}</LatoText>
              </View>
              <View style={styles.innerRowView}>
                <Image
                  style={{
                    height: 18,
                    width: 22,
                    resizeMode: "contain",
                    tintColor: GlobalConsts.Colors.primaryGreen,
                  }}
                  source={AssetImages.clock}
                />
                <LatoText style={styles.innerRowSecond}>{endTime}</LatoText>
              </View>
              <View style={styles.innerRowView}>
                <LocationIconSvg width={20} />
                <LatoText style={styles.innerRowSecond} maxLines={2}>
                  {eventDetails.location}
                </LatoText>
              </View>
            </View>
          </Pressable>
        </Swipeable>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 220,
    padding: 10,
  },
  eventName: {
    fontSize: 22,
    fontWeight: "bold",
    color: MD2Colors.white,
    marginVertical: 0,
  },
  eventImageContainer: {
    width: 85,
    height: 85,
    backgroundColor: "#FFFFFF33",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    borderColor: GlobalConsts.Colors.primaryGreen,
    borderWidth: 1,
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: GlobalConsts.Colors.primaryGrayBackground,
    borderRadius: 12,
    opacity: 1,
    padding: 15,
  },
  innerRowView: {
    flexDirection: "row",
    marginTop: 2,
    alignItems: "center",
    paddingRight: 4,
    minHeight: 40,
  },

  innerRowSecond: {
    marginLeft: 10,
    color: "#FFFFFF",
    fontSize: 15,
    marginRight: 10,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center",
    margin: 10,
    borderRadius: 12,
  },
  leftAction: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
    margin: 10,
    borderRadius: 12,
  },
});

export default EventListItem;
