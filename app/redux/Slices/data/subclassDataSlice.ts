import { subclassType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubclassDataState {
  subclasses: subclassType[];
  isLoaded: boolean;
}

const initialState: SubclassDataState = {
  subclasses: [],
  isLoaded: false,
};

const subclassDataSlice = createSlice({
  name: "subclassData",
  initialState,
  reducers: {
    setSubclassData: (state, action: PayloadAction<subclassType[]>) => {
      state.subclasses = action.payload;
      state.isLoaded = true;
    },
    clearSubclassData: (state) => {
      state.subclasses = [];
      state.isLoaded = false;
    },
  },
});

export const { setSubclassData, clearSubclassData } = subclassDataSlice.actions;
export default subclassDataSlice.reducer;
