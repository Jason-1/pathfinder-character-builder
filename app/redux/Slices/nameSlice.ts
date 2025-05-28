import { createSlice } from "@reduxjs/toolkit";

export const initialNameState = {
  name: "",
};

const classSlice = createSlice({
  name: "name",
  initialState: initialNameState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = classSlice.actions;
export default classSlice.reducer;
