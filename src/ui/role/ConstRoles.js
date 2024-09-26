import { SvgIcons } from "../../svgs";
import SettingAboutSvg from "../../svgs/SettingAboutSvg";
import SettingHelpSvg from "../../svgs/SettingHelpSvg";
import SettingProfileSvg from "../../svgs/SettingProfileSvg";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

export const ConstRoles = [
  {
    id: "e1",
    description: "Club Owner",
    image: require(`../../../assets/club_owner_icon.png`),
    typeToDisplay: "Club Owner",
    type: "CLUB_OWNER",
  },
  {
    id: "e2",
    description: "Club Manager / Admin",
    image: require(`../../../assets/admin_icon.png`),
    typeToDisplay: "Club Manager / Admin",
    type: "ADMIN",
  },
  {
    id: "e3",
    description: "Door team",
    image: require(`../../../assets/door_team_icon.png`),
    type: "DOOR_TEAM",
    typeToDisplay: "Door team",
  },
  {
    id: "e4",
    description: "Promoter/PR",
    image: require(`../../../assets/promoter_icon.png`),
    type: "PROMOTOR",
    typeToDisplay: "Promoter/PR",
  },
  {
    id: "e5",
    description: "Bartender",
    image: require(`../../../assets/bartender_icon.png`),
    type: "BARTENDER",
    typeToDisplay: "Bartender",
  },
];

export const MANAGE_ROLES = {
  "Door Team": "DOOR_TEAM",
  Promoter: "PROMOTOR",
  "Sub Promoter": "SUB_PROMOTOR",
  Bartender: "BARTENDER",
  "Cocktail Waitress": "COCKTAIL_WAITRESS",
  DJ: "DJ",
  Security: "SECURITY",
  "VIP Host": "VIP_HOST",
};

//Note:
export const MANAGE_ROLES_TEXT = {
  Doorteam: "Door Team",
  Promoter: "Promoter",
  BARTENDER: "Bartender",
  COCKTAIL_WAITRESS: "Cocktail Waitress",
  DJ: "DJ",
  SECURITY: "Security",
  VIP_HOST: "VIP Host",
};

export const GENERAL_SETTINGS = [
  {
    id: "e3",
    description: "Profile",
    image: <SvgIcons.ProfileSvg />,
    action: "PROFILE",
  },
];
export const MORE_SETTINGS = [
  {
    id: "e5",
    description: "Help & Support",
    image: <SvgIcons.SupportSvg />,
    action: "HELP",
  },

  {
    id: "e6",
    description: "About",
    image: <SvgIcons.AboutSvg />,
    action: "ABOUT",
  },
];

export const CLUBINFO = [
  {
    id: "e12",
    description: "Club",
    image: <SvgIcons.GuestInfoSvg />,
    action: "CLUB_INFO",
  },
];
export const AUTHENTICATION = [
  {
    id: "e8",
    description: "Authentication",
    image: <SvgIcons.KeySvg />,
    action: "AUTHENTICATION",
  },
];

export const ACCOUNT_SETTINGS = [
  {
    id: "e101",
    description: "Delete Account",
    image: <SvgIcons.DeleteSvg />,
    action: "DELETE_ACCOUNT",
  },
  {
    id: "e7",
    description: "Logout",
    image: <SvgIcons.LogoutSvg />,
    action: "LOGOUT",
  },
];

export const clubOwnerSettingList = [
  {
    title: "GENERAL",
    data: GENERAL_SETTINGS,
  },
  {
    title: "MY CLUB",
    data: CLUBINFO,
  },
  {
    title: "AUTHENTICATION",
    data: AUTHENTICATION,
  },
  // {
  //   title: "NIGHTFLO PRO",
  //   data: MORE_SETTINGS,
  // },
  {
    title: "MY ACCOUNT",
    data: ACCOUNT_SETTINGS,
  },
];

export const otherSettingList = [
  {
    title: "GENERAL",
    data: GENERAL_SETTINGS,
  },
  {
    title: "AUTHENTICATION",
    data: AUTHENTICATION,
  },
  // {
  //   title: "NIGHTFLO PRO",
  //   data: MORE_SETTINGS,
  // },
  {
    title: "MY ACCOUNT",
    data: ACCOUNT_SETTINGS,
  },
];
