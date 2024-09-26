import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import SearchView from "../../../components/SearchView";
import DetailHeaderView from "../../../components/DetailHeaderView";
import { GlobalConsts, GlobalStyles } from "../../../../consts/GlobalConsts";
import { useFocusEffect } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BackgroundLinearGradient from "../../../components/BackgroundLinearGradient";
import {
  GetBookingsSummaryAPI,
  GetBookingsSummaryByTypeAPI,
} from "../../../apis/EndPoints";
import SummaryItem from "./SummaryItem";
import EmptyDataView from "../../../components/EmptyDataView";
import { getAxiosClient } from "../../../apis/TallyApi";
import { parseExpoError } from "../../../../utils/AxiosErrorParser";
import { showAlert } from "../../../../utils/Alert";
import LatoText from "../../../auth/LatoText";
import { getDisplayNameOfRole } from "../../../../utils/StringUtils";
import TicketTableSummaryItem from "./TicketTableSummaryItem";

export default function SummaryDetailScreen({ navigation, route }) {
  const { summaryForRole, event } = route?.params;
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [summaryData, setSummaryData] = useState([]);
  const [filteredOrganizersSummary, setFilteredOrganizersSummary] = useState(
    []
  );
  const [counter, setCounter] = useState(1);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.mUser;
  });
  let isClubOwner = currentUser.isClubOwner;
  let isAdmin = currentUser.isAdmin;
  let isDoorTeam = currentUser.isDoorTeam;
  let isPromoter = currentUser.isPromoter;
  const isOfTypeRole =
    summaryForRole !== "Ticket" && summaryForRole !== "Table";

  useFocusEffect(
    React.useCallback(() => {
      async function getBookingsSummaryAPI(userType) {
        try {
          setLoading(true);

          let parameters = {
            eventId: selectedEvent.id,
            userType: userType,
          };

          const requestURL = `${GetBookingsSummaryAPI}`;
          let response = await getAxiosClient().get(requestURL, {
            params: parameters,
          });
          let summary = response.data.payLoad;

          setSummaryData(summary);
        } catch (err) {
          let response = parseExpoError(err);
          showAlert(response.message);
        } finally {
          setLoading(false);
        }
      }

      async function getBookingsSummaryByTypeAPI(bookingType) {
        try {
          setLoading(true);

          let parameters = {
            eventId: selectedEvent.id,
            bookingType: bookingType,
          };

          const requestURL = `${GetBookingsSummaryByTypeAPI}`;
          let response = await getAxiosClient().get(requestURL, {
            params: parameters,
          });
          let summary = response.data.payLoad;

          setSummaryData(summary);
        } catch (err) {
          let response = parseExpoError(err);
          showAlert(response.message);
        } finally {
          setLoading(false);
        }
      }

      if (isOfTypeRole) {
        getBookingsSummaryAPI(summaryForRole);
      } else {
        getBookingsSummaryByTypeAPI(summaryForRole);
      }

      return function cleanup() {
        setIsRefreshing(false);
        console.log("Cleanup job execution has started");
      };
    }, [counter])
  );

  function onRefresh() {
    setCounter(counter + 1);
  }

  function getSearchTextLength() {
    if (searchText) {
      return searchText.length;
    }
    return 0;
  }

  function updateInputValueHandler(inputType, enteredValue) {
    setSearchText(enteredValue);
    async function filter(value) {
      let summary = [];
      if (isOfTypeRole) {
        summary = summaryData.filter((item) => {
          return (
            item?.organizer?.organizer?.email
              ?.toLowerCase()
              .startsWith(value.toLowerCase()) ||
            item?.organizer?.organizer?.fullName
              ?.toLowerCase()
              .startsWith(value.toLowerCase())
          );
        });
      } else {
        summary = summaryData.filter((item) => {
          return (
            item?.data?.name?.toLowerCase().startsWith(value.toLowerCase()) ||
            item?.data?.tableNumber
              ?.toLowerCase()
              .startsWith(value.toLowerCase())
          );
        });
      }

      setFilteredOrganizersSummary(summary);
    }

    filter(enteredValue);
  }

  function renderItem(item) {
    return isOfTypeRole ? (
      <SummaryItem summary={item} />
    ) : (
      <TicketTableSummaryItem summary={item} type={summaryForRole} />
    );
  }

  function renderOrganizersSummary() {
    return (
      <FlatList
        style={{ flex: 1, marginTop: 15 }}
        data={
          getSearchTextLength() > 0 ? filteredOrganizersSummary : summaryData
        }
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => {
          return item.id;
        }}
        ListEmptyComponent={<EmptyDataView message="No data availble" />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={"white"}
          />
        }
      ></FlatList>
    );
  }

  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BackgroundLinearGradient>
          <SafeAreaView style={styles.container}>
            <DetailHeaderView title={""} backButtonLabel={"Back"} />
            <View
              style={{
                flex: 1,
                marginTop: 15,
              }}
            >
              <LatoText
                style={[styles.labelText, { marginLeft: 15, marginBottom: 15 }]}
              >
                {`${
                  isOfTypeRole
                    ? getDisplayNameOfRole(summaryForRole)
                    : summaryForRole
                }s Summary`}
              </LatoText>

              <SearchView
                placeholder={
                  isOfTypeRole
                    ? "Search by name or an email"
                    : `Search by ${summaryForRole.toLowerCase()} name`
                }
                onUpdateValue={updateInputValueHandler.bind(this, "invites")}
              />

              <View style={{ flex: 1 }}>{renderOrganizersSummary()}</View>
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
    color: GlobalConsts.Colors.white,
    fontSize: 22, // Adjust based on design
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
