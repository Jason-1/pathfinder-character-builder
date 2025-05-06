import { InitialAttributeBoosts } from "@/data";
import { AttributeBoostsType, AttributesType, Category } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AttributeBoostsType[] = InitialAttributeBoosts;

const attributeBoostCategoriesSlice = createSlice({
  name: "attributeBoostCategories",
  initialState: initialState,
  reducers: {
    setAttributeBoost: (
      state,
      action: PayloadAction<{ boostType: Category; attribute: AttributesType }>
    ) => {
      const { boostType, attribute } = action.payload;

      const boostCategory = state.find(
        (category) => category.name === boostType
      );
      if (boostCategory) {
        boostCategory.boosts.push(attribute);
      }
    },
    removeAttributeBoost: (
      state,
      action: PayloadAction<{ boostType: Category; attribute: AttributesType }>
    ) => {
      const { boostType, attribute } = action.payload;

      const boostCategory = state.find(
        (category) => category.name === boostType
      );
      if (boostCategory) {
        const index = boostCategory.boosts.indexOf(attribute);
        if (index !== -1) {
          boostCategory.boosts.splice(index, 1);
        }
      }
    },
    resetAttributeBoosts: () => {
      return initialState;
    },
    resetSpecificAttributeBoost: (state, action) => {
      const boostType = action.payload;
      const boostCategory = state.find(
        (category) => category.name === boostType
      );
      if (boostCategory) {
        boostCategory.boosts = [];
      }
    },
  },
});

export const {
  setAttributeBoost,
  removeAttributeBoost,
  resetAttributeBoosts,
  resetSpecificAttributeBoost,
} = attributeBoostCategoriesSlice.actions;
export default attributeBoostCategoriesSlice.reducer;
