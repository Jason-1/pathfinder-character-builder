import { configureStore } from "@reduxjs/toolkit";
import levelSlice from "./Slices/levelSlice";
import ancestrySlice from "./Slices/ancestrySlice";

export const store = configureStore({
  reducer: {
    level: levelSlice,
    ancestry: ancestrySlice,
  },
});
