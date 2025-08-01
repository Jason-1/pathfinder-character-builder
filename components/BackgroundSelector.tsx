"use client";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setBackground } from "@/app/redux/Slices/backgroundSlice";
import { resetAllSkillBoostsAtLevel } from "@/app/redux/Slices/selectedSkillsSlice";
import SelectorDialog from "./SelectorDialog";
import { BackgroundType } from "@/types";
import {
  selectBackground,
  selectBackgroundData,
  selectBackgroundDataLoaded,
} from "@/app/redux/selectors";
import { getBackgrounds } from "@/server/actions/get-all-backgrounds";
import { useAction } from "next-safe-action/hooks";
import { initialBackgroundState } from "@/app/redux/initialStates";
import { resetSpecificAttributeBoost } from "@/app/redux/Slices/attributeBoostCategoriesSlice";

const BackgroundSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const backgroundData = useSelector(selectBackgroundData);
  const backgroundDataLoaded = useSelector(selectBackgroundDataLoaded);

  const selectedBackground = useSelector(selectBackground);

  //------------------------------------------------------------------------------//

  const [highlightedBackground, setHighlightedBackground] = React.useState<
    BackgroundType | undefined
  >(undefined);

  //------------------------------------------------------------------------------//

  const handleChangeBackground = (backgroundString: string) => {
    const backgroundItem = backgroundData.find(
      (item) => item.name === backgroundString
    );
    if (backgroundItem) {
      //When a Background is set also reset skill proficiencies for it
      dispatch(setBackground(backgroundItem));
      dispatch(resetAllSkillBoostsAtLevel({ currentLevel: -1 }));
      dispatch(resetSpecificAttributeBoost("Background"));
    }
  };

  if (!backgroundDataLoaded) {
    return (
      <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
        <div className="border rounded-sm p-2 w-full text-center text-gray-500">
          Background data not loaded
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
      <SelectorDialog
        className="border rounded-sm hover:border-red-700 p-2 w-full"
        itemType="Background"
        selectedItem={selectedBackground.name}
        data={backgroundData}
        highlightedItem={
          highlightedBackground ?? backgroundData[0] ?? initialBackgroundState
        }
        onItemClick={handleChangeBackground}
        setHighlightedItem={setHighlightedBackground}
      >
        <p className="flex flex-col">
          <span>Attributes:</span>
          <span>{highlightedBackground?.attributes.join(", ")}</span>
        </p>
        <p className="flex flex-col">
          <span>Skills:</span>
          <span>{highlightedBackground?.skills.join(", ")}</span>
        </p>
      </SelectorDialog>
    </div>
  );
};

export default BackgroundSelector;
