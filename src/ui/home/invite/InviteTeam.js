import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Keyboard,
  Platform,
} from "react-native";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GlobalConsts, GlobalStyles } from "../../../consts/GlobalConsts";
import { addDoorTeamInEvent } from "../../../redux/DoorTeamInEventReducer";
import {
  addNewInvitedUser,
  clearInvitedList,
  setInvitedUsers,
} from "../../../redux/InvitesReducer";
import { addPromotersInEvent } from "../../../redux/PromotersInEventReducer";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { getAxiosClient } from "../../apis/TallyApi";
import LatoText from "../../auth/LatoText";
import BackgroundLinearGradient from "../../components/BackgroundLinearGradient";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

import { INVITE_TYPE } from "./EnumInviteType";
import InviteListItem from "./InviteListItem";
import DetailHeaderView from "../../components/DetailHeaderView";
import CustomTextInput from "../../components/CustomTextInput";
import useModal, { MODAL_TYPE } from "../../../hooks/ModalHook";
import MessagePopup from "../../components/popup/MessagePopup";
import { USER_ROLES } from "../../../consts/EnumsConts";
import { addAdminInEvent } from "../../../redux/AdminInEventReducer";

function renderInviteItem(item) {
  return <InviteListItem userItem={item.item}></InviteListItem>;
}

const InviteTeam = ({ navigation, route }) => {
  const [loading, setIsLoading] = useState(false);
  const [inviteStatus, setInviteStatus] = useState("");
  const inviteType = route.params?.type;
  const selectedEvent = route.params?.selectedEvent;
  const dispatch = useDispatch();
  const invtedUsers = useSelector((state) => {
    return state.invites.invitedUsers;
  });

  const [email, setEmail] = useState("");
  const {
    isVisible: isMessagePopupVisible,
    data,
    show: showMesagePopup,
    hide: hideMessagePopup,
  } = useModal();

  useEffect(() => {
    async function fetchExistingRequests() {
      try {
        setIsLoading(true);
        Keyboard.dismiss();

        let response = await getAxiosClient().get(getAPIType());

        dispatch(setInvitedUsers(response.data.payLoad));
      } catch (err) {
        let response = parseExpoError(err);

        showMesagePopup(
          {
            title: "Error loading invites",
            description: response.message,
            isTypeError: true,
          },
          MODAL_TYPE.MESSAGE_POPUP
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchExistingRequests();

    return function cleanup() {
      dispatch(clearInvitedList());
    };
  }, []);

  function getMessageTitle() {
    switch (inviteType) {
      case USER_ROLES.ADMIN:
        return "Admin added";
      case USER_ROLES.DOOR_TEAM:
        return "Door Team added";
      case USER_ROLES.PROMOTOR:
        return "Promoter added";
    }
  }

  function getMessageDescription() {
    switch (inviteType) {
      case USER_ROLES.ADMIN:
        return "Admin";
      case USER_ROLES.DOOR_TEAM:
        return "Door Team";
      case USER_ROLES.PROMOTOR:
        return "Promoter";
    }
  }

  function getScreenTitle() {
    switch (inviteType) {
      case USER_ROLES.ADMIN:
        return "Invite Admins";
      case USER_ROLES.DOOR_TEAM:
        return "Invite Door Team";
      case USER_ROLES.PROMOTOR:
        return "Invite Promoters";
    }
  }

  function getSubTitle() {
    switch (inviteType) {
      case USER_ROLES.ADMIN:
        return "Add new Admin";
      case USER_ROLES.DOOR_TEAM:
        return "Add new Doorman";
      case USER_ROLES.PROMOTOR:
        return "Add new Promoter";
    }
  }

  function getAPIType() {
    switch (inviteType) {
      case USER_ROLES.ADMIN:
        return "admin";
      case USER_ROLES.DOOR_TEAM:
        return "doorteam";
      case USER_ROLES.PROMOTOR:
        return "promoter";
    }
  }

  function updateOrganizers(data) {
    switch (inviteType) {
      case USER_ROLES.ADMIN:
        dispatch(addAdminInEvent({ ...data, isActivation: true }));
        dispatch(addNewInvitedUser(data));
        break;
      case USER_ROLES.DOOR_TEAM:
        dispatch(addDoorTeamInEvent({ ...data, isActivation: true }));
        dispatch(addNewInvitedUser(data));
        break;
      case USER_ROLES.PROMOTOR:
        dispatch(addNewInvitedUser(data));
        dispatch(addPromotersInEvent({ ...data, isActivation: true }));
        break;
    }
  }

  function updateInputValueHandler(inputType, enteredValue) {
    setEmail(enteredValue);
  }

  function isValidEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return email.length > 0 ? reg.test(email) : true;
  }

  async function addTeamMember() {
    if (isValidEmail(email) && email.length > 0) {
      try {
        setIsLoading(true);

        if (selectedEvent) {
          let postPayLoad = {
            eventId: selectedEvent.id,
            email: email,
          };

          let path = "eventsorganizers/" + getAPIType() + "/email";

          let response = await getAxiosClient().post(path, postPayLoad);
          let data = response.data.payLoad;

          updateOrganizers(data);
        } else {
          let response = await getAxiosClient().post(getAPIType() + "/add", {
            email: email,
          });

          dispatch(addNewInvitedUser(response.data.payLoad));
        }
        showMesagePopup(
          {
            title: getMessageTitle(),
            description: `${email} has been added to ${getMessageDescription()}`,
            isTypeError: true,
          },
          MODAL_TYPE.MESSAGE_POPUP
        );
        setEmail("");
      } catch (err) {
        let response = parseExpoError(err);
        showMesagePopup(
          {
            title: "Unable to invite",
            description: response.message,
            isTypeError: true,
          },
          MODAL_TYPE.MESSAGE_POPUP
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      showMesagePopup(
        {
          title: "Incorrect email",
          description: "Please enter a valid email",
          isTypeError: true,
        },
        MODAL_TYPE.MESSAGE_POPUP
      );
    }
  }
  return (
    <>
      <BackgroundLinearGradient>
        <SafeAreaView style={styles.container}>
          <View
            style={styles.container}
            extraScrollHeight={300}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.scrollContainer}>
              <StatusBar barStyle="light-content" />
              <DetailHeaderView title={""} />

              <View style={GlobalStyles.screenTitleContainer}>
                <LatoText style={GlobalStyles.screenTitle}>
                  {getScreenTitle()}
                </LatoText>
              </View>

              <View style={styles.subContainer}>
                <LatoText style={styles.subHeading}>{getSubTitle()}</LatoText>

                <CustomTextInput
                  placeHolder="Email"
                  onUpdateValue={updateInputValueHandler.bind(this, "email")}
                  value={email}
                  style={{
                    width: "100%",
                  }}
                  activeOutlineColor={GlobalConsts.Colors.primaryGreen}
                />

                <View style={{ marginTop: 12, marginBottom: 12 }}>
                  <Button height={45} minWidth={"100%"} onPress={addTeamMember}>
                    Send Invitation
                  </Button>
                </View>
                <LatoText
                  style={[
                    GlobalStyles.heading,
                    {
                      marginTop: 12,
                      marginBottom: 12,
                      color: GlobalConsts.Colors.primaryGreenTextColor,
                    },
                  ]}
                >
                  {inviteStatus}
                </LatoText>
                <LatoText
                  style={{
                    color: "white",
                    fontSize: 19,
                    paddingVertical: 12,
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "900",
                  }}
                >
                  Previously Sent Invites
                </LatoText>
                <FlatList
                  style={styles.listStyle}
                  data={invtedUsers}
                  renderItem={renderInviteItem}
                  keyExtractor={(item) => {
                    return item.organizer?.id;
                  }}
                ></FlatList>
              </View>

              <Loading isLoading={loading}></Loading>
            </View>
          </View>
        </SafeAreaView>
        <MessagePopup
          visible={isMessagePopupVisible}
          onClose={hideMessagePopup}
          title={data?.title}
          description={data?.description}
          isTypeError={data?.isTypeError}
        />
      </BackgroundLinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: { height: "100%" },
  subContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  headingTexT: {
    color: "white",
    fontSize: 25,
    width: "100%",
  },
  listStyle: {
    width: "100%",
    height: "100%",
  },
  subHeading: {
    width: "100%",
    color: "#FFFFFF77",
    marginTop: 12,
    marginBottom: 12,
    paddingLeft: 15,
  },
  emailInput: {
    width: "90%",
  },
});

export default InviteTeam;
