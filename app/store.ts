import { configureStore } from "@reduxjs/toolkit";
import levelSlice from "./Slices/levelSlice";
import ancestrySlice from "./Slices/ancestrySlice";
import heritageSlice from "./Slices/heritageSlice";
import classSlice from "./Slices/classSlice";
import backgroundSlice from "./Slices/backgroundSlice";
import subclassSlice from "./Slices/subclassSlice";
import freeArchetypeSlice from "./Slices/freeArchetypeSlice";
import ancestralParagonSlice from "./Slices/ancestralParagonSlice";

export const store = configureStore({
  reducer: {
    level: levelSlice,
    ancestry: ancestrySlice,
    heritage: heritageSlice,
    class: classSlice,
    background: backgroundSlice,
    subclass: subclassSlice,
    freeArchetype: freeArchetypeSlice,
    ancestralParagon: ancestralParagonSlice,
  },
});
