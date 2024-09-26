import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { GetBookingsAPI, VerifyBookingAPI } from "../../../apis/EndPoints";
import BackgroundLinearGradient from "../../../components/BackgroundLinearGradient";
import Loading from "../../../components/Loading";
import {
  BOOKING_VERIFIED,
  GuestList,
  TabArrived,
  TabCheckedIn,
} from "../../../../consts/DisplayConsts";
import { getAxiosClient } from "../../../apis/TallyApi";
import EmptyDataView from "../../../components/EmptyDataView";
import {
  showAlert,
  showConfirmationDialog,
  showPermissionDialog,
  showSuccessAlert,
} from "../../../../utils/Alert";
import { parseExpoError } from "../../../../utils/AxiosErrorParser";
import { useDispatch, useSelector } from "react-redux";
import {
  setPendingCheckIns,
  setVerifiedCheckInById,
  setVerifiedCheckIns,
} from "../../../../redux/GuestList/GuestInvitesReducer";
import { GlobalConsts, GlobalStyles } from "../../../../consts/GlobalConsts";
import { GUEST_LIST_TAB_TYPE } from "../../../../consts/EnumsConts";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { MD2Colors, Modal, PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BarCodeScanner } from "expo-barcode-scanner";
import ScanQRPopup from "../ScanQRPopup";

import DetailHeaderView from "../../../components/DetailHeaderView";
import SearchView from "../../../components/SearchView";
import GuestListItem from "./GuestListItem";

export default function GuestListScreen({ navigation, route }) {
  const event = route?.params?.event;
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [filteredInvitesList, setFilteredInvitesList] = useState([]);
  const [counter, setCounter] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [guestListType, setGuestListType] = useState(
    GUEST_LIST_TAB_TYPE.CHECKIN
  );

  const [checkInModalVisible, setCheckInModalVisible] = useState({
    isVisible: false,
    data: {
      scanType: "",
    },
  });
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  //Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // To track if there's more data

  const dispatch = useDispatch();

  let verifiedCheckIns = useSelector((state) => {
    return state.guestInvites.verifiedCheckIns
      ? state.guestInvites.verifiedCheckIns.slice()
      : [];
  });

  let pendingCheckIns = useSelector((state) => {
    return state.guestInvites.pendingCheckIns
      ? state.guestInvites.pendingCheckIns.slice()
      : [];
  });

  const currentUser = useSelector((state) => {
    return state.mUser;
  });
  let isClubOwner = currentUser.isClubOwner;
  let isAdmin = currentUser.isAdmin;
  let isDoorTeam = currentUser.isDoorTeam;
  let isPromoter = currentUser.isPromoter;

  useFocusEffect(
    React.useCallback(() => {
      async function getInvites(status) {
        try {
          setLoading(true);

          let parameters = {
            eventId: selectedEvent.id,
            status,
          };

          const requestURL = `${GetBookingsAPI}`;
          let response = await getAxiosClient().get(requestURL, {
            params: parameters,
          });
          let invites = response.data.payLoad;
          // setHasMore(invites.length > 0);

          if (guestListType === GUEST_LIST_TAB_TYPE.ARRIVED) {
            dispatch(setVerifiedCheckIns(invites));
          } else {
            dispatch(setPendingCheckIns(invites));
          }
        } catch (err) {
          let response = parseExpoError(err);
          showAlert(response.message);
        } finally {
          setLoading(false);
        }
      }

      switch (guestListType) {
        case GUEST_LIST_TAB_TYPE.CHECKIN:
          getInvites("pending");
          if (searchText.length > 0) {
            filterInvites(searchText);
          }
          break;
        case GUEST_LIST_TAB_TYPE.ARRIVED:
          getInvites("verified");
          if (searchText.length > 0) {
            filterInvites(searchText);
          }
          break;
      }

      getBarCodeScannerPermissions();

      return function cleanup() {
        setIsRefreshing(false);
        console.log("Cleanup job execution has started");
      };
    }, [guestListType, counter, page])
  );

  function validateQRData(scannedData) {
    if (
      !scannedData?.bookingId ||
      (scannedData?.isTicket === undefined && scannedData?.isTicket === null)
    ) {
      showAlert("Booking QR contains invalid data");
      console.error("Booking QR should contain bookingId and isTicket");
      return false;
    }
    return true;
  }

  // Load more data when the end is reached
  const loadMoreData = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Render footer for loader
  const renderFooter = () => {
    return hasMore && loading ? (
      <ActivityIndicator
        size="large"
        color={GlobalConsts.Colors.primaryGreen}
      />
    ) : null;
  };

  function onRefresh() {
    setCounter(counter + 1);
  }

  async function verifyBookingAPI({ bookingId, isTicket }) {
    try {
      setLoading(true);

      let parameters = {
        bookingId: bookingId,
        eventId: selectedEvent.id,
        isTicket: isTicket,
      };

      let response = await getAxiosClient().post(VerifyBookingAPI, parameters);
      let responseData = response.data.payLoad;
      dispatch(setVerifiedCheckInById(responseData));
      showSuccessAlert(BOOKING_VERIFIED);
    } catch (err) {
      let response = parseExpoError(err);
      showAlert(response.message);
    } finally {
      setLoading(false);
    }
  }

  async function filterInvites(value) {
    let invites = [];
    if (guestListType === GUEST_LIST_TAB_TYPE.ARRIVED) {
      invites = verifiedCheckIns.filter((item) => {
        return (
          item.bookedBy?.email?.toLowerCase().startsWith(value.toLowerCase()) ||
          item.bookedBy?.fullName
            ?.toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.invitedBy?.fullName.toLowerCase().startsWith(value.toLowerCase())
        );
      });
    } else {
      invites = pendingCheckIns.filter((item) => {
        return (
          item.bookedBy?.email?.toLowerCase().startsWith(value.toLowerCase()) ||
          item.bookedBy?.fullName
            ?.toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.invitedBy?.fullName.toLowerCase().startsWith(value.toLowerCase())
        );
      });
    }
    setFilteredInvitesList(invites);
  }

  async function getBarCodeScannerPermissions() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    setHasCameraPermission(status === "granted");

    if (status !== "granted") {
      showPermissionDialog();
    }
  }

  function updateInputValueHandler(inputType, enteredValue) {
    setSearchText(enteredValue);
    filterInvites(enteredValue);
  }

  function getSearchTextLength() {
    if (searchText) {
      return searchText.length;
    }
    return 0;
  }

  const onCancelInvitationPressed = (inviteId) => {
    showConfirmationDialog({
      description: "Are you sure you want to cancel this ticket?.",
      title: "Cancel Ticket",
      positveText: "Cancel Ticket",
      negativeText: "Keep It",
      onContinuePressed: () => {},
    });
  };

  function renderInvites() {
    return (
      <View style={styles.contentContainer}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 15 }}
          data={
            getSearchTextLength() > 0
              ? filteredInvitesList
              : guestListType === GUEST_LIST_TAB_TYPE.ARRIVED
              ? verifiedCheckIns
              : pendingCheckIns
          }
          renderItem={({ item }) => <GuestListItem bookingData={item} />}
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
          // onEndReached={loadMoreData}
          // onEndReachedThreshold={0.5}
          // ListFooterComponent={renderFooter}
        ></FlatList>
      </View>
    );
  }

  function renderSegmentedView() {
    return (
      <SegmentedControlTab
        style={{ height: 50 }}
        values={[TabCheckedIn, TabArrived]}
        borderRadius={8}
        tabsContainerStyle={GlobalStyles.tabsContainerStyle}
        tabStyle={GlobalStyles.tabStyle}
        tabTextStyle={GlobalStyles.tabTextStyle}
        activeTabTextStyle={GlobalStyles.activeTabTextStyle}
        activeTabStyle={GlobalStyles.activeTabStyle}
        tabdisenabled={true}
        selectedIndex={guestListType}
        onTabPress={(index) => {
          setGuestListType(index);
        }}
        badges={[pendingCheckIns?.length ?? 0, verifiedCheckIns?.length ?? 0]}
        activeTabBadgeContainerStyle={{ backgroundColor: MD2Colors.white }}
        tabBadgeContainerStyle={{
          backgroundColor: GlobalConsts.Colors.primaryGreen50,
        }}
      />
    );
  }

  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BackgroundLinearGradient>
          <SafeAreaView style={styles.container}>
            <DetailHeaderView
              title={GuestList}
              onQRPressed={() => {
                setCheckInModalVisible({ isVisible: true });
              }}
            />
            {renderSegmentedView()}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <SearchView
                placeholder={"Search invites by name or an email"}
                onUpdateValue={updateInputValueHandler.bind(this, "invites")}
              />
            </View>

            <View style={{ flex: 1, marginTop: 15 }}>{renderInvites()}</View>
            <Loading isLoading={loading}></Loading>

            <Modal
              transparent={true}
              animationType="fade"
              visible={checkInModalVisible.isVisible}
              onRequestClose={() => {
                setCheckInModalVisible({ isVisible: false });
              }}
            >
              <ScanQRPopup
                heading="Scan Ticket"
                data={{
                  eventId: selectedEvent.id,
                }}
                onQRScanned={(data) => {
                  setCheckInModalVisible({ isVisible: false });

                  try {
                    let scannedData = JSON.parse(data);
                    console.log("SCANNED DATA: ", scannedData);
                    if (validateQRData(scannedData)) {
                      verifyBookingAPI(scannedData);
                    }
                  } catch (err) {
                    showAlert("You are trying to scan an invalid QR");
                  }
                }}
                closePressed={() => {
                  setCheckInModalVisible({ isVisible: false });
                }}
              ></ScanQRPopup>
            </Modal>
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
});
