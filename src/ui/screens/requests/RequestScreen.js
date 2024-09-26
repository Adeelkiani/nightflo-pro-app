import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, SectionList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { getAxiosClient } from "../../apis/TallyApi";
import LatoText from "../../auth/LatoText";
import RootView from "../../components/RootView";
import RequestMenuSvg from "../../../svgs/RequestMenuSvg";
import RequestListItem from "./RequestListItem";
import { setRequests } from "../../../redux/RequestsReducer";
import { showAlert } from "../../../utils/Alert";

function RenderRequests({
  eventRequests,
  communityRequests,
  acceptRequest,
  rejectRequest,
}) {
  return (
    <>
      <View style={styles.noEvent}>
        <SectionList
          style={{ flex: 1, width: "100%" }}
          sections={[
            { title: "Event Invitations", data: eventRequests },
            {
              title: "Community Invitations",
              data: communityRequests,
            },
          ]}
          renderItem={({ item }) => (
            <RequestListItem
              item={item}
              acceptRequest={acceptRequest}
              rejectRequest={rejectRequest}
            ></RequestListItem>
          )}
          renderSectionHeader={({ section }) => {
            return (
              <>
                <LatoText style={styles.sectionHeader}>
                  {section.title}
                </LatoText>
              </>
            );
          }}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item) => {
            return item.requestId;
          }}
        ></SectionList>
      </View>
    </>
  );
}

function NoEvents() {
  return (
    <View style={styles.container}>
      <View style={styles.noEvent}>
        <RequestMenuSvg
          color={GlobalConsts.Colors.flamingoTextColor}
          width={"25%"}
          height={"20%"}
        ></RequestMenuSvg>
        <LatoText style={GlobalStyles.heading}>No Requests</LatoText>
        {/* <LatoText style={styles.text}>
          No event created yet, tap on + to create an event
        </LatoText> */}
      </View>
    </View>
  );
}

const RequestScreen = ({ navigation, route }) => {
  const [loading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const [requests, setRequests] = useState({
  //   eventRequests: [],
  //   communityRequests: [],
  // });

  const { requestCount, eventRequests, communityRequests } = useSelector(
    (state) => {
      return state.requests;
    }
  );

  useFocusEffect(
    React.useCallback(() => {
      async function performApiCall() {
        try {
          setIsLoading(true);
          let response = await getAxiosClient().get("requests");
          dispatch(
            setRequests({
              communityRequests: response.data.payLoad.communityRequests,
              eventRequests: response.data.payLoad.eventRequests,
              requestCount: response.data.payLoad.requestCount,
            })
          );
        } catch (err) {
          let response = parseExpoError(err);

          showAlert(response.message);
        } finally {
          setIsLoading(false);
        }
      }

      performApiCall();

      return function cleanup() {
        console.log("Cleanup job execution has started");
      };
    }, [])
  );

  const acceptRequestApi = async (path) => {
    try {
      setIsLoading(true);
      let response = await getAxiosClient().post(path, {});
      dispatch(
        setRequests({
          communityRequests: response.data.payLoad.communityRequests,
          eventRequests: response.data.payLoad.eventRequests,
          requestCount: response.data.payLoad.requestCount,
        })
      );
    } catch (err) {
      let error = parseExpoError(err);
      showAlert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const rejectRequestApi = async (path) => {
    try {
      setIsLoading(true);
      let response = await getAxiosClient().delete(path);
      dispatch(
        setRequests({
          communityRequests: response.data.payLoad.communityRequests,
          eventRequests: response.data.payLoad.eventRequests,
          requestCount: response.data.payLoad.requestCount,
        })
      );
    } catch (err) {
      let error = parseExpoError(err);
      showAlert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  function acceptRequest(request) {
    const isEventRequest = request.event != undefined;
    let path = isEventRequest
      ? `community/eventOrganizer/${request.requestId}`
      : `community/${request.requestId}`;
    acceptRequestApi(path);
  }

  function rejectRequest(request) {
    const isEventRequest = request.event != undefined;
    let path = isEventRequest
      ? `community/eventOrganizer/${request.requestId}`
      : `community/${request.requestId}`;
    rejectRequestApi(path);
  }

  return (
    <>
      <RootView loading={loading}>
        <View style={styles.container}>
          {eventRequests.length == 0 && communityRequests.length == 0 ? (
            <NoEvents></NoEvents>
          ) : (
            <RenderRequests
              acceptRequest={acceptRequest}
              rejectRequest={rejectRequest}
              eventRequests={eventRequests}
              communityRequests={communityRequests}
            ></RenderRequests>
          )}
        </View>
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { height: Dimensions.get("window").height * 0.86 },
  noEvent: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeader: {
    color: "#FFFFFF33",
    fontSize: 18,
    marginLeft: 20,
    marginTop: 20,
  },
});

export default RequestScreen;
