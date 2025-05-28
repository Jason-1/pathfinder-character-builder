import { configureStore } from "@reduxjs/toolkit";
import nameSlice from "./redux/Slices/nameSlice";
import levelSlice from "./redux/Slices/levelSlice";
import ancestrySlice from "./redux/Slices/ancestrySlice";
import heritageSlice from "./redux/Slices/heritageSlice";
import classSlice from "./redux/Slices/classSlice";
import backgroundSlice from "./redux/Slices/backgroundSlice";
import subclassSlice from "./redux/Slices/subclassSlice";
import freeArchetypeSlice from "./redux/Slices/freeArchetypeSlice";
import ancestralParagonSlice from "./redux/Slices/ancestralParagonSlice";
import attributeBoostCategoriesSlice from "./redux/Slices/attributeBoostCategoriesSlice";
import selectedFeatsSlice from "./redux/Slices/selectedFeatsSlice";
import selectedSkillsSlice from "./redux/Slices/selectedSkillsSlice";
import armourSlice from "./redux/Slices/armourSlice";
import resilientSlice from "./redux/Slices/resilientSlice";
import shieldSlice from "./redux/Slices/shieldSlice";
import weaponSlice from "./redux/Slices/weaponSlice";
import armourPotencySlice from "./redux/Slices/armourPotencySlice";
import selectedSpellsSlice from "./redux/Slices/selectedSpellsSlice";
import shieldReinforcingSlice from "./redux/Slices/shieldReinforcingSlice";
import idSlice from "./redux/Slices/idSlice";

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
    potency: armourPotencySlice,
    resilient: resilientSlice,
    shield: shieldSlice,
    shieldReinforcing: shieldReinforcingSlice,
    weapon: weaponSlice,
    selectedSpells: selectedSpellsSlice,
    id: idSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
