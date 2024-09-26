import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  eventRequests: [],
  communityRequests: [],
  requestCount: 0,
};

export const RequestsSlice = createSlice({
  name: "Requests",
  initialState: defaultState,
  reducers: {
    setRequests: (state, action) => {
      const newState = { ...state, ...action.payload };
      return newState;
    },

    clearRequests: (state, action) => {
      return { ...state, eventRequests: [], communityRequests: [] };
    },
  },
});
export const setRequests = RequestsSlice.actions.setRequests;
export const clearRequests = RequestsSlice.actions.clearRequests;
export default RequestsSlice.reducer;
