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
        position: number;
      }>
    ) => {
      const { rank, spellName, position } = action.payload;

      // If a spell already exists in that slot, remove it before adding the new one
      if (
        state
          .find((spellRank) => spellRank.rank === rank)
          ?.spells.find((spell) => spell.position === position)
      ) {
        state = selectedSpellsSlice.reducer(
          state,
          removeSpell({ rank, position })
        );
      }
      state
        .find((spellRank) => spellRank.rank === rank)
        ?.spells.push({ name: spellName, position: position });
    },
    removeSpell: (
      state,
      action: PayloadAction<{
        rank: number;
        position: number;
      }>
    ) => {
      const { rank, position } = action.payload;

      const spellRank = state.find((spellRank) => spellRank.rank === rank);

      if (spellRank) {
        const spellPosition = spellRank.spells.indexOf(
          spellRank.spells.find((spell) => spell.position === position) ?? {
            name: "",
            position: -1,
          }
        );
        if (spellPosition !== -1) {
          spellRank.spells.splice(spellPosition, 1);
        }
      }
    },
    clearSpells: (state) => {
      return initialState;
    },
  },
});

export const { addSpell, removeSpell, clearSpells } =
  selectedSpellsSlice.actions;
export default selectedSpellsSlice.reducer;
