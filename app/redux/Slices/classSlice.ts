import { createSlice } from "@reduxjs/toolkit";
import { initialClassState } from "../initialStates";

const initialState = {
  class: initialClassState,
};

const classSlice = createSlice({
  name: "class",
  initialState: initialState,
  reducers: {
    setClass: (state, action) => {
      state.class = action.payload;
    },
  },
});

export const { setClass } = classSlice.actions;
export default classSlice.reducer;
