import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const nameSlice = createSlice({
  name: "name",
  initialState: initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = nameSlice.actions;
export default nameSlice.reducer;
