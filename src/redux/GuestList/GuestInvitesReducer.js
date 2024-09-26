import { CaseReducer, createSlice } from "@reduxjs/toolkit";

export const guestInvitesSlice = createSlice({
  name: "GuestInvites",
  initialState: {
    pendingCheckIns: [],
    verifiedCheckIns: [],
  },
  reducers: {
    setPendingCheckIns: (state, action) => {
      state.pendingCheckIns = action.payload;
      return state;
    },

    setVerifiedCheckIns: (state, action) => {
      state.verifiedCheckIns = action.payload;
      return state;
    },

    setVerifiedCheckInById: (state, action) => {
      const { id } = action.payload;
      const index = state.pendingCheckIns.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.pendingCheckIns.splice(index, 1);
        state.verifiedCheckIns.push(action.payload);
        console.log("REMOVED FROM PENDING");
      }
      return state;
    },

    removePendingCheckInById: (state, action) => {
      const id = action.payload.bookingId;
      const index = state.pendingCheckIns.findIndex((item) => item.id === id);
      state.pendingCheckIns.splice(index, 1);
      return state;
    },
  },
});

const { actions, reducer } = guestInvitesSlice;
export const {
  setPendingCheckIns,
  setVerifiedCheckIns,
  removePendingCheckInById,
  setVerifiedCheckInById,
} = actions;
export default reducer;
