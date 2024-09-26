import { CaseReducer, createSlice } from "@reduxjs/toolkit";

export const PromotersReducers = createSlice({
  name: "Promoters",
  initialState: {
    promotors: [],
  },
  reducers: {
    setPromoters: (state, action) => {
      state.promotors = action.payload;
      return state;
    },

    addPromoter: (state, action) => {
      state.promotors.unshift(action.payload);
    },

    clearPromoters: (state, action) => {
      state.promotors = [];
    },

    removeSpecificMember: (state, action) => {
      let newArray = state.promotors.filter((item) => {
        return item.organizer.id != action.payload.organizer.id;
      });
      state.promotors = newArray;
    },
  },
});

export const setPromoters = PromotersReducers.actions.setPromoters;
export const addPromoters = PromotersReducers.actions.addPromoter;
export const clearPromoters = PromotersReducers.actions.clearPromoters;
export const removePromoter = PromotersReducers.actions.removeSpecificMember;
export default PromotersReducers.reducer;
