import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ancestralParagon: false,
};

const ancestralParagonSlice = createSlice({
  name: "ancestralParagon",
  initialState: initialState,
  reducers: {
    toggleAncestralParagon: (state) => {
      state.ancestralParagon = !state.ancestralParagon;
    },
    setAncestralParagon: (state, action) => {
      state.ancestralParagon = action.payload.ancestralParagon;
    },
  },
});

export const { toggleAncestralParagon, setAncestralParagon } =
  ancestralParagonSlice.actions;
export default ancestralParagonSlice.reducer;
