import { CaseReducer, createSlice } from "@reduxjs/toolkit";

export const AdminReducer = createSlice({
  name: "Admin",
  initialState: {
    admin: [],
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      return state;
    },

    addPromoter: (state, action) => {
      state.admin.unshift(action.payload);
    },

    clearAdmin: (state, action) => {
      state.admin = [];
    },

    removeSpecificMember: (state, action) => {
      let newArray = state.admin.filter((item) => {
        return item.organizer.id != action.payload.id;
      });
      state.admin = newArray;
    },
    removeAdminFromCommunity: (state, action) => {
      let newArray = state.admin.filter((item) => {
        return item.organizer.id != action.payload.organizer.id;
      });
      state.admin = newArray;
    },
  },
});

export const setAdmin = AdminReducer.actions.setAdmin;
export const addAdmin = AdminReducer.actions.addPromoter;
export const clearAdmin = AdminReducer.actions.clearAdmin;
export const removeSelectedDoorMan = AdminReducer.actions.removeSpecificMember;
export const removeAdminFromCommunity =
  AdminReducer.actions.removeAdminFromCommunity;
export default AdminReducer.reducer;
