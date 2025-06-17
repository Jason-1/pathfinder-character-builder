"use client";

import React from "react";

import { Backgrounds } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { setBackground } from "@/app/redux/Slices/backgroundSlice";
import { resetAllSkillBoostsAtLevel } from "@/app/redux/Slices/selectedSkillsSlice";
import SelectorDialog from "./SelectorDialog";
import { BackgroundType } from "@/types";
import { selectBackground } from "@/app/redux/selectors";

const BackgroundSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedBackground = useSelector(selectBackground);

  const [highlightedBackground, setHighlightedBackground] =
    React.useState<BackgroundType>(Backgrounds[0]);

  //------------------------------------------------------------------------------//

  const handleChangeBackground = (background: string) => {
    //When a Background is set also reset skill proficiencies for it
    dispatch(setBackground({ background }));
    dispatch(resetAllSkillBoostsAtLevel({ currentLevel: -1 }));
  };

  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
      <SelectorDialog
        className="border rounded-sm hover:border-red-700 p-2 w-full"
        itemType="Background"
        selectedItem={selectedBackground}
        data={Backgrounds}
        highlightedItem={highlightedBackground}
        onItemClick={(item) => handleChangeBackground(item)}
        setHighlightedItem={setHighlightedBackground}
      >
        <p className="flex flex-col">
          <span>Attributes:</span>
          <span>{highlightedBackground.attributes.join(", ")}</span>
        </p>
        <p className="flex flex-col">
          <span>Skills:</span>
          <span>{highlightedBackground.skills.join(", ")}</span>
        </p>
      </SelectorDialog>
    </div>
  );
};

export default BackgroundSelector;
