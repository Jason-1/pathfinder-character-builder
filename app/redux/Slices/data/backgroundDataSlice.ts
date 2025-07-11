import { BackgroundType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BackgroundDataState {
  backgrounds: BackgroundType[];
  isLoaded: boolean;
}

const initialState: BackgroundDataState = {
  backgrounds: [],
  isLoaded: false,
};

const backgroundDataSlice = createSlice({
  name: "backgroundData",
  initialState,
  reducers: {
    setBackgroundData: (state, action: PayloadAction<BackgroundType[]>) => {
      state.backgrounds = action.payload;
      state.isLoaded = true;
    },
    clearBackgroundData: (state) => {
      state.backgrounds = [];
      state.isLoaded = false;
    },
  },
});

export const { setBackgroundData, clearBackgroundData } =
  backgroundDataSlice.actions;
export default backgroundDataSlice.reducer;
