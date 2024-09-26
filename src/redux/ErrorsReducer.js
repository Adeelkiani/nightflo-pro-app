import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  errorVisible: false,
  message: "",
  title: "",
  buttonText: "",
  isError: false,
  successVisible: false,
};

export const ErrorsReducer = createSlice({
  name: "popupError",
  initialState: defaultState,
  reducers: {
    setError: (state, action) => {
      const newState = { ...state, ...action.payload, isError: true };
      return newState;
    },

    setMessage: (state, action) => {
      const newState = { ...state, ...action.payload, isError: false };
      return newState;
    },

    clearError: (state, action) => {
      return { ...defaultState };
    },
  },
});
export const setError = ErrorsReducer.actions.setError;
export const clearError = ErrorsReducer.actions.clearError;
export const setMessage = ErrorsReducer.actions.setMessage;
export default ErrorsReducer.reducer;
