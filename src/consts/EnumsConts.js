// TableReservationTypes
export const RESERVATION_TAB_TYPE = {
  PENDING: 0,
  CHECKEDIN: 1,
  NOSHOW: 2,
  BARTABS: 3,
};

// TableReservationTypes
export const GUEST_LIST_TAB_TYPE = {
  CHECKIN: 0,
  ARRIVED: 1,
};

export const PROMOTER_TAB_TYPE = {
  TEAM: 0,
  REQUESTS: 1,
};

export const RESERVATION_STATUS = {
  PENDING: "PENDING",
  CHECKEDIN: "CHECKEDIN",
  NOSHOW: "NOSHOW",
};

export const RESERVE_VIEW = "RESERVE_VIEW";
export const QR_VIEW = "QR_VIEW";
export const ALL_STAFF_VIEW_TYPE = {
  RESERVE_VIEW: RESERVE_VIEW,
  QR_VIEW: QR_VIEW,
};

export const USER_ROLES = {
  CLUB_OWNER: "CLUB_OWNER",
  ADMIN: "ADMIN",
  PROMOTOR: "PROMOTOR",
  DOOR_TEAM: "DOOR_TEAM",
  BARTENDER: "BARTENDER",
  SECURITY: "SECURITY",
};

export const QR_TYPES = {
  CHECK_IN: "CHECK_IN",
  CHECK_IN_RESHARE: "CHECK_IN_RESHARE",
  PROMOTOR_COMPS_REDUCE: "PROMOTOR_COMPS_REDUCE",
};

export const SCAN_TYPE = {
  COMPS: "comps",
  REDUCE: "reduce",
  CHECK_IN: "CHECK_IN",
};

export const TALLY_TYPE = {
  COMPS: "comps",
  REDUCE: "reduce",
  COMP_BOTTLE: "compBottles",
};

export const OTP_VERIFICATION_TYPE = {
  ACCOUNT_REGISTRATION: "ACCOUNT_REGISTRATION",
  ADD_SUB_PROMOTOR: "ADD_SUB_PROMOTOR",
};

export const EventSettingsType = {
  GUEST_LIST: "GUEST_LIST",
};

export const GuestListSettingsType = {
  VIP_LINK_SHARING: "VIP_LINK_SHARING",
  REDUCE_SHARING: "REDUCE_SHARING",
  DISABLE_LINKS: "DISABLE_LINKS",
};
