import { skillProficiencies } from "@/data";
import { skillProficienciesType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: skillProficienciesType[] = skillProficiencies;

const selectedSkillsSlice = createSlice({
  name: "selectedSkills",
  initialState: initialState,
  reducers: {},
});

export const {} = selectedSkillsSlice.actions;
export default selectedSkillsSlice.reducer;
