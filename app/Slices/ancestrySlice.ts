import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ancestry: "Human",
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
