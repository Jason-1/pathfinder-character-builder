import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heritage: "Select Heritage",
};

const heritageSlice = createSlice({
  name: "heritage",
  initialState: initialState,
  reducers: {
    setHeritage: (state, action) => {
      state.heritage = action.payload.heritage;
    },
  },
});

export const { setHeritage } = heritageSlice.actions;
export default heritageSlice.reducer;
