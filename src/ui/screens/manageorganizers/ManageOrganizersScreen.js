import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SectionList,
  Modal,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import LatoText from "../../auth/LatoText";
import RootView from "../../components/RootView";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { getAxiosClient } from "../../apis/TallyApi";
import ManageOrgInCommunityListItem from "./list/ManageOrgInCommunityListItem";
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
import {
  addPromotersInEvent,
  addPromoterToArchive,
  clearPromotersInEvent,
  removePromoterFromArchive,
  removeSpecificFromEventPromoter,
  setArchivedPromoterInEventSuggestions,
  setPromoterInEventSuggestions,
  setPromotersInEvent,
} from "../../../redux/PromotersInEventReducer";
import { INVITE_TYPE } from "../../home/invite/EnumInviteType";
import { useNavigation } from "@react-navigation/native";
import { showAlert, showSuccessAlert } from "../../../utils/Alert";
import { AddTempPromoter } from "../../../consts/DisplayConsts";
import { AddTempPromoterAPI } from "../../apis/EndPoints";
import { fetchImageFromUri } from "../userinfo/UserInfoScreen";
import DetailHeaderView from "../../components/DetailHeaderView";
import SearchView from "../../components/SearchView";
import { USER_ROLES } from "../../../consts/EnumsConts";
import {
  addAdminInEvent,
  addAdminToArchive,
  clearAdminInEvent,
  removeAdminFromArchive,
  removeSpecificFromEventSuggestionAdmin,
  setAdminInEvent,
  setAdminInEventSuggestions,
  setArchivedAdminInEventSuggestions,
} from "../../../redux/AdminInEventReducer";

const ManageOrganizersScreen = ({ route }) => {
  let userType;
  const dispatch = useDispatch();

  const [loading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  let selectedEvent = route.params.selectedEvent;
  userType = route.params.userType;

  const admin = useSelector((state) => {
    return state.adminInEvent.suggestions;
  });

  const archivedAdmin = useSelector((state) => {
    return state.adminInEvent.archivedSuggestions;
  });

  const adminInEvent = useSelector((state) => {
    return state.adminInEvent.admin;
  });

  const doorteam = useSelector((state) => {
    return state.doorTeamInEvent.suggestions;
  });

  const archivedDoorTeam = useSelector((state) => {
    return state.doorTeamInEvent.archivedSuggestions;
  });

  const doorTeamInEvent = useSelector((state) => {
    return state.doorTeamInEvent.doorteam;
  });

  const promotors = useSelector((state) => {
    return state.promotorsInEvent.suggestions;
  });

  const archivedPromoters = useSelector((state) => {
    return state.promotorsInEvent.archivedSuggestions;
  });

  const promotorsInEvent = useSelector((state) => {
    return state.promotorsInEvent.promotors;
  });

  const [filteredListings, setFilteredListings] = useState({
    admin: admin,
    archivedAdmin: archivedAdmin,
    adminInEvent: adminInEvent,
    doorteam: doorteam,
    archivedDoorTeam: archivedDoorTeam,
    doorTeamInEvent: doorTeamInEvent,
    promoters: promotors,
    archivedPromoters: archivedPromoters,
    promotersInEvent: promotorsInEvent,
  });

  const navigation = useNavigation();

  function getAPIType() {
    switch (userType) {
      case USER_ROLES.ADMIN:
        return "admin";
      case USER_ROLES.DOOR_TEAM:
        return "doorteam";
      case USER_ROLES.PROMOTOR:
        return "promoter";
    }
  }

  useEffect(() => {
    async function getOrganizers() {
      setIsLoading(true);
      try {
        let alreadyInListResponse = await getAxiosClient().get(
          `eventsorganizers/allByEventId/${selectedEvent.id}/${getAPIType()}`
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

        switch (userType) {
          case USER_ROLES.ADMIN:
            dispatch(setAdminInEventSuggestions(suggestions));
            dispatch(setAdminInEvent(team));
            dispatch(setArchivedAdminInEventSuggestions(archivedSuggestions));
            setFilteredListings({
              ...filteredListings,
              admin: suggestions,
              adminInEvent: team,
              archivedAdmin: archivedSuggestions,
            });
            break;

          case USER_ROLES.DOOR_TEAM:
            dispatch(setDoorTeaminEventSuggestions(suggestions));
            dispatch(setDoorTeamInEvent(team));
            dispatch(
              setArchivedDoorTeamInEventSuggestions(archivedSuggestions)
            );
            setFilteredListings({
              ...filteredListings,
              doorteam: suggestions,
              doorTeamInEvent: team,
              archivedDoorTeam: archivedSuggestions,
            });
            break;
          case USER_ROLES.PROMOTOR:
            dispatch(setPromoterInEventSuggestions(suggestions));
            dispatch(
              setArchivedPromoterInEventSuggestions(archivedSuggestions)
            );
            dispatch(setPromotersInEvent(team));
            setFilteredListings({
              ...filteredListings,
              promoters: suggestions,
              promotersInEvent: team,
              archivedPromoters: archivedSuggestions,
            });

            break;
        }
      } catch (err) {
        let errors = parseExpoError(err);
        showAlert(errors.message);
      } finally {
        setIsLoading(false);
      }
    }

    getOrganizers();

    return () => {
      console.log("Clean up of manage organizers");

      switch (userType) {
        case USER_ROLES.ADMIN:
          dispatch(clearAdminInEvent());
          break;
        case USER_ROLES.DOOR_TEAM:
          dispatch(clearDoorTeamInEvent());
          break;

        case USER_ROLES.PROMOTOR:
          dispatch(clearPromotersInEvent());
          break;
      }
    };
  }, [counter]);

  useEffect(() => {
    setFilteredListings({
      ...filteredListings,
      admin: admin,
      adminInEvent,
      archviedAdmins: archivedAdmin,
      doorTeamInEvent,
      promotersInEvent: promotorsInEvent,
      doorteam: doorteam,
      archivedDoorTeam: archivedDoorTeam,
      promoters: promotors,
      archivedPromoters: archivedPromoters,
    });
  }, [
    archivedDoorTeam,
    archivedPromoters,
    archivedAdmin,
    admin,
    promotors,
    doorteam,
  ]);

  function updateInputValueHandler(inputType, enteredValue) {
    setSearchText(enteredValue);

    async function filterOrganizers(value) {
      switch (userType) {
        case USER_ROLES.ADMIN:
          let _admin = doorteam.filter((item) => {
            return item.organizer.fullName
              .toLowerCase()
              .includes(value.toLowerCase());
          });
          let _archivedAdmin = archivedAdmin.filter((item) => {
            return item.organizer.fullName
              .toLowerCase()
              .includes(value.toLowerCase());
          });
          let _adminInEvent = adminInEvent.filter((item) => {
            return item.organizer.fullName
              .toLowerCase()
              .includes(value.toLowerCase());
          });
          setFilteredListings({
            ...filteredListings,
            admin: _admin,
            adminInEvent: _adminInEvent,
            archivedAdmin: _archivedAdmin,
          });
          break;

        case USER_ROLES.DOOR_TEAM:
          let _doorteam = doorteam.filter((item) => {
            return item.organizer.fullName
              .toLowerCase()
              .includes(value.toLowerCase());
          });
          let _archivedDoorteam = archivedDoorTeam.filter((item) => {
            return item.organizer.fullName
              .toLowerCase()
              .includes(value.toLowerCase());
          });
          let _doorteamInEvent = doorTeamInEvent.filter((item) => {
            return item.organizer.fullName
              .toLowerCase()
              .includes(value.toLowerCase());
          });
          setFilteredListings({
            ...filteredListings,
            doorteam: _doorteam,
            doorTeamInEvent: _doorteamInEvent,
            archivedDoorTeam: _archivedDoorteam,
          });
          break;

        case USER_ROLES.PROMOTOR:
          let _promoters = promotors.filter((item) => {
            return item.organizer.fullName
              .toLowerCase()
              .includes(value.toLowerCase());
          });
          let _archivedPromoters = archivedPromoters.filter((item) => {
            return item.organizer.fullName
              .toLowerCase()
              .includes(value.toLowerCase());
          });
          let _promotersInEvent = promotorsInEvent.filter((item) => {
            return item.organizer.fullName
              .toLowerCase()
              .includes(value.toLowerCase());
          });

          setFilteredListings({
            ...filteredListings,
            promoters: _promoters,
            promotersInEvent: _promotersInEvent,
            archivedPromoters: _archivedPromoters,
          });
          break;
      }
    }

    filterOrganizers(enteredValue);
  }

  async function updateArchive(movedToArchive, memberId) {
    try {
      const response = await getAxiosClient().post("community/archive", {
        moveToArchive: movedToArchive,
        memberId: memberId,
        eventId: selectedEvent?.id,
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

  async function onActiveMember(activation, user) {
    let postObject = {
      eventId: selectedEvent.id,
      doorteamId: user.organizer.id,
    };

    try {
      setIsLoading(true);
      if (activation) {
        let response = await getAxiosClient().post(`doormanactive`, postObject);
      } else {
        let response = await getAxiosClient().delete(`doormanactive`, {
          data: {
            eventId: selectedEvent.id,
            doorteamId: user.organizer.id,
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
    try {
      let postObject = {
        eventId: selectedEvent.id,
        organizerId: user.organizer.id,
      };

      let response = await getAxiosClient().post(
        `eventsorganizers/${getAPIType()}`,
        {
          eventId: selectedEvent.id,
          organizerId: user.organizer.id,
        }
      );

      let eventToAdd = response.data.payLoad;

      switch (userType) {
        case USER_ROLES.ADMIN:
          dispatch(addAdminInEvent({ ...eventToAdd, isActivation: true }));
          dispatch(
            removeSpecificFromEventSuggestionAdmin(eventToAdd.organizer)
          );
          break;

        case USER_ROLES.DOOR_TEAM:
          dispatch(addDoorTeamInEvent({ ...eventToAdd, isActivation: true }));
          dispatch(
            removeSpecificFromEventSuggestionDoorTeam(eventToAdd.organizer)
          );
          break;

        case USER_ROLES.PROMOTOR:
          dispatch(addPromotersInEvent({ ...eventToAdd, isActivation: true }));
          dispatch(removeSpecificFromEventPromoter(eventToAdd.organizer));
          break;
      }
    } catch (err) {
      let errors = parseExpoError(err);
      showAlert(errors.message);
    } finally {
      setIsLoading(false);
    }
  }

  function onArchivePressed(memberId, movedToArchive) {
    switch (userType) {
      case USER_ROLES.ADMIN:
        if (movedToArchive) {
          dispatch(addAdminToArchive({ memberId, movedToArchive }));
        } else {
          dispatch(removeAdminFromArchive({ memberId, movedToArchive }));
        }
        break;
      case USER_ROLES.DOOR_TEAM:
        if (movedToArchive) {
          dispatch(addDoorTeamToArchive({ memberId, movedToArchive }));
        } else {
          dispatch(removeDoorTeamFromArchive({ memberId, movedToArchive }));
        }
        break;
      case USER_ROLES.PROMOTOR:
        if (movedToArchive) {
          dispatch(addPromoterToArchive({ memberId, movedToArchive }));
        } else {
          dispatch(removePromoterFromArchive({ memberId, movedToArchive }));
        }
        break;
    }
    updateArchive(movedToArchive, memberId);
  }

  function getTitleText() {
    switch (userType) {
      case USER_ROLES.ADMIN:
        return "Manage Admins";
      case USER_ROLES.DOOR_TEAM:
        return "Manage Door Team";
      case USER_ROLES.PROMOTOR:
        return "Manage Promoters";
    }
  }
  function getSearchPlaceHolder() {
    switch (userType) {
      case USER_ROLES.ADMIN:
        return "Search Admins";
      case USER_ROLES.DOOR_TEAM:
        return "Search Door Team";
      case USER_ROLES.PROMOTOR:
        return "Search Promoters";
    }
  }

  function getArchivedText() {
    switch (userType) {
      case USER_ROLES.ADMIN:
        return "Archived Admins";
      case USER_ROLES.DOOR_TEAM:
        return "Archived Door Team";
      case USER_ROLES.PROMOTOR:
        return "Archived Promoters";
    }
  }

  function getInEventData() {
    switch (userType) {
      case USER_ROLES.ADMIN:
        return filteredListings.adminInEvent;
      case USER_ROLES.DOOR_TEAM:
        return filteredListings.doorTeamInEvent;
      case USER_ROLES.PROMOTOR:
        return filteredListings.promotersInEvent;
    }
  }

  function getQuickData() {
    switch (userType) {
      case USER_ROLES.ADMIN:
        return filteredListings.admin;
      case USER_ROLES.DOOR_TEAM:
        return filteredListings.doorteam;
      case USER_ROLES.PROMOTOR:
        return filteredListings.promoters;
    }
  }

  function getArchivedData() {
    switch (userType) {
      case USER_ROLES.ADMIN:
        return filteredListings?.archivedAdmin ?? [];
      case USER_ROLES.DOOR_TEAM:
        return filteredListings?.archivedDoorTeam ?? [];
      case USER_ROLES.PROMOTOR:
        return filteredListings?.archivedPromoters ?? [];
      default:
        return [];
    }
  }

  return (
    <>
      <RootView loading={loading}>
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <DetailHeaderView
                title={""}
                onInviteMorePressed={() => {
                  navigation.navigate("InviteTeam", {
                    type: userType,
                    selectedEvent: selectedEvent,
                  });
                }}
              />

              <View style={GlobalStyles.screenTitleContainer}>
                <LatoText style={GlobalStyles.screenTitle}>
                  {getTitleText()}
                </LatoText>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingRight: 0,
                marginTop: 10,
              }}
            >
              <SearchView
                placeholder={getSearchPlaceHolder()}
                onUpdateValue={updateInputValueHandler.bind(this, "promotor")}
              />
            </View>
            <SectionList
              sections={[
                {
                  title: "Added in this event",
                  data: getInEventData(),
                },
                {
                  title: "Quickly Add to event",
                  data: getQuickData(),
                },
                {
                  title: getArchivedText(),
                  data: getArchivedData(),
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
                  />
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
            />
          </View>
        </SafeAreaView>
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
    marginTop: 10,
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
  actionButton: {
    right: 12,
    marginLeft: 10,
    backgroundColor: GlobalConsts.Colors.CARD_LIGHT_GREY,
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ManageOrganizersScreen;
