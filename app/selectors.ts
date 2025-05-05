import { createSelector } from "reselect";
import { RootState } from "@/app/store";

export const selectName = (state: RootState) => state.name.name;
export const selectLevel = (state: RootState) => state.level.level;
export const selectAncestry = (state: RootState) => state.ancestry.ancestry;
export const selectHeritage = (state: RootState) => state.heritage.heritage;
export const selectClass = (state: RootState) => state.class.class;
export const selectBackground = (state: RootState) =>
  state.background.background;
export const selectSubclass = (state: RootState) => state.subclass.subclass;
export const selectFreeArchetype = (state: RootState) =>
  state.freeArchetype.freeArchetype;
export const selectAncestralParagon = (state: RootState) =>
  state.ancestralParagon.ancestralParagon;
export const selectAttributeBoosts = (state: RootState) =>
  state.attributeBoostCategories;
export const selectSelectedFeats = (state: RootState) => state.selectedFeats;
export const selectSelectedSkills = (state: RootState) => state.selectedSkills;
export const selectArmour = (state: RootState) => state.armour.armour;
export const selectPotency = (state: RootState) => state.potency.potency;
export const selectResilient = (state: RootState) => state.resilient.resilient;
export const selectShield = (state: RootState) => state.shield.shield;
export const selectWeapon = (state: RootState) => state.weapon.weapon;

// Combined selector
export const selectACBreakdownData = createSelector(
  [
    selectLevel,
    selectArmour,
    selectPotency,
    selectShield,
    selectClass,
    selectAttributeBoosts,
  ],
  (
    currentLevel,
    selectedArmour,
    selectedPotency,
    selectedShield,
    selectedClass,
    attributeBoosts
  ) => ({
    currentLevel,
    selectedArmour,
    selectedPotency,
    selectedShield,
    selectedClass,
    attributeBoosts,
  })
);
