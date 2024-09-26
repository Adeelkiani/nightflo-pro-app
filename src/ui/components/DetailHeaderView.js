import { StyleSheet, View } from "react-native";
import React from "react";
import LatoText from "../auth/LatoText";
import { MD2Colors } from "react-native-paper";
import { GlobalConsts, GlobalStyles } from "../../consts/GlobalConsts";
import BackArrowButton from "./BackArrowButton";
import { SvgIcons } from "../../svgs/index";
import GrayBoxIconButton from "./GrayBoxIconButton";
import { USER_ROLES } from "../../consts/EnumsConts";
import { useSelector } from "react-redux";
import {
  GUEST_LIST_SETTINGS,
  INVITE_GUESTS,
  TALLY_OVERVIEW,
} from "../../consts/DisplayConsts";
import { useState } from "react";
import { Provider as PaperProvider, Menu, Divider } from "react-native-paper";
import SearchView from "./SearchView";
import { Dimensions } from "react-native";

export default function DetailHeaderView({
  onSendReportPressed,
  onTablesPressed,
  onOverViewPressed,
  onCreateTempPromoterPressed,
  onInviteMorePressed,
  onSettingsPressed,
  onInviteGuestPressed,
  onQRPressed,
  onMorePressed,
  onTallyPressed,
  onAddPressed,
  onGuestListPressed,
  onReserveTablePressed,
  onVerifyCheckInPressed,
  onMyGuestListPressed,
  title = "Details",
  backButtonLabel = "Back",
  backgroundColor = GlobalConsts.Colors.transparent05,
  selectedEvent,
  showBackButton = true,
  defaultSearchText = "",
  onSearchTextChanged,
  searchViewPlaceHolder = "Search here...",
  showThemedTitle = true,
}) {
  const currentUser = useSelector((state) => {
    return state.mUser;
  });

  let isClubOwner = currentUser.isClubOwner;
  let isAdmin = currentUser.isAdmin;
  let isDoorTeam = currentUser.isDoorTeam;
  let isPromoter = currentUser.isPromoter;
  let isSecurity = currentUser.isSecurity;

  //More option menu
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [isSearchBarVisible, setSearchBarVisible] = useState(false);

  function renderSearchBar() {
    return (
      <View style={styles.searchView}>
        <BackArrowButton leftMargin={15} />
        <SearchView
          onUpdateValue={onSearchTextChanged}
          value={defaultSearchText}
          placeholder={searchViewPlaceHolder}
          onClearText={() => {
            onSearchTextChanged("");
            setSearchBarVisible(false);
          }}
        />
      </View>
    );
  }
  return (
    <View style={[{ backgroundColor: backgroundColor, height: 60 }]}>
      {!isSearchBarVisible || !onSearchTextChanged ? (
        <View style={[styles.container]}>
          {showBackButton && (
            <BackArrowButton topMargin={0} label={backButtonLabel} />
          )}

          <View style={styles.titleContainer}>
            <LatoText
              style={showThemedTitle ? styles.themeTitleText : styles.titleText}
            >
              {title}
            </LatoText>
          </View>

          <View style={styles.actionButtonsContainer}>
            {(isClubOwner || isAdmin || isDoorTeam) && onTablesPressed && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.TableSvg />}
                onPress={() => {
                  onTablesPressed();
                }}
              />
            )}

            {onOverViewPressed && (isClubOwner || isAdmin || isDoorTeam) && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.OverViewSvg />}
                onPress={() => {
                  if (onOverViewPressed) {
                    onOverViewPressed();
                  }
                }}
              />
            )}

            {onTallyPressed && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.TallySvg />}
                onPress={() => {
                  if (onTallyPressed) {
                    onTallyPressed();
                  }
                }}
              />
            )}

            {isPromoter && onReserveTablePressed && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.ReserveSvg />}
                onPress={() => {
                  if (onReserveTablePressed) {
                    onReserveTablePressed();
                  }
                }}
              />
            )}

            {onCreateTempPromoterPressed && isPromoter && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.AddSvg />}
                onPress={() => {
                  if (onCreateTempPromoterPressed) {
                    onCreateTempPromoterPressed();
                  }
                }}
              />
            )}

            {(isClubOwner || isAdmin) && onAddPressed && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.AddSvg />}
                onPress={() => {
                  if (onAddPressed) {
                    onAddPressed();
                  }
                }}
              />
            )}

            {onSendReportPressed && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.ReportSvg />}
                onPress={() => {
                  if (onSendReportPressed) {
                    onSendReportPressed();
                  }
                }}
              />
            )}

            {onSettingsPressed && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.SettingsActiveMenuSvg />}
                onPress={() => {
                  if (onSettingsPressed) {
                    onSettingsPressed();
                  }
                }}
              />
            )}

            {onGuestListPressed && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.GuestListUserSvg />}
                onPress={() => {
                  if (onGuestListPressed) {
                    onGuestListPressed();
                  }
                }}
              />
            )}

            {onQRPressed && (isClubOwner || isAdmin) && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.QRSvg color={GlobalConsts.Colors.black} />}
                onPress={() => {
                  if (onQRPressed) {
                    onQRPressed();
                  }
                }}
              />
            )}

            {onInviteMorePressed && (
              <GrayBoxIconButton
                assetIcon={
                  <SvgIcons.AddSvg color={GlobalConsts.Colors.black} />
                }
                width={120}
                title={"Invite More"}
                backgroundColor={GlobalConsts.Colors.primaryGreen}
                textColor={GlobalConsts.Colors.black}
                borderRadius={20}
                onPress={() => {
                  if (onInviteMorePressed) {
                    onInviteMorePressed();
                  }
                }}
              />
            )}

            {onSearchTextChanged && (
              <GrayBoxIconButton
                assetIcon={<SvgIcons.SearchSvg />}
                onPress={() => {
                  setSearchBarVisible(true);
                }}
              />
            )}
          </View>
        </View>
      ) : (
        renderSearchBar()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    width: "100%",
    zIndex: -999,
  },
  errorText: {
    fontSize: 18,
    color: MD2Colors.white,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
  },
  actionButton: {
    marginLeft: 10,
    backgroundColor: GlobalConsts.Colors.CARD_LIGHT_GREY,
    padding: 8,
    borderRadius: 8,
    height: 35,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    maxWidth: 160,
    position: "absolute",
    left: Dimensions.get("window").width / 2 - 75,
    right: 0,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontSize: 18,
    paddingVertical: 5,
    textAlign: "center",
  },
  themeTitleText: {
    color: GlobalConsts.Colors.primaryGreenTextColor,
    fontSize: 20,
    paddingVertical: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  searchView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "space-between",
  },
});
