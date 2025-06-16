import { createSlice } from "@reduxjs/toolkit";
import { initialHeritageState } from "../initialStates";

const initialState = {
  heritage: initialHeritageState,
};

const heritageSlice = createSlice({
  name: "heritage",
  initialState: initialState,
  reducers: {
    setHeritage: (state, action) => {
      state.heritage = action.payload;
    },
  },
});

export const { setHeritage } = heritageSlice.actions;
export default heritageSlice.reducer;
