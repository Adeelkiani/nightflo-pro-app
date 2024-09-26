import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import BackgroundLinearGradient from "../../components/BackgroundLinearGradient";
import { getAxiosClient } from "../../apis/TallyApi";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { useFocusEffect } from "@react-navigation/native";
import { showAlert } from "../../../utils/Alert";
import { VIEW_TALLY } from "../../../consts/DisplayConsts";

import EventDetailCardView from "../../components/EventDetailCardView";
import DetailHeaderView from "../../components/DetailHeaderView";
import useModal, { MODAL_TYPE } from "../../../hooks/ModalHook";

const TeamEventDetailScreen = ({ navigation, route }) => {
  const [loading, setIsLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectedEvent = route.params?.event;

  const [promotors, setPromoters] = useState([]);
  const [doorman, setDoorMan] = useState([]);
  let [counter, setCounter] = useState(1);
  let [TextToRender, setTextToRender] = useState(VIEW_TALLY);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  let isClubOwner = currentUser.isClubOwner;
  let isAdmin = currentUser.isAdmin;
  let isDoorTeam = currentUser.isDoorTeam;

  const {
    isVisible: isTicketPopupVisible,
    data: popupData,
    show: showTicketPopup,
    hide: hideTicketPopup,
  } = useModal();

  useFocusEffect(
    React.useCallback(() => {
      async function getOrganizers() {
        try {
          setIsLoading(true);
          let textToRender = selectedEvent.pastEvent ? VIEW_TALLY : VIEW_TALLY;
          let subAppend = "";
          if (!isClubOwner && !isAdmin) {
            switch (currentUser.userType) {
              case "DOOR_TEAM":
                subAppend = "promotors/";
                setTextToRender(textToRender);
                break;

              case "PROMOTOR":
                subAppend = "doorteam/";
                break;
            }
          }
          let append = isClubOwner || isAdmin ? "" : subAppend;

          let path = `eventsorganizers/allByEventId/${append}${selectedEvent.id}`;
          let response = await getAxiosClient().get(
            path
            // `eventsorganizers/allByEventId/${selectedEvent.id}`
          );
          let responseData = response.data.payLoad;
          setDoorMan(responseData.doorman);
          setPromoters(responseData.promotors);
        } catch (err) {
          let response = parseExpoError(err);

          showAlert(response.message);
        } finally {
          setIsLoading(false);
        }
      }

      return function cleanup() {
        setIsRefreshing(false);
        console.log("Cleanup job execution has started");
      };
    }, [counter])
  );

  const navigateToTicketScreen = () => {
    navigation.navigate("TicketAndTableScreen", {
      event: selectedEvent,
      isTicket: true,
    });
  };

  const navigateToTableScreen = () => {
    navigation.navigate("TicketAndTableScreen", {
      event: selectedEvent,
      isTicket: false,
    });
  };

  return (
    <BackgroundLinearGradient>
      <SafeAreaView style={styles.container}>
        <View
          style={styles.container}
          extraScrollHeight={300}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View>
            <DetailHeaderView currentUserType={currentUser.userType} title="" />

            <ScrollView style={styles.mainContainer}>
              <EventDetailCardView
                event={selectedEvent}
                onEventTicketPressed={navigateToTicketScreen}
                onEventTablePressed={navigateToTableScreen}
                currentUser={currentUser}
              />
            </ScrollView>

            <Loading isLoading={loading}></Loading>
          </View>
        </View>
      </SafeAreaView>
    </BackgroundLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
  mainContainer: {
    marginTop: 10,
    height: "100%",
  },
});

export default TeamEventDetailScreen;
