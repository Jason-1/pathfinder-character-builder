import { createSlice } from "@reduxjs/toolkit";
import { shieldReinforcingRunes } from "@/types";

const initialState: { reinforcing: shieldReinforcingRunes } = {
  reinforcing: "None",
};

const shieldReinforcingSlice = createSlice({
  name: "reinforcing",
  initialState: initialState,
  reducers: {
    setReinforcing: (state, action) => {
      state.reinforcing = action.payload.reinforcing;
    },
  },
});

export const { setReinforcing } = shieldReinforcingSlice.actions;
export default shieldReinforcingSlice.reducer;
