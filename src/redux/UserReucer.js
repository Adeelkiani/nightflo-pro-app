import { CaseReducer, createSlice } from "@reduxjs/toolkit";
import { USER_ROLES } from "../consts/EnumsConts";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    fullName: "",
    email: null,
    password: "",
    userType: "",
    type: "",
    typeToDisplay: "",
    token: null,
    address: "",
    isVerified: false,
    id: "",
    tokenPosted: false,
    lockMode: false,
    isClubOwner: false,
    isAdmin: false,
    isDoorTeam: false,
    isPromoter: false,
    isSecurity: false,
    isStaff: false,
    isPlanPurchased: false,
    club: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;

      return state;
    },
    setEmailPass: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },

    modifyuser: (state, action) => {
      const userType = action.payload.userType;
      const club = action.payload.club ?? {};
      state = {
        ...state,
        ...action.payload,
        isClubOwner: userType === USER_ROLES.CLUB_OWNER,
        isAdmin: userType === USER_ROLES.ADMIN,
        isDoorTeam: userType === USER_ROLES.DOOR_TEAM,
        isPromoter: userType === USER_ROLES.PROMOTOR,
        isSecurity: userType === USER_ROLES.SECURITY,
        isStaff:
          userType === USER_ROLES.BARTENDER ||
          userType === USER_ROLES.DJ ||
          userType === USER_ROLES.VIP_HOST,
        club: club,
        isPlanPurchased: club?.isPlanPurchased ?? false,
      };
      return state;
    },

    updateClubPaymentPlan: (state, action) => {
      const club = action.payload ?? {};
      state = {
        ...state,
        club: club,
        isPlanPurchased: club?.isPlanPurchased ?? false,
      };
      return state;
    },

    setDeviceToken: (state, action) => {
      // console.log("SetDeviceToken", state, action.payload);
      return { ...state, ...action.payload };
    },

    clearUser: (state, action) => {
      state = {};

      return state;
    },
  },
});

export const setUser = UserSlice.actions.setUser;
export const setEmailPass = UserSlice.actions.setEmailPass;
export const modifyuser = UserSlice.actions.modifyuser;
export const logoutUser = UserSlice.actions.clearUser;
export const setDeviceToken = UserSlice.actions.setDeviceToken;
export const updateClubPaymentPlan = UserSlice.actions.updateClubPaymentPlan;
export default UserSlice.reducer;
