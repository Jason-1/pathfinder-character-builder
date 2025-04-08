import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  potency: 0,
};

const potencySlice = createSlice({
  name: "potency",
  initialState: initialState,
  reducers: {
    setPotency: (state, action) => {
      state.potency = action.payload.potency;
    },
  },
});

export const { setPotency } = potencySlice.actions;
export default potencySlice.reducer;
