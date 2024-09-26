import { CaseReducer, createSlice } from "@reduxjs/toolkit";

export const PromotersInEventReducers = createSlice({
  name: "PromotersInEvent",
  initialState: {
    promotors: [],
    suggestions: [],
    archivedSuggestions: [],
  },
  reducers: {
    setPromoters: (state, action) => {
      state.promotors = action.payload;
      return state;
    },

    setPromotersinEventSuggestions: (state, action) => {
      state.suggestions = action.payload;
      return state;
    },

    setArchivedPromotersinEventSuggestions: (state, action) => {
      state.archivedSuggestions = action.payload;
      return state;
    },

    addPromoter: (state, action) => {
      state.promotors.unshift(action.payload);
    },

    addPromoterInEventSuggestions: (state, action) => {
      state.suggestions.unshift(action.payload);
      return state;
    },
    clearPromoters: (state, action) => {
      state.promotors = [];
    },
    removeSpecificMember: (state, action) => {
      let newArray = state.suggestions.filter((item) => {
        return item.organizer.id !== action.payload.id;
      });

      let newArchivedArray = state.archivedSuggestions.filter((item) => {
        return item.organizer.id !== action.payload.id;
      });
      state.suggestions = sortArrayInAsc(newArray);
      state.archivedSuggestions = sortArrayInAsc(newArchivedArray);
    },
    updateSubPromoterInfo: (state, action) => {
      const promotorId = action.payload.id;
      if (!state.promotors.length > 0) {
        return;
      }
      const index = state.promotors.findIndex(
        (item) => item.organizer.id === promotorId
      );
      var promotor = state.promotors[index].organizer;
      promotor = {
        ...promotor,
        fullName: action.payload.fullName,
        imageUrl: action.payload.imageUrl,
      };
      state.promotors[index].organizer = promotor;
    },
    addPromoterToArchive: (state, action) => {
      const { memberId, isArchived } = action.payload;
      if (!state.suggestions.length > 0) {
        return;
      }
      const index = state.suggestions.findIndex(
        (item) => item.organizer.id === memberId
      );
      var promoter = state.suggestions[index];
      promoter = {
        ...promoter,
        movedToArchive: true,
      };
      state.suggestions.splice(index, 1);
      state.archivedSuggestions.unshift(promoter);
      state.suggestions = sortArrayInAsc(state.suggestions);
      state.archivedSuggestions = sortArrayInAsc(state.archivedSuggestions);
    },
    removePromoterFromArchive: (state, action) => {
      const { memberId, isArchived } = action.payload;
      if (!state.archivedSuggestions.length > 0) {
        return;
      }
      const index = state.archivedSuggestions.findIndex(
        (item) => item.organizer.id === memberId
      );
      var promoter = state.archivedSuggestions[index];
      promoter = {
        ...promoter,
        movedToArchive: false,
      };
      state.archivedSuggestions.splice(index, 1);
      state.suggestions.unshift(promoter);
      state.suggestions = sortArrayInAsc(state.suggestions);
      state.archivedSuggestions = sortArrayInAsc(state.archivedSuggestions);
    },
  },
});

function sortArrayInAsc(array) {
  return array.sort(function (a, b) {
    if (a.organizer.fullName < b.organizer.fullName) {
      return -1;
    }
    if (a.organizer.fullName > b.organizer.fullName) {
      return 1;
    }
    return 0;
  });
}
export const setPromotersInEvent =
  PromotersInEventReducers.actions.setPromoters;
export const addPromotersInEvent = PromotersInEventReducers.actions.addPromoter;
export const clearPromotersInEvent =
  PromotersInEventReducers.actions.clearPromoters;
export const addPromoterInEventSuggestions =
  PromotersInEventReducers.actions.addPromoterInEventSuggestions;
export const setPromoterInEventSuggestions =
  PromotersInEventReducers.actions.setPromotersinEventSuggestions;
export const setArchivedPromoterInEventSuggestions =
  PromotersInEventReducers.actions.setArchivedPromotersinEventSuggestions;
export const addPromoterToArchive =
  PromotersInEventReducers.actions.addPromoterToArchive;
export const removePromoterFromArchive =
  PromotersInEventReducers.actions.removePromoterFromArchive;
export const removeSpecificFromEventPromoter =
  PromotersInEventReducers.actions.removeSpecificMember;
export const updateSubPromoterInfo =
  PromotersInEventReducers.actions.updateSubPromoterInfo;

export default PromotersInEventReducers.reducer;
