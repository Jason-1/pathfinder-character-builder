import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weapon: "Fist",
};

const weaponSlice = createSlice({
  name: "weapon",
  initialState: initialState,
  reducers: {
    setWeapon: (state, action) => {
      state.weapon = action.payload.weapon;
    },
  },
});

export const { setWeapon } = weaponSlice.actions;
export default weaponSlice.reducer;
