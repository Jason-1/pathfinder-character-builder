import { Feats } from "@/data";
import { FeatsType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FeatsType[] = Feats;

const selectedFeatsSlice = createSlice({
  name: "selectedFeats",
  initialState: initialState,
  reducers: {},
});

export const {} = selectedFeatsSlice.actions;
export default selectedFeatsSlice.reducer;
