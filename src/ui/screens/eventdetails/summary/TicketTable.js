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
import { GetBookingsSummaryAPI } from "../../../apis/EndPoints";
import SummaryItem from "./SummaryItem";
import EmptyDataView from "../../../components/EmptyDataView";
import { getAxiosClient } from "../../../apis/TallyApi";
import { parseExpoError } from "../../../../utils/AxiosErrorParser";
import { showAlert } from "../../../../utils/Alert";
import LatoText from "../../../auth/LatoText";
import { getDisplayNameOfRole } from "../../../../utils/StringUtils";

export default function SummaryDetailScreen({ navigation, route }) {
  const { summaryForRole, event } = route?.params;
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [organizersSummary, setOrganizersSummary] = useState([]);
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

          setOrganizersSummary(summary);
        } catch (err) {
          let response = parseExpoError(err);
          showAlert(response.message);
        } finally {
          setLoading(false);
        }
      }

      getBookingsSummaryAPI(summaryForRole);

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
      let summary = organizersSummary.filter((item) => {
        return (
          item?.organizer?.organizer?.email
            ?.toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item?.organizer?.organizer?.fullName
            ?.toLowerCase()
            .startsWith(value.toLowerCase())
        );
      });
      setFilteredOrganizersSummary(summary);
    }

    filter(enteredValue);
  }

  function renderItem(item) {
    return <SummaryItem summary={item} />;
  }

  function renderOrganizersSummary() {
    return (
      <FlatList
        style={{ flex: 1, marginTop: 15 }}
        data={
          getSearchTextLength() > 0
            ? filteredOrganizersSummary
            : organizersSummary
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
                {`${getDisplayNameOfRole(summaryForRole)}s Summary`}
              </LatoText>

              <SearchView
                placeholder={"Search by name or an email"}
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
