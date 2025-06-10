import { createSlice } from "@reduxjs/toolkit";
import { initialSubclassState } from "../initialStates";

const initialState = {
  subclass: initialSubclassState,
};

const subclassSlice = createSlice({
  name: "subclass",
  initialState: initialState,
  reducers: {
    setSubclass: (state, action) => {
      state.subclass = action.payload;
    },
  },
});

export const { setSubclass } = subclassSlice.actions;
export default subclassSlice.reducer;
