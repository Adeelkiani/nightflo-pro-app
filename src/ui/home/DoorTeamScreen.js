import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import ButtonWithIcon from "../components/ButtonWithIcon";
import { INVITE_TYPE } from "./invite/EnumInviteType";
import PromotersListItem from "./promoters/PromotersListItem";
import {
  removeDoorTeamFromCommunity,
  setDoorTeam,
} from "../../redux/DoorTeamReducer";
import { parseExpoError } from "../../utils/AxiosErrorParser";
import { getAxiosClient } from "../apis/TallyApi";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RootView from "../components/RootView";
import LatoText from "../auth/LatoText";
import { RefreshControl } from "react-native";
import { showAlert, showConfirmationDialog } from "../../utils/Alert";
import Loading from "../components/Loading";
import { AssetImages } from "../../../assets";
import { Image } from "react-native";

function RenderDoorTeam({
  doorteamList,
  isRefreshing,
  onRefresh,
  onDoorteamDeleted,
}) {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => {
    return state.mUser;
  });
  async function removeDoorTeamFromCommunity(requestId) {
    return await getAxiosClient().delete("doorteam/removeFromCommunity", {
      data: {
        communityId: requestId,
      },
    });
  }

  function deleteFromCommunity(item) {
    showConfirmationDialog({
      description:
        "Are you sure you want to remove this door team from your community?",
      title: "Remove from Community",
      onContinuePressed: async () => {
        onDoorteamDeleted(null, true);

        await removeDoorTeamFromCommunity(item.requestId)
          .then((response) => {
            let payload = response.data.payLoad;
            onDoorteamDeleted(payload, false);
          })
          .catch((error) => {
            let response = parseExpoError(error);
            showAlert(response.message);
          })
          .finally(() => {
            onDoorteamDeleted(null, false);
          });
      },
    });
  }

  function renderInviteItem(item) {
    return (
      <PromotersListItem
        userItem={item.item}
        isDoorTeam={true}
        showRemove={currentUser?.isClubOwner}
        onDeletePressed={() => {
          deleteFromCommunity(item.item);
        }}
      />
    );
  }

  return (
    <>
      <View style={styles.promotorsContainer}>
        <View style={GlobalStyles.screenTitleContainer}>
          <LatoText style={[GlobalStyles.screenTitle, { color: "white" }]}>
            {"Door Team"}
          </LatoText>
        </View>
        <ButtonWithIcon
          minWidth={"80%"}
          onPress={() => {
            navigation.navigate("InviteTeam", { type: INVITE_TYPE.DOOR_TEAM });
          }}
        >
          Invite More
        </ButtonWithIcon>
        <FlatList
          style={styles.promotorsList}
          data={doorteamList}
          renderItem={renderInviteItem}
          keyExtractor={(item) => {
            return item.requestId;
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={"white"}
            />
          }
        ></FlatList>
      </View>
    </>
  );
}

const DoorTeamScreen = ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const doorteamList = useSelector((state) => {
    return state.doorteam.doorteam;
  });

  useFocusEffect(
    React.useCallback(() => {
      console.log("Door Team Screen use Effect has kicked in ");
      async function getDoorTeam() {
        try {
          setIsLoading(true);

          let response = await getAxiosClient().get("doorteam/accepted");

          dispatch(setDoorTeam(response.data.payLoad));
        } catch (err) {
          let response = parseExpoError(err);

          showAlert(response.message);
        } finally {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }

      getDoorTeam();

      return function cleanup() {
        console.log("Cleanup job execution has started");
      };
    }, [counter])
  );

  function onRefreshCall() {
    setIsRefreshing(true);
    setCounter(counter + 1);
  }

  return (
    <>
      <RootView>
        <View style={styles.mainContainer}>
          {doorteamList.length == 0 ? (
            <NoDoorTeam />
          ) : (
            <RenderDoorTeam
              isRefreshing={isRefreshing}
              onRefresh={onRefreshCall}
              doorteamList={doorteamList}
              onDoorteamDeleted={(payload, isLoading) => {
                setIsLoading(isLoading);
                if (payload) {
                  dispatch(removeDoorTeamFromCommunity(payload));
                }
              }}
            />
          )}
        </View>
        <Loading isLoading={loading} />
      </RootView>
    </>
  );
};

function NoDoorTeam() {
  const navigation = useNavigation();
  function inviteDoorTeam() {
    navigation.navigate("InviteTeam", { type: INVITE_TYPE.DOOR_TEAM });
  }
  return (
    <View style={styles.noEvent}>
      <Image
        source={AssetImages.promoter}
        style={GlobalStyles.screenPlaceHolderImage}
      />
      <LatoText style={GlobalStyles.heading}>No Door Team</LatoText>
      <LatoText style={GlobalStyles.screenDescription}>
        No door team in the list, tap on invite, to invite the door team
      </LatoText>
      <ButtonWithIcon onPress={inviteDoorTeam} minWidth={"80%"} marginTop={25}>
        Invite Door Team
      </ButtonWithIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noEvent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
  },
  fab: {
    width: 75,
    height: 75,
    marginBottom: "20%",
    borderRadius: 37,
    backgroundColor: "#00F0C5",
    alignSelf: "flex-end",
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: "white",
    fontSize: 40,
  },
  mainContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.87,
  },
  promotorsContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    flex: 1,
  },
  promotorsList: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: GlobalConsts.Colors.primaryGrayBackground,
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 15,
    marginTop: 5,
  },
});

export default DoorTeamScreen;
