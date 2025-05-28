import { createSlice } from "@reduxjs/toolkit";

export const initialNameState = {
  name: "",
};

const nameSlice = createSlice({
  name: "name",
  initialState: initialNameState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = nameSlice.actions;
export default nameSlice.reducer;
