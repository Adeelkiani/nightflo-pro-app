import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalStyles } from "../../consts/GlobalConsts";
import { removePromoter, setPromoters } from "../../redux/PromotersReducer";
import { AntDesign } from "@expo/vector-icons";
import PromotersSvg from "../../svgs/PromotersSvg";
import { parseExpoError } from "../../utils/AxiosErrorParser";
import { getAxiosClient } from "../apis/TallyApi";
import LatoText from "../auth/LatoText";
import Loading from "../components/Loading";
import RootView from "../components/RootView";
import PromotersListItem from "./promoters/PromotersListItem";
import { showAlert, showConfirmationDialog } from "../../utils/Alert";
import { SelectList } from "react-native-dropdown-select-list/index";
import { MANAGE_ROLES } from "../role/ConstRoles";
import ButtonWithIcon from "../components/ButtonWithIcon";

function RenderStaff({
  staff,
  isRefreshing,
  onRefresh,
  onPromoterDeleted,
  userType,
  userRole,
}) {
  async function removeStaffFromCommunity(requestId) {
    return await getAxiosClient().delete("staff/removeStaffFromCommunity", {
      data: {
        communityId: requestId,
        userType: userType,
      },
    });
  }

  function deleteFromCommunity(item) {
    showConfirmationDialog({
      description: `Are you sure you want to remove this ${userRole} from your community?`,
      title: "Remove from Community",
      onContinuePressed: async () => {
        onPromoterDeleted(null, true);

        await removeStaffFromCommunity(item.requestId, userType)
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
        <FlatList
          style={styles.promotorsList}
          data={staff}
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

const StaffScreen = ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [counter, setCounter] = useState(1);
  const [selectedRole, setSelectedRole] = useState("Bartender");
  const [staffList, setStaffList] = useState([]);

  const data = [
    { key: "1", value: "Bartender" },
    { key: "5", value: "Security" },
  ];

  function getUserType() {
    return MANAGE_ROLES[selectedRole === "1" ? "Bartender" : selectedRole];
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log("Team Screen use Effect has kicked in ");
      async function getStaff() {
        try {
          setIsLoading(true);
          let response = await getAxiosClient().get(
            "staff/getAcceptedStaffByRole",
            {
              params: {
                userType: getUserType(),
              },
            }
          );

          setStaffList(response.data.payLoad);
        } catch (err) {
          let response = parseExpoError(err);

          showAlert(response.message);
        } finally {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }

      getStaff();

      return function cleanup() {
        console.log("Cleanup job execution has started");
      };
    }, [counter, selectedRole])
  );

  function onRefreshCall() {
    setIsRefreshing(true);
    setCounter(counter + 1);
  }

  function renderStaffSelectionList() {
    return (
      <SelectList
        setSelected={(data) => {
          setSelectedRole(data);
        }}
        data={data}
        save="value"
        defaultOption={{ key: "1", value: "Bartender" }}
        fontFamily="Lato_400Regular"
        dropdownTextStyles={GlobalStyles.dropDownTextStyle}
        boxStyles={GlobalStyles.boxStyle}
        dropdownStyles={GlobalStyles.dropDownBoxStyle}
        inputStyles={{
          color: "white",
          fontSize: 14,
          marginLeft: 2,
          padding: 4,
        }}
        searchicon={<AntDesign name="search1" size={20} color="white" />}
        arrowicon={<AntDesign name="down" size={15} color="white" />}
        closeicon={<AntDesign name="close" size={20} color="white" />}
        upicon={<AntDesign name="up" size={24} color="white" />}
        placeholder={"Choose a staff role"}
        search={false}
      />
    );
  }

  function removeStaffFromList(payload) {
    let newArray = staffList.filter((item) => {
      return item.organizer.id != payload.organizer.id;
    });
    setStaffList(newArray);
  }

  return (
    <>
      <RootView>
        <View style={styles.mainContainer}>
          <View style={GlobalStyles.screenTitleContainer}>
            <LatoText style={[GlobalStyles.screenTitle, { color: "white" }]}>
              {"Team"}
            </LatoText>
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            {renderStaffSelectionList()}
          </View>
          {staffList.length == 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <LatoText style={styles.text}>{`No ${
                selectedRole === "1" ? "Bartender" : selectedRole
              } found`}</LatoText>
            </View>
          ) : (
            <RenderStaff
              staff={staffList}
              isRefreshing={isRefreshing}
              onRefresh={onRefreshCall}
              onPromoterDeleted={(payload, isLoading) => {
                setIsLoading(isLoading);
                if (payload) {
                  removeStaffFromList(payload);
                }
              }}
              userType={getUserType()}
              userRole={selectedRole === "1" ? "Bartender" : selectedRole}
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
    marginTop: 20,
    marginBottom: 10,
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
  promotorsContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  promotorsList: {
    flex: 1,
    width: "100%",
    marginTop: 15,
  },
});

export default StaffScreen;
