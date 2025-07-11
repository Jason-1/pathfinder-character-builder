import { AncestryType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AncestryDataState {
  ancestries: AncestryType[];
  isLoaded: boolean;
}

const initialState: AncestryDataState = {
  ancestries: [],
  isLoaded: false,
};

const ancestryDataSlice = createSlice({
  name: "ancestryData",
  initialState,
  reducers: {
    setAncestryData: (state, action: PayloadAction<AncestryType[]>) => {
      state.ancestries = action.payload;
      state.isLoaded = true;
    },
    clearAncestryData: (state) => {
      state.ancestries = [];
      state.isLoaded = false;
    },
  },
});

export const { setAncestryData, clearAncestryData } = ancestryDataSlice.actions;
export default ancestryDataSlice.reducer;
