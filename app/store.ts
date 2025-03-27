import { configureStore } from "@reduxjs/toolkit";
import levelSlice from "./levelSlice";

export const store = configureStore({
  reducer: {
    level: levelSlice,
  },
});
