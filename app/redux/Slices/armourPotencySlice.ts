import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  potency: 0,
};

const armourPotencySlice = createSlice({
  name: "potency",
  initialState: initialState,
  reducers: {
    setPotency: (state, action) => {
      state.potency = action.payload.potency;
    },
  },
});

export const { setPotency } = armourPotencySlice.actions;
export default armourPotencySlice.reducer;
