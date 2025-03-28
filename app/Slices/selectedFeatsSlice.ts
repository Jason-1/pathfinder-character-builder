import { Feats } from "@/data";
import { FeatsType } from "@/types";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const initialState: FeatsType[] = Feats;

const selectedFeatsSlice = createSlice({
  name: "selectedFeats",
  initialState: initialState,
  reducers: {
    updateFeat: (
      state,
      action: PayloadAction<{
        level: number;
        featType: string;
        featName: string;
      }>
    ) => {
      const { level, featType, featName } = action.payload;

      const currentLevel = state.find((feat) => feat.level === level);

      if (currentLevel) {
        currentLevel.feats = currentLevel.feats.map((feat) => {
          if (feat.type === featType) {
            // Return updated feat with new selected value
            return { ...feat, selected: featName };
          }
          // Return original feat if type doesn't match
          return feat;
        });
      }
    },
  },
});

export const { updateFeat } = selectedFeatsSlice.actions;
export default selectedFeatsSlice.reducer;
