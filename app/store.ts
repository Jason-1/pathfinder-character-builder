import { configureStore } from "@reduxjs/toolkit";
import levelSlice from "./Slices/levelSlice";
import ancestrySlice from "./Slices/ancestrySlice";
import heritageSlice from "./Slices/heritageSlice";
import classSlice from "./Slices/classSlice";
import backgroundSlice from "./Slices/backgroundSlice";

export const store = configureStore({
  reducer: {
    level: levelSlice,
    ancestry: ancestrySlice,
    heritage: heritageSlice,
    class: classSlice,
    background: backgroundSlice,
  },
});
