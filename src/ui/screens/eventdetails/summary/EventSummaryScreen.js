import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import DetailHeaderView from "../../../components/DetailHeaderView";
import { GlobalConsts, GlobalStyles } from "../../../../consts/GlobalConsts";
import { useFocusEffect } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BackgroundLinearGradient from "../../../components/BackgroundLinearGradient";
import SummaryCounter from "../../../components/SummaryCounter";
import LatoText from "../../../auth/LatoText";
import { USER_ROLES } from "../../../../consts/EnumsConts";
import { ConstRoles } from "../../../role/ConstRoles";
import RoleItem from "../../../role/role-item/RoleItem";
import { AssetImages } from "../../../../../assets";
import { GetGeneralEventSummaryAPI } from "../../../apis/EndPoints";
import { getAxiosClient } from "../../../apis/TallyApi";
import { parseExpoError } from "../../../../utils/AxiosErrorParser";

export default function EventSummaryScreen({ navigation, route }) {
  const { event } = route?.params;
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [counter, setCounter] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [generalSummary, setGeneralSummary] = useState({
    totalDoorTeam: 0,
    totalPromoters: 0,
    totalTicketSold: 0,
    totalTableSold: 0,
    totalGuestsCheckedIn: 0,
    totalExpectedGuests: 0,
  });

  const categoryItems = [
    { id: 0, label: "Admins", userType: USER_ROLES.ADMIN },
    { id: 1, label: "Door Teams", userType: USER_ROLES.DOOR_TEAM },
    { id: 2, label: "Promoters", userType: USER_ROLES.PROMOTOR },
    { id: 3, label: "Bartenders", userType: USER_ROLES.BARTENDER },
    { id: 4, label: "Security", userType: USER_ROLES.SECURITY },
  ];
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.mUser;
  });
  let isClubOwner = currentUser.isClubOwner;
  let isAdmin = currentUser.isAdmin;
  let isDoorTeam = currentUser.isDoorTeam;
  let isPromoter = currentUser.isPromoter;
  const roles = ConstRoles;

  useFocusEffect(
    React.useCallback(() => {
      async function getGeneralEventSummary() {
        try {
          setLoading(true);

          let response = await getAxiosClient().get(GetGeneralEventSummaryAPI, {
            params: { eventId: selectedEvent.id },
          });
          let payload = response.data.payLoad;
          setGeneralSummary(payload);
        } catch (err) {
          let response = parseExpoError(err);
          showAlert(response.message);
        } finally {
          setLoading(false);
        }
      }

      getGeneralEventSummary();

      return function cleanup() {
        setIsRefreshing(false);
        console.log("Cleanup job execution has started");
      };
    }, [counter])
  );

  function onRefresh() {
    setCounter(counter + 1);
  }

  function onSummaryItemPressed(type) {
    navigation.navigate("SummaryDetailScreen", {
      summaryForRole: type,
      event: selectedEvent,
    });
  }

  function renderCategories() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.listContainer}>
          <View style={[GlobalStyles.row]}>
            <RoleItem
              id={123}
              description={"Ticket"}
              image={AssetImages.ticketIcon}
              type={"Ticket"}
              height={120}
              fontSize={14}
              onRolePressHandler={() => {
                onSummaryItemPressed("Ticket");
              }}
            />
            <RoleItem
              id={321}
              description={"Table"}
              image={AssetImages.tableIcon}
              type={"Table"}
              height={120}
              fontSize={14}
              onRolePressHandler={() => {
                onSummaryItemPressed("Table");
              }}
            />
          </View>

          <View style={[GlobalStyles.row]}>
            <RoleItem
              id={roles[1].id}
              description={"Admin"}
              image={roles[1].image}
              type={roles[1].type}
              height={120}
              fontSize={14}
              onRolePressHandler={() => {
                onSummaryItemPressed(USER_ROLES.ADMIN);
              }}
            />
            <RoleItem
              id={roles[2].id}
              description={"Door Team"}
              image={roles[2].image}
              type={roles[2].type}
              height={120}
              fontSize={14}
              onRolePressHandler={() => {
                onSummaryItemPressed(USER_ROLES.DOOR_TEAM);
              }}
            />
          </View>

          <View style={[GlobalStyles.row]}>
            <RoleItem
              id={roles[3].id}
              description={"Promoter"}
              image={roles[3].image}
              type={roles[3].type}
              height={120}
              fontSize={14}
              onRolePressHandler={() => {
                onSummaryItemPressed(USER_ROLES.PROMOTOR);
              }}
            />
            <RoleItem
              id={roles[4].id}
              description={"Bartender"}
              image={roles[4].image}
              type={roles[4].type}
              height={120}
              fontSize={14}
              onRolePressHandler={() => {
                onSummaryItemPressed(USER_ROLES.BARTENDER);
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  function renderCouterView() {
    return (
      <View style={styles.counterContainer}>
        <View style={styles.counterRow}>
          <SummaryCounter
            title="Door Team"
            asset={AssetImages.doorteamCount}
            count={generalSummary.totalDoorTeam}
          />
          <SummaryCounter
            title="Promoters"
            asset={AssetImages.promoterCount}
            count={generalSummary.totalPromoters}
          />
          <SummaryCounter
            title="Guests Checked In"
            asset={AssetImages.guestsCheckedIn}
            count={generalSummary.totalGuestsCheckedIn}
          />
        </View>
        <View style={styles.counterRow}>
          <SummaryCounter
            title="Total Tickets Sold"
            asset={AssetImages.ticketSold}
            count={generalSummary.totalTicketSold}
          />
          <SummaryCounter
            title="Total Tables Sold"
            asset={AssetImages.tableSold}
            count={generalSummary.totalTableSold}
          />
          <SummaryCounter
            title="Expected Count of Guests"
            asset={AssetImages.expectedCount}
            count={generalSummary.totalExpectedGuests}
          />
        </View>
      </View>
    );
  }

  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BackgroundLinearGradient>
          <SafeAreaView style={styles.container}>
            <DetailHeaderView
              title={""}
              backButtonLabel={event.eventName ?? "Back"}
            />
            <View
              style={{
                flex: 1,
                paddingHorizontal: 10,
              }}
            >
              <LatoText style={styles.labelText}>Summary</LatoText>
              {renderCouterView()}
              <LatoText style={[styles.labelText, { marginTop: 15 }]}>
                View Summary
              </LatoText>
              <View style={{ flex: 1 }}>{renderCategories()}</View>
            </View>

            <Loading isLoading={loading}></Loading>
          </SafeAreaView>
        </BackgroundLinearGradient>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 20,
    marginVertical: 20,
    fontFamily: "Lato_700Bold",
  },
  contentContainer: {
    flex: 1,
  },
  labelText: {
    color: GlobalConsts.Colors.primaryGreen,
    fontSize: 16, // Adjust based on design
    marginVertical: 10,
    fontWeight: "bold",
  },
  actionButton: {
    backgroundColor: GlobalConsts.Colors.CARD_LIGHT_GREY,
    borderRadius: 5,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  rightAction: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center",
    margin: 10,
    borderRadius: 12,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  counterContainer: {
    backgroundColor: GlobalConsts.Colors.primaryGreen25,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  textHeading: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 9,
  },
  textDesc: { color: "white", fontSize: 16 },
  listContainer: { flex: 1 },
});
