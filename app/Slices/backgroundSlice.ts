import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  background: "Select Background",
};

const backgroundSlice = createSlice({
  name: "background",
  initialState: initialState,
  reducers: {
    setBackground: (state, action) => {
      state.background = action.payload.background;
    },
  },
});

export const { setBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;
