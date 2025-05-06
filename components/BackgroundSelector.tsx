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
        itemType="Background"
        selectedItem={selectedBackground}
        data={Backgrounds}
        highlightedItemName={highlightedBackground.name}
        highlightedItemDescription={highlightedBackground.description}
        onItemClick={(item) => handleChangeBackground(item)}
        setHighlightedItem={setHighlightedBackground}
      >
        {" "}
        <div className="mt-4 flex flex-row gap-2 text-xs justify-center">
          <p>Attributes: {highlightedBackground.Attributes.join(", ")}</p>
          <p>Skills: {highlightedBackground.skills.join(", ")}</p>
        </div>
      </SelectorDialog>
    </div>
  );
};

export default BackgroundSelector;
