import { CaseReducer, createSlice } from "@reduxjs/toolkit"

export const EventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload
    },

    addEvent: (state, action) => {
      state.events.push(action.payload)
      state.events.sort(function (a, b) {
        var keyA = new Date(a.eventDate),
          keyB = new Date(b.eventDate)
        // Compare the 2 dates
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
        return 0
      })
    },

    modifyEvent: (state, action) => {
      let index = state.events.findIndex((e) => e.id === action.payload.id)
      state.events[index] = action.payload
      return state
    },
    updateEventSetting: (state, action) => {
      const { eventSetting, eventId } = action.payload
      const index = state.events.findIndex((item) => {
        return item.id === eventId
      })

      if (state.events[index]) {
        state.events[index].organizersSetting = [eventSetting]
      }

      return state
    },
  },
})

export const setEvents = EventsSlice.actions.setEvents
export const addEvent = EventsSlice.actions.addEvent
export const modifyEvent = EventsSlice.actions.modifyEvent
export const updateEventSetting = EventsSlice.actions.updateEventSetting
export default EventsSlice.reducer
