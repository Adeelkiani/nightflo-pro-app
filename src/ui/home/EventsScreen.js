import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as Device from "expo-device";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Platform,
  RefreshControl,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import { setEvents } from "../../redux/EventsReducer";
import { parseExpoError } from "../../utils/AxiosErrorParser";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { getAxiosClient } from "../apis/TallyApi";
import LatoText from "../auth/LatoText";
import EventListItem from "./events/EventsListItem";
import RootView from "../components/RootView";
import * as Notifications from "expo-notifications";
import { setDeviceToken } from "../../redux/UserReucer";
import { setRequests } from "../../redux/RequestsReducer";
import { showAlert } from "../../utils/Alert";
import NoContentView from "../components/NoContentView";
import { LinearGradient } from "expo-linear-gradient";
import FabButton from "../components/FabButton";

const EventsScreen = ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  let isClubOwner = currentUser.isClubOwner;
  let isAdmin = currentUser.isAdmin;
  let isDoorTeam = currentUser.isDoorTeam;
  let isPromoter = currentUser.isPromoter;
  let { isPlanSubscribed } = currentUser?.club ?? {};

  let userEvents = useSelector((state) => {
    return state.events.events;
  });
  const [counter, setCounter] = useState(0);

  const registerForPushNotificationsAsync = async () => {
    if (!currentUser.tokenPosted) {
      console.log("Token was not posted so pushing the token to server");
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          showAlert("Failed to get push token for push notification!");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        dispatch(setDeviceToken({ deviceToken: token }));
        try {
          let response = await getAxiosClient().post("notifications", {
            deviceId: token,
          });
          console.log("Token Api Response", response.data);
          dispatch(setDeviceToken({ tokenPosted: true }));
        } catch (err) {
          console.error(err);
          let response = parseExpoError(err);
          showAlert(response.message);
        }
      } else {
        dispatch(setDeviceToken({ tokenPosted: true }));
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } else {
      console.log(
        "Token Already Posted to the server so ignoring it for this session"
      );
    }
  };

  useEffect(() => {
    const registerNotification = () => {
      registerForPushNotificationsAsync();
    };

    registerNotification();

    if (!isPlanSubscribed) {
      // navigateToSubscribePlan();
    }
  }, []);

  function onRefresh() {
    setCounter(counter + 1);
  }

  useFocusEffect(
    React.useCallback(() => {
      async function performApiCall() {
        try {
          setIsLoading(true);
          let response = await getAxiosClient().get(
            selectedIndex == 0 ? "events" : "events/past"
          );
          console.log(response.data.payLoad);
          if (response.data.payLoad) {
            dispatch(setEvents(response.data.payLoad));
          }
        } catch (err) {
          let response = parseExpoError(err);
          showAlert(response.message);
        } finally {
          setIsLoading(false);
        }

        try {
          if (currentUser.userType !== "ADMIN") {
            let response = await getAxiosClient().get("requests/count");
            dispatch(
              setRequests({
                requestCount: response.data.payLoad.requestCount,
              })
            );
          } else {
            console.log(
              "Current user Type is Admin so ignoring request count call",
              currentUser
            );
          }
        } catch (err) {
          let response = parseExpoError(err);

          showAlert(response.message);
        } finally {
        }
      }

      (isPlanSubscribed || !isClubOwner) && performApiCall();

      return function cleanup() {
        console.log("Cleanup job execution has started");
      };
    }, [selectedIndex, counter, isPlanSubscribed])
  );

  const createEventHandler = () => {
    navigation.navigate("CreateEventScreen");
  };

  function navigateToSubscribePlan() {
    navigation.navigate("PaymentPlanScreen");
  }

  function getFab() {
    return <FabButton onPress={createEventHandler} />;
  }

  function renderEmptyView() {
    if (!isPlanSubscribed && isClubOwner) {
      return (
        <NoContentView
          message="Your club is not yet subscribed to any plan"
          buttonTitle="Purchase Plan"
          onActionPressed={navigateToSubscribePlan}
        />
      );
    } else if (isClubOwner) {
      return (
        <NoContentView message="No event created yet, tap on + to create an event" />
      );
    } else {
      return <NoContentView message="No event created yet" />;
    }
  }

  function RenderEvents({ userEvents, customOnPress, swipeDisabled }) {
    return (
      <View style={styles.container}>
        <View style={styles.noEvent}>
          <FlatList
            style={styles.listContainer}
            renderItem={({ item }) => (
              <EventListItem
                customOnPress={customOnPress}
                eventDetails={item}
                userRole={currentUser.userType}
                isClubOwner={isClubOwner}
                isAdmin={isAdmin}
                isDoorTeam={isDoorTeam}
                isPromoter={isPromoter}
                disabled={swipeDisabled}
              ></EventListItem>
            )}
            keyExtractor={(item) => {
              return item.id;
            }}
            data={userEvents}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={onRefresh}
                tintColor={"white"}
              />
            }
            ListEmptyComponent={renderEmptyView()}
          ></FlatList>
        </View>
      </View>
    );
  }

  return (
    <>
      <RootView loading={loading}>
        <View style={styles.container}>
          <SegmentedControlTab
            style={{ height: 50, marginTop: 20 }}
            values={["Upcoming", "Past"]}
            borderRadius={8}
            tabsContainerStyle={GlobalStyles.tabsContainerStyle}
            tabStyle={GlobalStyles.tabStyle}
            tabTextStyle={GlobalStyles.tabTextStyle}
            activeTabTextStyle={GlobalStyles.activeTabTextStyle}
            activeTabStyle={GlobalStyles.activeTabStyle}
            tabdis
            enabled={true}
            selectedIndex={selectedIndex}
            onTabPress={(index) => {
              setSelectedIndex(index);
            }}
          ></SegmentedControlTab>

          <RenderEvents userEvents={userEvents}></RenderEvents>
          {isClubOwner && isPlanSubscribed && getFab()}
        </View>
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noEvent: {
    height: Dimensions.get("window").height * 0.86,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    width: "70%",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  listContainer: {
    width: "100%",

    marginBottom: 90,
  },
  sectionHeader: {
    color: "#FFFFFF33",
    fontSize: 18,
    marginLeft: 20,
    marginTop: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    borderRadius: 20,
    height: 65,
    width: "95%",
    margin: 16,
  },
  fabStyle: {
    borderRadius: 32,
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EventsScreen;
