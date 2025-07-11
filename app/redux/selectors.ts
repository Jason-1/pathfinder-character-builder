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
export const selectID = (state: RootState) => state.id.id;

export const selectAncestryData = (state: RootState) =>
  state.ancestryData.ancestries;
export const selectAncestryDataLoaded = (state: RootState) =>
  state.ancestryData.isLoaded;
export const selectHeritageData = (state: RootState) =>
  state.heritageData.heritages;
export const selectHeritageDataLoaded = (state: RootState) =>
  state.heritageData.isLoaded;
export const selectBackgroundData = (state: RootState) =>
  state.backgroundData.backgrounds;
export const selectBackgroundDataLoaded = (state: RootState) =>
  state.backgroundData.isLoaded;
export const selectClassData = (state: RootState) => state.classData.classes;
export const selectClassDataLoaded = (state: RootState) =>
  state.classData.isLoaded;
export const selectSubclassData = (state: RootState) =>
  state.subclassData.subclasses;
export const selectSubclassDataLoaded = (state: RootState) =>
  state.subclassData.isLoaded;
export const selectArmourData = (state: RootState) => state.armourData.armour;
export const selectArmourDataLoaded = (state: RootState) =>
  state.armourData.isLoaded;
