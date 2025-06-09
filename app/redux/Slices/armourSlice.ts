import { createSlice } from "@reduxjs/toolkit";
import { initialArmourState } from "../initialStates";

const initialState = {
  armour: initialArmourState,
};

const armourSlice = createSlice({
  name: "armour",
  initialState: initialState,
  reducers: {
    setArmour: (state, action) => {
      state.armour = action.payload;
    },
  },
});

export const { setArmour } = armourSlice.actions;
export default armourSlice.reducer;
