import { CaseReducer, createSlice } from "@reduxjs/toolkit";

export const DoorTeamReducer = createSlice({
  name: "DoorTeam",
  initialState: {
    doorteam: [],
  },
  reducers: {
    setDoorTeam: (state, action) => {
      state.doorteam = action.payload;
      return state;
    },

    addPromoter: (state, action) => {
      state.doorteam.unshift(action.payload);
    },

    clearDoorTeam: (state, action) => {
      state.doorteam = [];
    },

    removeSpecificMember: (state, action) => {
      let newArray = state.doorteam.filter((item) => {
        return item.organizer.id != action.payload.id;
      });
      state.doorteam = newArray;
    },
    removeDoorTeamFromCommunity: (state, action) => {
      let newArray = state.doorteam.filter((item) => {
        return item.organizer.id != action.payload.organizer.id;
      });
      state.doorteam = newArray;
    },
  },
});

export const setDoorTeam = DoorTeamReducer.actions.setDoorTeam;
export const addDoorTeam = DoorTeamReducer.actions.addPromoter;
export const clearDoorTeam = DoorTeamReducer.actions.clearDoorTeam;
export const removeSelectedDoorMan =
  DoorTeamReducer.actions.removeSpecificMember;
export const removeDoorTeamFromCommunity =
  DoorTeamReducer.actions.removeDoorTeamFromCommunity;
export default DoorTeamReducer.reducer;
