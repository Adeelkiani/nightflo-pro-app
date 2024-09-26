import { USER_ROLES } from "../consts/EnumsConts";
import { MANAGE_ROLES_TEXT } from "../ui/role/ConstRoles";

export function getDisplayNameOfRole(userType) {
  switch (userType) {
    case USER_ROLES.CLUB_OWNER:
      return "Club owner";
    case USER_ROLES.ADMIN:
      return "Admin";
    case USER_ROLES.DOOR_TEAM:
      return "Door team";
    case USER_ROLES.PROMOTOR:
      return "Promoter";
    case USER_ROLES.BARTENDER:
      return "Bartender";
    case USER_ROLES.SECURITY:
      return "Security";
    default:
      return "";
  }
}
export function getReformattedRoleName(role) {
  switch (role) {
    case "Security":
      return MANAGE_ROLES_TEXT.SECURITY;
    default:
      return role;
  }
}

export function identifySocialMedia(url) {
  const patterns = {
    Facebook: /(?:http[s]?:\/\/)?(?:www\.)?facebook\.com\/.+/i,
    Instagram: /(?:http[s]?:\/\/)?(?:www\.)?instagram\.com\/.+/i,
    YouTube: /(?:http[s]?:\/\/)?(?:www\.)?youtube\.com\/.+/i,
    Twitter: /(?:http[s]?:\/\/)?(?:www\.)?twitter\.com\/.+/i,
    TikTok: /(?:http[s]?:\/\/)?(?:www\.)?tiktok\.com\/.+/i,
    WhatsApp: /(?:http[s]?:\/\/)?(?:www\.)?chat.whatsapp\.com\/.+/i,
  };

  for (let platform in patterns) {
    if (patterns[platform].test(url)) {
      return platform;
    }
  }

  return "Unknown";
}

export function validateEmail(email) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function getFirstName(fullName) {
  const names = fullName.split(" ");
  const firstName = names[0];
  return firstName;
}
