import { initialSelectedSpells } from "@/data";
import { selectedSpellsType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: selectedSpellsType[] = initialSelectedSpells;

const selectedSpellsSlice = createSlice({
  name: "selectedSpells",
  initialState: initialState,
  reducers: {
    addSpell: (
      state,
      action: PayloadAction<{
        rank: number;
        spellName: string;
      }>
    ) => {
      const { rank, spellName } = action.payload;

      state
        .find((spellRank) => spellRank.rank === rank)
        ?.spells.push(spellName);
    },

    // Not finished
    removeSpell: (
      state,
      action: PayloadAction<{
        rank: number;
        spellName: string;
      }>
    ) => {
      const { rank, spellName } = action.payload;

      const currentSpellRank = state.find(
        (spellRank) => spellRank.rank === rank
      );
    },
    clearSpells: () => {},
  },
});

export const { addSpell, removeSpell, clearSpells } =
  selectedSpellsSlice.actions;
export default selectedSpellsSlice.reducer;
