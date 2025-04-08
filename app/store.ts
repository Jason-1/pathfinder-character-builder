import { configureStore } from "@reduxjs/toolkit";
import nameSlice from "./Slices/nameSlice";
import levelSlice from "./Slices/levelSlice";
import ancestrySlice from "./Slices/ancestrySlice";
import heritageSlice from "./Slices/heritageSlice";
import classSlice from "./Slices/classSlice";
import backgroundSlice from "./Slices/backgroundSlice";
import subclassSlice from "./Slices/subclassSlice";
import freeArchetypeSlice from "./Slices/freeArchetypeSlice";
import ancestralParagonSlice from "./Slices/ancestralParagonSlice";
import attributeBoostCategoriesSlice from "./Slices/attributeBoostCategoriesSlice";
import selectedFeatsSlice from "./Slices/selectedFeatsSlice";
import selectedSkillsSlice from "./Slices/selectedSkillsSlice";
import armourSlice from "./Slices/armourSlice";
import potencySlice from "./Slices/potencySlice";
import resilientSlice from "./Slices/resilientSlice";

export const store = configureStore({
  reducer: {
    name: nameSlice,
    level: levelSlice,
    ancestry: ancestrySlice,
    heritage: heritageSlice,
    class: classSlice,
    background: backgroundSlice,
    subclass: subclassSlice,
    freeArchetype: freeArchetypeSlice,
    ancestralParagon: ancestralParagonSlice,
    attributeBoostCategories: attributeBoostCategoriesSlice,
    selectedFeats: selectedFeatsSlice,
    selectedSkills: selectedSkillsSlice,
    armour: armourSlice,
    potency: potencySlice,
    resilient: resilientSlice,
  },
});
