import { CaseReducer, createSlice } from "@reduxjs/toolkit"

export const invitedSlice = createSlice({
  name: "Invite",
  initialState: {
    invitedUsers: [],
  },
  reducers: {
    setInvitedUsers: (state, action) => {
      state.invitedUsers = action.payload
      return state
    },

    addNewInvitedUser: (state, action) => {
      state.invitedUsers.unshift(action.payload)
    },

    clearInvitedList: (state, action) => {
      state.invitedUsers = []
    },
  },
})

const { actions, reducer } = invitedSlice
export const { setInvitedUsers, addNewInvitedUser, clearInvitedList } = actions
export default reducer
