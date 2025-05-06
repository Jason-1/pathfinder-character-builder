import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  freeArchetype: false,
};

const freeArchetypeSlice = createSlice({
  name: "freeArchetype",
  initialState: initialState,
  reducers: {
    toggleFreeArchetype: (state) => {
      state.freeArchetype = !state.freeArchetype;
    },
    setFreeArchetype: (state, action) => {
      state.freeArchetype = action.payload.freeArchetype;
    },
  },
});

export const { setFreeArchetype, toggleFreeArchetype } =
  freeArchetypeSlice.actions;
export default freeArchetypeSlice.reducer;
