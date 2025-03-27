import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ancestry: "Select Ancestry",
};

const ancestrySlice = createSlice({
  name: "ancestry",
  initialState: initialState,
  reducers: {
    setAncestry: (state, action) => {
      state.ancestry = action.payload.ancestry;
    },
  },
});

export const { setAncestry } = ancestrySlice.actions;
export default ancestrySlice.reducer;
