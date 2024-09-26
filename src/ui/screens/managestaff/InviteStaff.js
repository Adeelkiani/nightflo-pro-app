import React, { useEffect, useState } from "react";
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
import {
  addNewInvitedUser,
  clearInvitedList,
  setInvitedUsers,
} from "../../../redux/InvitesReducer";
import { parseExpoError } from "../../../utils/AxiosErrorParser";
import { getAxiosClient } from "../../apis/TallyApi";
import LatoText from "../../auth/LatoText";
import BackgroundLinearGradient from "../../components/BackgroundLinearGradient";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { INVITE_TYPE } from "../../home/invite/EnumInviteType";
import InviteListItem from "../../home/invite/InviteListItem";

import { AntDesign } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list/index";
import { MANAGE_ROLES } from "../../role/ConstRoles";
import DetailHeaderView from "../../components/DetailHeaderView";
import CustomTextInput from "../../components/CustomTextInput";
import useModal, { MODAL_TYPE } from "../../../hooks/ModalHook";
import MessagePopup from "../../components/popup/MessagePopup";

function renderInviteItem(item) {
  return <InviteListItem userItem={item.item}></InviteListItem>;
}

const InviteStaff = ({ navigation, route }) => {
  const [loading, setIsLoading] = useState(false);
  const [inviteStatus, setInviteStatus] = useState("");
  const [fullName, setFullName] = useState("");
  const inviteType = INVITE_TYPE.DOOR_TEAM;
  const selectedEvent = route.params?.selectedEvent;
  const isDoorTeam = inviteType === INVITE_TYPE.DOOR_TEAM;
  const dispatch = useDispatch();
  const invtedUsers = useSelector((state) => {
    return state.invites.invitedUsers;
  });
  const [selectedRole, setSelectedRole] = useState("Bartender");
  const data = [
    { key: "1", value: "Bartender" },
    { key: "2", value: "Security" },
  ];

  const [email, setEmail] = useState("");
  const {
    isVisible: isMessagePopupVisible,
    data: popupData,
    show: showMesagePopup,
    hide: hideMessagePopup,
  } = useModal();

  useEffect(() => {
    async function fetchExistingRequests() {
      try {
        setIsLoading(true);
        Keyboard.dismiss();

        const staffRole =
          MANAGE_ROLES[selectedRole === "1" ? "Bartender" : selectedRole];

        const fullpath = `staff/getStaffByRole/${staffRole}`;
        let response = await getAxiosClient().get(fullpath);
        dispatch(setInvitedUsers(response.data.payLoad));
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
    }

    fetchExistingRequests();

    return function cleanup() {
      dispatch(clearInvitedList());
    };
  }, [selectedRole]);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "fullName":
        setFullName(enteredValue);
        break;

      case "email":
        setEmail(enteredValue);
        break;
    }
  }

  async function addTeamMember() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const emailIsValid = reg.test(email);
    const namePattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    const nameValid = namePattern.test(fullName);

    const staffRole =
      MANAGE_ROLES[selectedRole === "1" ? "Bartender" : selectedRole];
    if (!selectedRole) {
      showMesagePopup(
        {
          title: "Attention!",
          description: "Please select a role",
          isTypeError: true,
        },
        MODAL_TYPE.MESSAGE_POPUP
      );
      return;
    }

    if (!nameValid) {
      showMesagePopup(
        {
          title: "Incorrect full name",
          description: "Please enter a valid name e.g. John Doe",
          isTypeError: true,
        },
        MODAL_TYPE.MESSAGE_POPUP
      );
      return;
    }

    if (emailIsValid) {
      try {
        setIsLoading(true);

        if (selectedEvent) {
          let postPayLoad = {
            eventId: selectedEvent.id,
            email: email,
            fullName: fullName,
            userType: staffRole,
          };

          let path = "staff/addStaff";

          let response = await getAxiosClient().post(path, postPayLoad);
          let data = response.data.payLoad;
          dispatch(addNewInvitedUser(data));
          setEmail("");
          setFullName("");
          showMesagePopup(
            {
              title: "Member added",
              description: `Invitation sent to ${email}`,
            },
            MODAL_TYPE.MESSAGE_POPUP
          );
        }
      } catch (err) {
        let response = parseExpoError(err);
        showMesagePopup(
          {
            title: "Unable to add staff",
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
              <View>
                <DetailHeaderView title={""} />
              </View>

              <View style={GlobalStyles.screenTitleContainer}>
                <LatoText style={GlobalStyles.screenTitle}>
                  {"Add Team"}
                </LatoText>
              </View>
              <View style={styles.subContainer}>
                <View
                  style={{
                    marginHorizontal: 20,
                    width: "100%",
                    marginVertical: 8,
                  }}
                >
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
                    searchicon={
                      <AntDesign name="search1" size={20} color="white" />
                    }
                    arrowicon={
                      <AntDesign name="down" size={15} color="white" />
                    }
                    closeicon={
                      <AntDesign name="close" size={20} color="white" />
                    }
                    upicon={<AntDesign name="up" size={24} color="white" />}
                    placeholder={"Choose a staff role"}
                    search={false}
                  />
                </View>

                <CustomTextInput
                  placeHolder="Full Name (eg. John Doe)"
                  onUpdateValue={updateInputValueHandler.bind(this, "fullName")}
                  value={fullName}
                  style={{
                    width: "100%",
                  }}
                  activeOutlineColor={GlobalConsts.Colors.primaryGreen}
                  marginTop={10}
                />

                <CustomTextInput
                  placeHolder="Email"
                  onUpdateValue={updateInputValueHandler.bind(this, "email")}
                  value={email}
                  style={{
                    width: "100%",
                  }}
                  activeOutlineColor={GlobalConsts.Colors.primaryGreen}
                  marginTop={10}
                />

                <View style={{ marginTop: 12 }}>
                  <Button height={45} minWidth={"100%"} onPress={addTeamMember}>
                    Send Invitation
                  </Button>
                </View>
                <LatoText
                  style={[
                    GlobalStyles.heading,
                    {
                      marginTop: 12,
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
                    // console.log(item.member.id);
                    return item.organizer.id;
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
          title={popupData?.title}
          description={popupData?.description}
          isTypeError={popupData?.isTypeError}
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
  },
  emailInput: {
    width: "90%",
  },
});

export default InviteStaff;
