import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  SectionList,
  SafeAreaView,
  Switch,
} from "react-native";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import { logoutUser } from "../../redux/UserReucer";
import {
  KEYS_ASYNC,
  clearTallyAsyncStorage,
  clearTallyAsyncStorageWithPrevention,
  getEnableAuthentication,
  storeEnableAuthentication,
} from "../../utils/TallyAsyncStorage";
import LatoText from "../auth/LatoText";
import RootView from "../components/RootView";
import {
  GENERAL_SETTINGS,
  MORE_SETTINGS,
  ACCOUNT_DELETION,
  AUTHENTICATION,
  ACCOUNT_SETTINGS,
  CLUBINFO,
  clubOwnerSettingList,
  otherSettingList,
} from "../role/ConstRoles";
import GreyContainerView from "../components/GreyContainerView";
import AwesomeAlert from "react-native-awesome-alerts";
import { getAxiosClient } from "../apis/TallyApi";
import { showAlert, showSuccessAlert } from "../../utils/Alert";
import { useDispatch, useSelector } from "react-redux";
import { parseExpoError } from "../../utils/AxiosErrorParser";
import {
  AccountDeletionDesc,
  AccountDeletionWarning,
} from "../../consts/DisplayConsts";
import { SvgIcons } from "../../svgs";
import { DeleteAccountAPI } from "../apis/EndPoints";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  const [deletionAlert, setDeletionAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticationEnabled, setAuthenticationEnabled] = useState(false);
  const dispatch = useDispatch();
  const isClubOwner = currentUser?.isClubOwner;

  useFocusEffect(
    React.useCallback(() => {
      async function checkAuthentication() {
        let isAuthenticationEnabled = await getEnableAuthentication();
        setAuthenticationEnabled(isAuthenticationEnabled ?? false);
      }

      checkAuthentication();
    }, [])
  );

  async function onToggled(isEnabled) {
    await storeEnableAuthentication(isEnabled).then(() => {
      setAuthenticationEnabled(isEnabled);
    });
  }

  async function deleteAccountAPI() {
    try {
      setLoading(true);
      let response = await getAxiosClient().post(DeleteAccountAPI);
      showSuccessAlert("Your account has been deleted successfully");
      clearSession();
    } catch (err) {
      let error = parseExpoError(err);
      showAlert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function clearSession() {
    await clearTallyAsyncStorage();
    dispatch(logoutUser());
  }

  function renderSectionHeader(title) {
    return (
      <View>
        <LatoText style={styles.sectionHeader}>{title}</LatoText>
      </View>
    );
  }

  function renderSettingItem(item) {
    return (
      <GreyContainerView
        borderWidth={1}
        marginVertical={10}
        paddingHorizontal={10}
      >
        <Pressable
          style={({ pressed }) => [
            styles.listItem,
            pressed && GlobalStyles.pressed,
          ]}
          onPress={async () => {
            switch (item.action) {
              case "PROFILE":
                navigation.navigate("ProfileScreen");
                break;

              case "CLUB_INFO":
                navigation.navigate("ClubInfoScreen");
                break;

              case "NOTIFICATIONS":
              case "HELP":
                break;
              case "ABOUT":
                break;
              case "LOGOUT":
                await clearTallyAsyncStorageWithPrevention([
                  KEYS_ASYNC.REMEMBER_EMAIL,
                  KEYS_ASYNC.ENABLE_AUTHENTICATION,
                ]);
                dispatch(logoutUser());
                break;
              case "DELETE_ACCOUNT":
                setDeletionAlert(true);
                break;
            }
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.imageContainer}>{item.image}</View>
            <LatoText style={styles.settingTitle}>{item.description}</LatoText>
          </View>
          {renderActionView(item.action)}
        </Pressable>
      </GreyContainerView>
    );
  }

  function renderActionView(action) {
    switch (action) {
      case "LOGOUT":
        break;
      case "AUTHENTICATION":
        return (
          <Switch
            trackColor={{
              false: "#767577",
              true: GlobalConsts.Colors.primaryGreen,
            }}
            thumbColor={isAuthenticationEnabled ? "white" : "#FFFFFF"}
            ios_backgroundColor="white"
            onValueChange={onToggled}
            value={isAuthenticationEnabled}
          />
        );
      case "DELETE_ACCOUNT":
        break;
      default:
        return <SvgIcons.RightArrowSvg color={GlobalConsts.Colors.white} />;
    }
  }

  return (
    <>
      <RootView>
        <SafeAreaView style={[styles.container, { marginBottom: 40 }]}>
          <GreyContainerView justifyContent="center" minHeight={50}>
            <LatoText style={styles.title}>Settings</LatoText>
          </GreyContainerView>

          <SectionList
            sections={isClubOwner ? clubOwnerSettingList : otherSettingList}
            renderItem={({ item }) => {
              return renderSettingItem(item);
            }}
            renderSectionHeader={({ section }) =>
              renderSectionHeader(section.title)
            }
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            style={styles.listStyle}
          />
        </SafeAreaView>

        <AwesomeAlert
          show={deletionAlert}
          title={"Warning!"}
          message={AccountDeletionDesc}
          showConfirmButton={true}
          showCancelButton={true}
          closeOnTouchOutside={false}
          onCancelPressed={() => {
            setDeletionAlert(false);
          }}
          onConfirmPressed={() => {
            setDeletionAlert(false);
            setTimeout(deleteAccountAPI, 200);
          }}
          confirmButtonColor={GlobalConsts.Colors.error700}
        />
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    paddingLeft: 20,
  },
  listStyle: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  listItem: {
    height: 50,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "500",
    color: GlobalConsts.Colors.grey81,
    marginTop: 10,
    marginBottom: 20,
  },
  settingTitle: {
    color: GlobalConsts.Colors.white,
    textAlign: "center",
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "600",
  },
  imageContainer: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: GlobalConsts.Colors.primaryGreen15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
