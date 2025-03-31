import { skillProficiencies } from "@/data";
import { skillProficienciesType, skillTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: skillProficienciesType[] = skillProficiencies;

const selectedSkillsSlice = createSlice({
  name: "selectedSkills",
  initialState: initialState,
  reducers: {
    updateSkillBoost: (
      state,
      action: PayloadAction<{ skill: skillTypes | ""; currentLevel: number }>
    ) => {
      const { skill, currentLevel } = action.payload;

      state.forEach((skillBoost) => {
        if (skillBoost.skill === skill) {
          skillBoost.LevelsBoosted = skillBoost.LevelsBoosted.includes(
            currentLevel
          )
            ? skillBoost.LevelsBoosted.filter((level) => level < currentLevel)
            : [
                ...skillBoost.LevelsBoosted.filter(
                  (level) => level <= currentLevel
                ),
                currentLevel,
              ].sort((a, b) => a - b);
        }
      });
    },
    updateIntelligenceSkillBoost: (
      state,
      action: PayloadAction<{ skill: skillTypes | ""; currentLevel: number }>
    ) => {
      const { skill, currentLevel } = action.payload;

      state.forEach((skillBoost) => {
        if (skillBoost.skill === skill) {
          skillBoost.IntBoost =
            skillBoost.IntBoost === currentLevel ? null : currentLevel;

          // Reset levels >= currentLevel only for the current skill
          skillBoost.LevelsBoosted = skillBoost.LevelsBoosted.filter(
            (level) => level < currentLevel
          );
        }
      });
    },

    resetAllSkillBoosts: () => {
      return skillProficiencies;
    },

    resetAllIntelligenceBoosts: (state) => {
      state.forEach((skillBoost) => {
        skillBoost.IntBoost = null;
      });
    },
  },
});

export const {
  updateSkillBoost,
  updateIntelligenceSkillBoost,
  resetAllSkillBoosts,
  resetAllIntelligenceBoosts,
} = selectedSkillsSlice.actions;
export default selectedSkillsSlice.reducer;
