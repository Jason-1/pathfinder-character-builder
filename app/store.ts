import { configureStore } from "@reduxjs/toolkit";
import levelSlice from "./Slices/levelSlice";

export const store = configureStore({
  reducer: {
    level: levelSlice,
  },
});
