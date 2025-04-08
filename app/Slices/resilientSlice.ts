import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resilient: 0,
};

const resilientSlice = createSlice({
  name: "resilient",
  initialState: initialState,
  reducers: {
    setResilient: (state, action) => {
      state.resilient = action.payload.resilient;
    },
  },
});

export const { setResilient } = resilientSlice.actions;
export default resilientSlice.reducer;
