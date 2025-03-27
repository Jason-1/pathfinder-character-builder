import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  class: "Select Class",
};

const classSlice = createSlice({
  name: "class",
  initialState: initialState,
  reducers: {
    setClass: (state, action) => {
      state.class = action.payload.class;
    },
  },
});

export const { setClass } = classSlice.actions;
export default classSlice.reducer;
