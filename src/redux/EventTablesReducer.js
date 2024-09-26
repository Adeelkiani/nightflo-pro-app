import { CaseReducer, createSlice } from "@reduxjs/toolkit";

export const EventTableSlice = createSlice({
  name: "eventTables",
  initialState: {
    eventTables: [],
  },
  reducers: {
    setEventTables: (state, action) => {
      state.eventTables = action.payload;
    },
    addEventTable: (state, action) => {
      state.eventTables.push(action.payload);
    },
    updateEventTable: (state, action) => {
      let index = state.eventTables.findIndex(
        (e) => e.id === action.payload.id
      );
      state.eventTables[index] = action.payload;
      return state;
    },
    clearEventTables: (state, action) => {
      state.eventTables = [];
    },
  },
});

export const {
  setEventTables,
  addEventTable,
  clearEventTables,
  updateEventTable,
} = EventTableSlice.actions;
export default EventTableSlice.reducer;
