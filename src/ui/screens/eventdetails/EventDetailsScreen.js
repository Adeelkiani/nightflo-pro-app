import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import BackgroundLinearGradient from "../../components/BackgroundLinearGradient";
import EventOrganizersItem from "./EventOrganizersItem";
import EventOrganizerSubItem from "./EventOrganizerSubItem";
import { getAxiosClient } from "../../apis/TallyApi";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { useFocusEffect } from "@react-navigation/native";
import { showAlert } from "../../../utils/Alert";
import { USER_ROLES } from "../../../consts/EnumsConts";
import { PaperProvider } from "react-native-paper";
import DetailHeaderView from "../../components/DetailHeaderView";
import EventDetailCardView from "../../components/EventDetailCardView";
import { Image } from "react-native";

const EventDetailsScreen = ({ navigation, route }) => {
  const [loading, setIsLoading] = useState(false);
  const selectedEvent = route.params?.event;

  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  const [admins, setAdmins] = useState([]);
  const [doorman, setDoorMan] = useState([]);
  const [promotors, setPromoters] = useState([]);
  const [staff, setStaff] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function getOrganizers() {
        try {
          setIsLoading(true);

          let response = await getAxiosClient().get(
            `eventsorganizers/allByEventId/${selectedEvent.id}`
          );
          let responseData = response.data.payLoad;
          currentUser?.isClubOwner && setAdmins(responseData.admins);
          setDoorMan(responseData.doorman);
          setPromoters(responseData.promotors);
          setStaff(responseData.staff);
        } catch (err) {
          let response = parseExpoError(err);

          showAlert(response.message);
        } finally {
          setIsLoading(false);
        }
      }
      getOrganizers();

      return function cleanup() {
        console.log("Cleanup job execution has started");
      };
    }, [])
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

  const navigateToEventSummaryScreen = () => {
    navigation.navigate("EventSummaryScreen", {
      event: selectedEvent,
    });
  };

  const navigateToGuestListScreen = () => {
    navigation.navigate("GuestListScreen", {
      event: selectedEvent,
    });
  };

  return (
    <>
      <BackgroundLinearGradient>
        <SafeAreaView style={styles.container}>
          <View
            style={styles.container}
            extraScrollHeight={300}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.scrollContainer}>
              <DetailHeaderView title="" />
              <ScrollView
                style={styles.mainContainer}
                contentContainerStyle={{
                  paddingBottom: 45,
                }}
              >
                <PaperProvider>
                  <EventDetailCardView
                    event={selectedEvent}
                    onEventTicketPressed={navigateToTicketScreen}
                    onEventTablePressed={navigateToTableScreen}
                    onGuestListPressed={navigateToGuestListScreen}
                    onEventSummaryPressed={navigateToEventSummaryScreen}
                  />

                  {currentUser?.isClubOwner && (
                    <EventOrganizersItem>
                      <EventOrganizerSubItem
                        title={"Admins"}
                        userType={USER_ROLES.ADMIN}
                        selectedEvent={selectedEvent}
                        listItems={admins}
                        icon={
                          <Image
                            style={styles.organizerPlaceholder}
                            source={require("../../../../assets/admin_icon.png")}
                          />
                        }
                        noMembersText={"No admins on board"}
                        navigationRoute={"ManageOraganizers"}
                      />
                    </EventOrganizersItem>
                  )}

                  <EventOrganizersItem>
                    <EventOrganizerSubItem
                      title={"Door Team"}
                      userType={USER_ROLES.DOOR_TEAM}
                      selectedEvent={selectedEvent}
                      listItems={doorman}
                      icon={
                        <Image
                          style={styles.organizerPlaceholder}
                          source={require("../../../../assets/doorteam_placeholder.png")}
                        />
                      }
                      noMembersText={"No door team on board"}
                      navigationRoute={"ManageOraganizers"}
                    />
                  </EventOrganizersItem>
                  <EventOrganizersItem>
                    <EventOrganizerSubItem
                      title={"Promoters"}
                      userType={USER_ROLES.PROMOTOR}
                      selectedEvent={selectedEvent}
                      listItems={promotors}
                      icon={
                        <Image
                          style={styles.organizerPlaceholder}
                          source={require("../../../../assets/promoter_placeholder.png")}
                        />
                      }
                      noMembersText={"No promoters on board"}
                      navigationRoute={"ManageOraganizers"}
                    />
                  </EventOrganizersItem>

                  <EventOrganizersItem>
                    <EventOrganizerSubItem
                      title={"Team"}
                      isDoorTeam={true}
                      selectedEvent={selectedEvent}
                      listItems={staff}
                      isStaff={true}
                      icon={
                        <Image
                          style={styles.staffPlaceholder}
                          source={require("../../../../assets/organizers-placeholder.png")}
                        />
                      }
                      noMembersText={"No team on board"}
                      navigationRoute={"ManageStaffScreen"}
                    />
                  </EventOrganizersItem>
                </PaperProvider>
              </ScrollView>
              <Loading isLoading={loading}></Loading>
            </View>
          </View>
        </SafeAreaView>
      </BackgroundLinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: { height: "100%" },
  mainContainer: {
    marginTop: 10,
    paddingBottom: 100,
  },

  pressableStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  organizerPlaceholder: {
    height: 70,
    width: 70,
    resizeMode: "contain",
  },
  staffPlaceholder: {
    height: 70,
    width: 110,
    resizeMode: "contain",
  },
});

export default EventDetailsScreen;
