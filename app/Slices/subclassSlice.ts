import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subclass: "Select Ancestry",
};

const subclassSlice = createSlice({
  name: "subclass",
  initialState: initialState,
  reducers: {
    setSubclass: (state, action) => {
      state.subclass = action.payload.subclass;
    },
  },
});

export const { setSubclass } = subclassSlice.actions;
export default subclassSlice.reducer;
