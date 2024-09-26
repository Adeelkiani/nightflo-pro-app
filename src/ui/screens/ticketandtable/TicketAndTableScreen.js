import {
  View,
  StyleSheet,
  Pressable,
  RefreshControl,
  Modal,
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useDispatch, useSelector } from "react-redux";
import useState from "react-usestateref";
import { GlobalStyles, GlobalConsts } from "../../../consts/GlobalConsts";
import RootView from "../../components/RootView";
import { useFocusEffect } from "@react-navigation/native";
import { getAxiosClient } from "../../apis/TallyApi";
import { showAlert } from "../../../utils/Alert";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import EmptyDataView from "../../components/EmptyDataView";
import useModal, { MODAL_TYPE } from "../../../hooks/ModalHook";
import MessagePopup from "../../components/popup/MessagePopup";
import DetailHeaderView from "../../components/DetailHeaderView";
import {
  CreateTable,
  CreateTicket,
  GetAllTablesByEvent,
  GetAllTicktsByEvent,
} from "../../apis/EndPoints";
import {
  addEventTicket,
  clearEventTickets,
  setEventTickets,
} from "../../../redux/EventTicketsReducer";
import {
  addEventTable,
  clearEventTables,
  setEventTables,
} from "../../../redux/EventTablesReducer";
import ExpandCollapse from "../../components/ExpandCollapse";
import InvitePopup from "../../components/popup/InvitePopup";

const TicketAndTableScreen = ({ route, navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isRefreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const selectedEvent = route.params?.event;
  const isTicket = route.params?.isTicket;
  const eventId = route.params.event.id;

  const {
    isVisible: isMessagePopupVisible,
    data,
    show: showMesagePopup,
    hide: hideMessagePopup,
  } = useModal();

  const [shareTicketModal, setShareTicketModal] = useState({
    isVisible: false,
    ticketOrTableId: "",
    isTypeTicket: true,
  });

  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  let eventTickets = useSelector((state) => {
    return state.eventTickets.eventTickets;
  });

  let eventTables = useSelector((state) => {
    return state.eventTables.eventTables;
  });

  function onRefresh() {
    setRefreshing(true);
    setCounter(counter + 1);
  }

  useEffect(() => {
    setSelectedIndex(isTicket ? 0 : 1);
    async function performApiCall(index) {
      dispatch(clearEventTickets());
      dispatch(clearEventTables());
      try {
        setIsLoading(true);
        if (index == 0) {
          let response = await getAxiosClient().get(
            GetAllTicktsByEvent + "?eventId=" + eventId
          );
          if (response.data.payLoad) {
            dispatch(setEventTickets(response.data.payLoad));
          } else {
            showAlert(response.data.message);
          }
        } else {
          let response = await getAxiosClient().get(
            GetAllTablesByEvent + "?eventId=" + eventId
          );
          if (response.data.payLoad) {
            dispatch(setEventTables(response.data.payLoad));
          }
        }
      } catch (err) {
        let response = parseExpoError(err);
        showAlert(response.message);
      } finally {
        setIsLoading(false);
        setRefreshing(false);
      }
    }

    performApiCall(0);
    performApiCall(1);

    return function cleanup() {
      console.log("Cleanup job execution has started");
    };
  }, [counter, isTicket]);

  const addHandler = () => {
    navigation.navigate("CreateTicketAndTableScreen", {
      event: selectedEvent,
      isTicket: selectedIndex == 0,
    });
  };

  const addTicket = async (ticketValues) => {
    try {
      setIsLoading(true);
      let response = await getAxiosClient().post(CreateTicket, {
        name: ticketValues.ticketName,
        price: ticketValues.price,
        description: ticketValues.description,
        eventId: eventId,
      });

      console.log(response);
      if (response.data.status == "Success") {
        setModalVisible(false);
        dispatch(addEventTicket(response.data.payLoad));
      }
    } catch (err) {
      let response = parseExpoError(err);
      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTable = async (tableValues) => {
    try {
      setIsLoading(true);
      let response = await getAxiosClient().post(CreateTable, {
        tableNumber: tableValues.tableNumber,
        price: tableValues.price,
        description: tableValues.description,
        eventId: eventId,
      });

      console.log(response);
      if (response.data.status == "Success") {
        setModalVisible(false);
        dispatch(addEventTable(response.data.payLoad));
      }
    } catch (err) {
      let response = parseExpoError(err);
      showAlert(response.message);
    } finally {
      setIsLoading(false);
    }
  };

  function renderFlatList(isTicket) {
    return (
      <FlatList
        style={styles.flatList}
        data={isTicket == true ? eventTickets : eventTables}
        renderItem={(item, index) => {
          return renderItems(item, isTicket);
        }}
        keyExtractor={(item, index) => {
          return item.id + index;
        }}
        ListEmptyComponent={<EmptyDataView />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={"white"}
          />
        }
      />
    );
  }

  function renderItems(item, isTicket) {
    return (
      <View>
        <ExpandCollapse
          key={item?.item?.id ?? 0}
          title={isTicket ? item?.item?.name : item?.item?.tableNumber}
          priceDuration={`Dh ${item?.item?.price}`}
          features={item?.item?.description}
          onSelect={() => {}}
          isExpanded={true}
          currentUser={currentUser}
          onEditPressed={() => {
            navigation.navigate("CreateTicketAndTableScreen", {
              event: selectedEvent,
              isTicket: selectedIndex == 0,
              eventItem: item.item,
              isUpdate: true,
            });
          }}
          onSharePressed={() => {
            setShareTicketModal({
              isVisible: true,
              ticketOrTableId: item?.item?.id,
              isTypeTicket: isTicket,
            });
          }}
        />
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <View style={styles.listBullet}></View>
          <View style={styles.listBullet}></View>
          <View style={styles.listBullet}></View>
        </View>
      </View>
    );
  }

  return (
    <>
      <RootView loading={loading}>
        <DetailHeaderView
          // title={"Add Starting Ticket\nand Table Pricing"}
          title=""
          onAddPressed={addHandler}
        />
        <View style={styles.container}>
          <SegmentedControlTab
            style={{ height: 50 }}
            values={["Ticket", "Tables"]}
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
          />

          {renderFlatList(selectedIndex == 0)}
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={shareTicketModal?.isVisible}
          onRequestClose={() => {
            setShareTicketModal({ isVisible: false });
          }}
        >
          <InvitePopup
            heading="Guest Information"
            closePressed={() => {
              setShareTicketModal({ isVisible: false });
            }}
            isDisplayAsText={true}
            eventName={selectedEvent.eventName ?? ""}
            eventId={selectedEvent.id ?? ""}
            organizerId={currentUser?.id}
            organizerName={currentUser?.fullName}
            ticketOrTableId={shareTicketModal?.ticketOrTableId}
            isTypeTicket={selectedIndex === 0}
          ></InvitePopup>
        </Modal>

        <MessagePopup
          visible={isMessagePopupVisible}
          onClose={() => {
            if (navigation?.canGoBack()) {
              navigation.goBack();
            }
            hideMessagePopup();
          }}
          title={data?.title}
          description={data?.description}
          isTypeError={data?.isTypeError}
        />
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "1%",
  },
  buttons: {
    margin: 16,
    paddingHorizontal: 4,
  },
  largeText: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  listBullet: {
    backgroundColor: GlobalConsts.Colors.primaryGreen,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 5,
  },
  flatList: {
    marginBottom: "10%",
  },
});

export default TicketAndTableScreen;
