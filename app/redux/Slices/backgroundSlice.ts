import { createSlice } from "@reduxjs/toolkit";
import { initialBackgroundState } from "../initialStates";

const initialState = {
  background: initialBackgroundState,
};

const backgroundSlice = createSlice({
  name: "background",
  initialState: initialState,
  reducers: {
    setBackground: (state, action) => {
      state.background = action.payload;
    },
  },
});

export const { setBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;
