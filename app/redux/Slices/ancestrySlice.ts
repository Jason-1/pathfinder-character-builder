import { createSlice } from "@reduxjs/toolkit";
import { initialAncestryState } from "../initialStates";

const initialState = {
  ancestry: initialAncestryState,
};

const ancestrySlice = createSlice({
  name: "ancestry",
  initialState: initialState,
  reducers: {
    setAncestry: (state, action) => {
      state.ancestry = action.payload;
    },
  },
});

export const { setAncestry } = ancestrySlice.actions;
export default ancestrySlice.reducer;
