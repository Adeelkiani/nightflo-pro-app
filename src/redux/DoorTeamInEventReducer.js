import { createSlice } from "@reduxjs/toolkit";

export const DoorTeamInEventReducer = createSlice({
  name: "DoorTeamInEvent",
  initialState: {
    doorteam: [],
    suggestions: [],
    archivedSuggestions: [],
  },
  reducers: {
    setDoorTeam: (state, action) => {
      state.doorteam = action.payload;
      return state;
    },

    setDoorTeamSuggestions: (state, action) => {
      state.suggestions = action.payload;
      return state;
    },

    addDoorTeam: (state, action) => {
      state.doorteam.unshift(action.payload);
      return state;
    },

    addDoorTeamInEventSuggestion: (state, action) => {
      state.suggestions.unshift(action.payload);
      return state;
    },

    clearDoorTeam: (state, action) => {
      state.doorteam = [];
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
    setArchivedDoorTeamInEventSuggestions: (state, action) => {
      state.archivedSuggestions = action.payload;
      return state;
    },
    addDoorTeamToArchive: (state, action) => {
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
    removeDoorTeamFromArchive: (state, action) => {
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

export const setDoorTeamInEvent = DoorTeamInEventReducer.actions.setDoorTeam;
export const setDoorTeaminEventSuggestions =
  DoorTeamInEventReducer.actions.setDoorTeamSuggestions;
export const setArchivedDoorTeamInEventSuggestions =
  DoorTeamInEventReducer.actions.setArchivedDoorTeamInEventSuggestions;
export const addDoorTeamInEvent = DoorTeamInEventReducer.actions.addDoorTeam;
export const addDoorTeamInEventSuggestions =
  DoorTeamInEventReducer.actions.addDoorTeamInEventSuggestion;
export const removeSpecificFromEventSuggestionDoorTeam =
  DoorTeamInEventReducer.actions.removeSpecificMember;
export const clearDoorTeamInEvent =
  DoorTeamInEventReducer.actions.clearDoorTeam;

export const addDoorTeamToArchive =
  DoorTeamInEventReducer.actions.addDoorTeamToArchive;
export const removeDoorTeamFromArchive =
  DoorTeamInEventReducer.actions.removeDoorTeamFromArchive;
export default DoorTeamInEventReducer.reducer;
