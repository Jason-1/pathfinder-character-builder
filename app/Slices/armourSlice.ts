import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  armour: "Unarmoured",
};

const armourSlice = createSlice({
  name: "armour",
  initialState: initialState,
  reducers: {
    setArmour: (state, action) => {
      state.armour = action.payload.armour;
    },
  },
});

export const { setArmour } = armourSlice.actions;
export default armourSlice.reducer;
