import { heritageType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeritageDataState {
  heritages: heritageType[];
  isLoaded: boolean;
}

const initialState: HeritageDataState = {
  heritages: [],
  isLoaded: false,
};

const heritageDataSlice = createSlice({
  name: "heritageData",
  initialState,
  reducers: {
    setHeritageData: (state, action: PayloadAction<heritageType[]>) => {
      state.heritages = action.payload;
      state.isLoaded = true;
    },
    clearHeritageData: (state) => {
      state.heritages = [];
      state.isLoaded = false;
    },
  },
});

export const { setHeritageData, clearHeritageData } = heritageDataSlice.actions;
export default heritageDataSlice.reducer;
