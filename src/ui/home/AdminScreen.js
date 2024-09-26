import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import ButtonWithIcon from "../components/ButtonWithIcon";
import { INVITE_TYPE } from "./invite/EnumInviteType";
import PromotersListItem from "./promoters/PromotersListItem";

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
import { removeAdminFromCommunity, setAdmin } from "../../redux/AdminReducer";

function RenderAdmin({ adminList, isRefreshing, onRefresh, onAdminDeleted }) {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => {
    return state.mUser;
  });
  async function removeAdminFromCommunity(requestId) {
    return await getAxiosClient().delete("admin/removeFromCommunity", {
      data: {
        communityId: requestId,
      },
    });
  }

  function deleteFromCommunity(item) {
    showConfirmationDialog({
      description:
        "Are you sure you want to remove this admin from your community?",
      title: "Remove from Community",
      onContinuePressed: async () => {
        onAdminDeleted(null, true);

        await removeAdminFromCommunity(item.requestId)
          .then((response) => {
            let payload = response.data.payLoad;
            onAdminDeleted(payload, false);
          })
          .catch((error) => {
            let response = parseExpoError(error);
            showAlert(response.message);
          })
          .finally(() => {
            onAdminDeleted(null, false);
          });
      },
    });
  }

  function renderInviteItem(item) {
    return (
      <PromotersListItem
        userItem={item.item}
        isAdminScreen={true}
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
            {"Admin"}
          </LatoText>
        </View>
        <ButtonWithIcon
          minWidth={"80%"}
          onPress={() => {
            navigation.navigate("InviteTeam", { type: INVITE_TYPE.ADMIN });
          }}
        >
          Invite More
        </ButtonWithIcon>
        <FlatList
          style={styles.promotorsList}
          data={adminList}
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

const AdminScreenScreen = ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const adminList = useSelector((state) => {
    return state.admin.admin;
  });

  useFocusEffect(
    React.useCallback(() => {
      console.log("Admin Screen use Effect has kicked in ");
      async function getAdminScreen() {
        try {
          setIsLoading(true);

          let response = await getAxiosClient().get("admin/accepted");

          dispatch(setAdmin(response.data.payLoad));
        } catch (err) {
          let response = parseExpoError(err);

          showAlert(response.message);
        } finally {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }

      getAdminScreen();

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
          {adminList.length == 0 ? (
            <NoAdminScreen />
          ) : (
            <RenderAdmin
              isRefreshing={isRefreshing}
              onRefresh={onRefreshCall}
              adminList={adminList}
              onAdminDeleted={(payload, isLoading) => {
                setIsLoading(isLoading);
                if (payload) {
                  dispatch(removeAdminFromCommunity(payload));
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

function NoAdminScreen() {
  const navigation = useNavigation();
  function inviteAdminScreen() {
    navigation.navigate("InviteTeam", { type: INVITE_TYPE.ADMIN });
  }
  return (
    <View style={styles.noEvent}>
      <Image
        source={AssetImages.promoter}
        style={GlobalStyles.screenPlaceHolderImage}
      />
      <LatoText style={GlobalStyles.heading}>No Admin</LatoText>
      <LatoText style={GlobalStyles.screenDescription}>
        No admin in the list, tap on invite, to invite the admin
      </LatoText>
      <ButtonWithIcon
        onPress={inviteAdminScreen}
        minWidth={"80%"}
        marginTop={25}
      >
        Invite Admin
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

export default AdminScreenScreen;
