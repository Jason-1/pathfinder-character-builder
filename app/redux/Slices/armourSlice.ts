import { armourItemType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  armour: {
    name: "Unarmoured",
    category: "unarmoured",
    ACBonus: 0,
    dexCap: 5,
    strength: 0,
    checkPenalty: 0,
    speedPenalty: 0,
    bulk: "0",
    group: "",
    description: "No Armour",
  } as armourItemType,
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
