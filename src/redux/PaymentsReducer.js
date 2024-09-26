import { CaseReducer, createSlice } from "@reduxjs/toolkit"

export const PaymentSlice = createSlice({
  name: "payments",
  initialState: {
    plans: [],
  },
  reducers: {
    setPlans: (state, action) => {
        state.plans = action.payload
    },
  },
})

export const { setPlans } = PaymentSlice.actions;
export default PaymentSlice.reducer;
