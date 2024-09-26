import { CaseReducer, createSlice } from "@reduxjs/toolkit";

export const EventTicketSlice = createSlice({
  name: "eventTickets",
  initialState: {
    eventTickets: [],
  },
  reducers: {
    setEventTickets: (state, action) => {
      state.eventTickets = action.payload;
    },
    addEventTicket: (state, action) => {
      state.eventTickets.push(action.payload);
    },
    updateEventTicket: (state, action) => {
      let index = state.eventTickets.findIndex(
        (e) => e.id === action.payload.id
      );
      state.eventTickets[index] = action.payload;
      return state;
    },
    clearEventTickets: (state, action) => {
      state.eventTickets = [];
    },
  },
});

export const {
  setEventTickets,
  addEventTicket,
  clearEventTickets,
  updateEventTicket,
} = EventTicketSlice.actions;
export default EventTicketSlice.reducer;
