import { armourItemType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArmourDataState {
  armour: armourItemType[];
  isLoaded: boolean;
}

const initialState: ArmourDataState = {
  armour: [],
  isLoaded: false,
};

const armourDataSlice = createSlice({
  name: "armourData",
  initialState,
  reducers: {
    setArmourData: (state, action: PayloadAction<armourItemType[]>) => {
      state.armour = action.payload;
      state.isLoaded = true;
    },
    clearArmourData: (state) => {
      state.armour = [];
      state.isLoaded = false;
    },
  },
});

export const { setArmourData, clearArmourData } = armourDataSlice.actions;
export default armourDataSlice.reducer;
