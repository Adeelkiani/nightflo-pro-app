import { createSlice } from "@reduxjs/toolkit";

export const AdminInEventReducer = createSlice({
  name: "AdminInEvent",
  initialState: {
    admin: [],
    suggestions: [],
    archivedSuggestions: [],
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      return state;
    },

    setAdminSuggestions: (state, action) => {
      state.suggestions = action.payload;
      return state;
    },

    addAdmin: (state, action) => {
      state.admin.unshift(action.payload);
      return state;
    },

    addAdminInEventSuggestion: (state, action) => {
      state.suggestions.unshift(action.payload);
      return state;
    },

    clearAdmin: (state, action) => {
      state.admin = [];
      state.suggestions = [];
      state.archivedSuggestions = [];
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
    setArchivedAdminInEventSuggestions: (state, action) => {
      state.archivedSuggestions = action.payload;
      return state;
    },
    addAdminToArchive: (state, action) => {
      const { memberId } = action.payload;
      if (!state.suggestions.length > 0) {
        return;
      }
      const index = state.suggestions.findIndex(
        (item) => item.organizer.id === memberId
      );
      var doorTeam = state.suggestions[index];
      doorTeam = {
        ...doorTeam,
        movedToArchive: true,
      };

      state.suggestions.splice(index, 1);
      state.archivedSuggestions.unshift(doorTeam);
      state.suggestions = sortArrayInAsc(state.suggestions);
      state.archivedSuggestions = sortArrayInAsc(state.archivedSuggestions);
    },
    removeAdminFromArchive: (state, action) => {
      const { memberId, isArchived } = action.payload;
      if (!state.archivedSuggestions.length > 0) {
        return;
      }
      const index = state.archivedSuggestions.findIndex(
        (item) => item.organizer.id === memberId
      );
      var doorTeam = state.archivedSuggestions[index];
      doorTeam = {
        ...doorTeam,
        movedToArchive: false,
      };
      state.archivedSuggestions.splice(index, 1);
      state.suggestions.unshift(doorTeam);
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

export const setAdminInEvent = AdminInEventReducer.actions.setAdmin;
export const setAdminInEventSuggestions =
  AdminInEventReducer.actions.setAdminSuggestions;
export const setArchivedAdminInEventSuggestions =
  AdminInEventReducer.actions.setArchivedAdminInEventSuggestions;
export const addAdminInEvent = AdminInEventReducer.actions.addAdmin;
export const addAdminInEventSuggestions =
  AdminInEventReducer.actions.addAdminInEventSuggestion;
export const removeSpecificFromEventSuggestionAdmin =
  AdminInEventReducer.actions.removeSpecificMember;
export const clearAdminInEvent = AdminInEventReducer.actions.clearAdmin;
export const addAdminToArchive = AdminInEventReducer.actions.addAdminToArchive;
export const removeAdminFromArchive =
  AdminInEventReducer.actions.removeAdminFromArchive;
export default AdminInEventReducer.reducer;
