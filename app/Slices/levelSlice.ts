import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: 1,
};

const levelSlice = createSlice({
  name: "level",
  initialState: initialState,
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload.level;
    },
  },
});

export const { setLevel } = levelSlice.actions;
export default levelSlice.reducer;
