import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shield: "None",
};

const shieldSlice = createSlice({
  name: "shield",
  initialState: initialState,
  reducers: {
    setShield: (state, action) => {
      state.shield = action.payload.shield;
    },
  },
});

export const { setShield } = shieldSlice.actions;
export default shieldSlice.reducer;
