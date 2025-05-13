import { RootState } from "../store";

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
export const selectAttributeBoostCategories = (state: RootState) =>
  state.attributeBoostCategories;
export const selectFeats = (state: RootState) => state.selectedFeats;
export const selectSkills = (state: RootState) => state.selectedSkills;
export const selectArmour = (state: RootState) => state.armour.armour;
export const selectPotency = (state: RootState) => state.potency.potency;
export const selectResilient = (state: RootState) => state.resilient.resilient;
export const selectShield = (state: RootState) => state.shield.shield;
export const selectShieldReinforcing = (state: RootState) =>
  state.shieldReinforcing.reinforcing;
export const selectWeapon = (state: RootState) => state.weapon.weapon;
export const selectSpells = (state: RootState) => state.selectedSpells;
