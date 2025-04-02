import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const classSlice = createSlice({
  name: "name",
  initialState: initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = classSlice.actions;
export default classSlice.reducer;
