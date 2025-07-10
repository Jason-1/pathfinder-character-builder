import { ClassType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClassDataState {
  classes: ClassType[];
  isLoaded: boolean;
}

const initialState: ClassDataState = {
  classes: [],
  isLoaded: false,
};

const classDataSlice = createSlice({
  name: "classData",
  initialState,
  reducers: {
    setClassData: (state, action: PayloadAction<ClassType[]>) => {
      state.classes = action.payload;
      state.isLoaded = true;
    },
    clearClassData: (state) => {
      state.classes = [];
      state.isLoaded = false;
    },
  },
});

export const { setClassData, clearClassData } = classDataSlice.actions;
export default classDataSlice.reducer;
