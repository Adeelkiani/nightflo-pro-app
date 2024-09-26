import { useEffect, useState } from "react";
import { View, StyleSheet, SectionList } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import LatoText from "../../auth/LatoText";
import RootView from "../../components/RootView";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { getAxiosClient } from "../../apis/TallyApi";
import ManageOrgInCommunityListItem from "../manageorganizers/list/ManageOrgInCommunityListItem";
import {
  addDoorTeamInEvent,
  addDoorTeamToArchive,
  clearDoorTeamInEvent,
  removeDoorTeamFromArchive,
  removeSpecificFromEventSuggestionDoorTeam,
  setArchivedDoorTeamInEventSuggestions,
  setDoorTeamInEvent,
  setDoorTeaminEventSuggestions,
} from "../../../redux/DoorTeamInEventReducer";
import { useNavigation } from "@react-navigation/native";
import { showAlert } from "../../../utils/Alert";
import { SelectList } from "react-native-dropdown-select-list/index";
import { MANAGE_ROLES } from "../../role/ConstRoles";
import DetailHeaderView from "../../components/DetailHeaderView";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import GrayBoxIconButton from "../../components/GrayBoxIconButton";
import { SvgIcons } from "../../../svgs";
const ManageStaffScreen = ({ route }) => {
  const [selectedRole, setSelectedRole] = useState("Bartender");
  const dispatch = useDispatch();

  const [loading, setIsLoading] = useState(false);
  let selectedEvent = route.params.selectedEvent;

  const doorteam = useSelector((state) => {
    return state.doorTeamInEvent.suggestions;
  });

  const archivedStaff = useSelector((state) => {
    return state.doorTeamInEvent.archivedSuggestions;
  });

  const doorTeamInEvent = useSelector((state) => {
    var data = state.doorTeamInEvent.doorteam;
    data = data.filter((item) => {
      return item.requestStatus !== "PENDING";
    });
    return data;
  });

  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const data = [
    { key: "1", value: "Bartender" },
    { key: "2", value: "Security" },
  ];

  useEffect(() => {
    async function getOrganizers() {
      setIsLoading(true);
      try {
        const staffRole =
          MANAGE_ROLES[selectedRole === "1" ? "Bartender" : selectedRole];

        let alreadyInListResponse = await getAxiosClient().get(
          `eventsorganizers/staffByEventId/${selectedEvent.id}/${staffRole}`
        );
        alreadyInListResponse = alreadyInListResponse.data.payLoad;
        let team = alreadyInListResponse.team.map((item) => {
          item.isActivation = true;
          return item;
        });

        let suggestions = alreadyInListResponse.suggestions.map((item) => {
          item.isActivation = false;
          return item;
        });

        let archivedSuggestions =
          alreadyInListResponse.archivedSuggestions?.map((item) => {
            item.isActivation = false;
            return item;
          });

        dispatch(setDoorTeaminEventSuggestions(suggestions));
        dispatch(setDoorTeamInEvent(team));
        dispatch(setArchivedDoorTeamInEventSuggestions(archivedSuggestions));
      } catch (err) {
        console.error(err);
        let errors = parseExpoError(err);
        showAlert(errors.message);
      } finally {
        setIsLoading(false);
      }
    }

    getOrganizers();

    return () => {
      console.log("Clean up of manage organizers");

      dispatch(clearDoorTeamInEvent());
    };
  }, [selectedRole]);

  async function onActiveMember(activation, user) {
    let postObject = {
      eventId: selectedEvent.id,
      staffId: user.organizer.id,
    };

    try {
      setIsLoading(true);
      if (activation) {
        let response = await getAxiosClient().post(
          `staffActivation`,
          postObject
        );
      } else {
        let response = await getAxiosClient().delete(`staffActivation`, {
          data: {
            eventId: selectedEvent.id,
            staffId: user.organizer.id,
          },
        });
      }
    } catch (err) {
      let expoErr = parseExpoError(err);
      showAlert(expoErr.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onAddPressed(user) {
    setIsLoading(true);
    // eventsorganizers/doorteam

    try {
      let postObject = {
        eventId: selectedEvent.id,
        staffId: user.organizer.id,
        userType: user.userType,
      };
      console.log("On Add Pressed ", postObject, user);
      let response = await getAxiosClient().post(
        `staff/addStaffById`,
        postObject
      );

      let eventToAdd = response.data.payLoad;
      // eventToAdd = ;
      dispatch(addDoorTeamInEvent({ ...eventToAdd, isActivation: true }));
      dispatch(removeSpecificFromEventSuggestionDoorTeam(eventToAdd.member));
    } catch (err) {
      let errors = parseExpoError(err);
      showAlert(errors.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateArchive(movedToArchive, memberId) {
    try {
      const response = await getAxiosClient().post("community/archive", {
        moveToArchive: movedToArchive,
        memberId: memberId,
      });

      if (response) {
      }
    } catch (err) {
      let errors = parseExpoError(err);
      showAlert(errors.message);
    } finally {
      setIsLoading(false);
    }
  }
  function onArchivePressed(memberId, movedToArchive) {
    if (movedToArchive) {
      dispatch(addDoorTeamToArchive({ memberId, movedToArchive }));
    } else {
      dispatch(removeDoorTeamFromArchive({ memberId, movedToArchive }));
    }
    updateArchive(movedToArchive, memberId);
  }

  return (
    <>
      <RootView loading={loading}>
        <View style={{ flex: 1 }}>
          <DetailHeaderView
            title={""}
            onInviteMorePressed={() => {
              navigation.navigate("InviteStaffScreen", {
                selectedEvent: selectedEvent,
              });
            }}
          />

          <View style={GlobalStyles.screenTitleContainer}>
            <LatoText style={GlobalStyles.screenTitle}>
              {"Manage Team"}
            </LatoText>
          </View>

          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
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
          </View>
          <SectionList
            sections={[
              {
                title: "Added in this event",
                data: doorTeamInEvent,
                // data: [],
              },
              {
                title: "Quickly Add to event",
                data: doorteam,
              },
              {
                title: "Archived Team",
                data: archivedStaff,
              },
            ]}
            renderItem={({ item }) => {
              return (
                <ManageOrgInCommunityListItem
                  userItem={item}
                  isActivation={item.isActivation}
                  onAddPressed={onAddPressed}
                  onActivationTogge={onActiveMember}
                  isArchived={item.movedToArchive}
                  onArchivePressed={(movedToArchive) => {
                    onArchivePressed(item.organizer.id, movedToArchive);
                  }}
                ></ManageOrgInCommunityListItem>
              );
            }}
            renderSectionHeader={({ section }) =>
              renderSectionHeader(section.title)
            }
            stickySectionHeadersEnabled={false}
            keyExtractor={(item) => {
              return item.isActivation ? item.id : item.requestId;
            }}
            style={styles.listContainer}
          ></SectionList>
        </View>
      </RootView>
    </>
  );
};

function renderSectionHeader(title) {
  return (
    <>
      <View>
        <LatoText style={styles.sectionHeader}>{title}</LatoText>
      </View>
    </>
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
  listContainer: {
    width: "100%",
    flex: 1,
  },
  sectionHeader: {
    color: "#FFFFFF33",
    fontSize: 15,
    marginLeft: 15,
    marginTop: 20,
  },
});

export default ManageStaffScreen;
