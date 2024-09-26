import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";
import { RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalStyles } from "../../consts/GlobalConsts";
import { removePromoter, setPromoters } from "../../redux/PromotersReducer";

import PromotersSvg from "../../svgs/PromotersSvg";
import { parseExpoError } from "../../utils/AxiosErrorParser";
import { getAxiosClient } from "../apis/TallyApi";
import LatoText from "../auth/LatoText";
import BackgroundLinearGradient from "../components/BackgroundLinearGradient";
import ButtonWithIcon from "../components/ButtonWithIcon";
import Loading from "../components/Loading";
import RootView from "../components/RootView";
import { INVITE_TYPE } from "./invite/EnumInviteType";
import PromotersListItem from "./promoters/PromotersListItem";
import { showAlert, showConfirmationDialog } from "../../utils/Alert";
import { AssetImages } from "../../../assets";

function RenderPromoters({
  promotors,
  isRefreshing,
  onRefresh,
  onPromoterDeleted,
}) {
  const navigation = useNavigation();

  async function removePromoterFromCommunity(requestId) {
    return await getAxiosClient().delete("promoter/removeFromCommunity", {
      data: {
        communityId: requestId,
      },
    });
  }

  function deleteFromCommunity(item) {
    showConfirmationDialog({
      description:
        "Are you sure you want to remove this promoter from your community?",
      title: "Remove from Community",
      onContinuePressed: async () => {
        onPromoterDeleted(null, true);

        await removePromoterFromCommunity(item.requestId)
          .then((response) => {
            let payload = response.data.payLoad;
            onPromoterDeleted(payload, false);
          })
          .catch((error) => {
            let response = parseExpoError(error);
            showAlert(response.message);
          })
          .finally(() => {
            onPromoterDeleted(null, false);
          });
      },
    });
  }

  function renderInviteItem(item) {
    return (
      <PromotersListItem
        userItem={item.item}
        isDoorTeam={false}
        showRemove={true}
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
            {"Promoters"}
          </LatoText>
        </View>
        <ButtonWithIcon
          minWidth={"80%"}
          onPress={() => {
            navigation.navigate("InviteTeam", { type: INVITE_TYPE.PROMOTOR });
          }}
        >
          Invite More
        </ButtonWithIcon>
        <FlatList
          style={styles.promotorsList}
          data={promotors}
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

function NoPromoters() {
  const navigation = useNavigation();
  function invitePromoters() {
    navigation.navigate("InviteTeam", { type: INVITE_TYPE.PROMOTOR });
  }
  return (
    <View style={styles.noEvent}>
      <Image
        source={AssetImages.promoter}
        style={GlobalStyles.screenPlaceHolderImage}
      />
      <LatoText style={GlobalStyles.heading}>No Promoters</LatoText>
      <LatoText style={GlobalStyles.screenDescription}>
        No promoters in the list, tap on invite, to invite the promoters.
      </LatoText>
      <ButtonWithIcon onPress={invitePromoters} minWidth={"80%"} marginTop={25}>
        Invite Promoters
      </ButtonWithIcon>
    </View>
  );
}

const PromotersScreen = ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const promotors = useSelector((state) => {
    return state.promotors.promotors;
  });

  useFocusEffect(
    React.useCallback(() => {
      console.log("Promoters Screen use Effect has kicked in ");
      async function getPromoters() {
        try {
          setIsLoading(true);

          let response = await getAxiosClient().get("promoter/accepted");

          dispatch(setPromoters(response.data.payLoad));
        } catch (err) {
          let response = parseExpoError(err);

          showAlert(response.message);
        } finally {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }

      getPromoters();

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
          {promotors.length == 0 ? (
            <NoPromoters />
          ) : (
            <RenderPromoters
              promotors={promotors}
              isRefreshing={isRefreshing}
              onRefresh={onRefreshCall}
              onPromoterDeleted={(payload, isLoading) => {
                setIsLoading(isLoading);
                if (payload) {
                  dispatch(removePromoter(payload));
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.87,
  },
  noEvent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default PromotersScreen;
