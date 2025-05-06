"use client";

import React from "react";

import { Classes, subclasses } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { setClass } from "@/app/redux/Slices/classSlice";
import { setSubclass } from "@/app/redux/Slices/subclassSlice";
import { resetAllSkillBoostsAtLevel } from "@/app/redux/Slices/selectedSkillsSlice";
import SelectorDialog from "./SelectorDialog";
import { ClassType, subclassType } from "@/types";
import { RootState } from "@/app/store";

const ClassSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedClass = useSelector((state: RootState) => state.class.class);
  const selectedSubclass = useSelector(
    (state: RootState) => state.subclass.subclass
  );

  const handleChangeClass = (classString: string) => {
    //When a class is set also reset skill proficiencies for it
    dispatch(setClass({ class: classString }));
    dispatch(resetAllSkillBoostsAtLevel({ currentLevel: 0 }));
  };

  const handleSetSubclass = (subclass: string) => {
    dispatch(setSubclass({ subclass: subclass }));
  };
  const availableSubclasses = subclasses.filter(
    (subclassItem) => subclassItem.className === selectedClass
  );
  const [highlightedClass, setHighlightedClass] = React.useState<ClassType>(
    Classes[0]
  );
  const [highlightedSubclass, setHighlightedSubclass] =
    React.useState<subclassType>(subclasses[0]);

  //------------------------------------------------------------------------------//

  const trainingLevel = (value: number) => {
    switch (value) {
      case 0:
        return "Untrained";
      case 1:
        return "Trained";
      case 2:
        return "Expert";
      case 3:
        return "Master";
      case 4:
        return "Legendary";
      default:
        return "Untrained";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
      <SelectorDialog
        itemType="Class"
        selectedItem={selectedClass}
        data={Classes}
        highlightedItemName={highlightedClass.name}
        highlightedItemDescription={highlightedClass.description}
        onItemClick={(item) => {
          handleChangeClass(item);
          handleSetSubclass("Select Subclass");
        }}
        setHighlightedItem={setHighlightedClass}
      >
        <div className="mt-4 flex flex-row gap-2 text-xs justify-center">
          <p>Attributes: {highlightedClass.Attributes.join(", ")}</p>
          <p>hp: {highlightedClass.hp}</p>
          <p>
            Fortitude:{" "}
            {trainingLevel(
              highlightedClass.saves.fortitude.filter(
                (value: number) => value === 1
              ).length
            )}{" "}
          </p>
          <p>
            Reflex:{" "}
            {trainingLevel(
              highlightedClass.saves.reflex.filter(
                (value: number) => value === 1
              ).length
            )}{" "}
          </p>
          <p>
            Will:{" "}
            {trainingLevel(
              highlightedClass.saves.will.filter((value: number) => value === 1)
                .length
            )}
          </p>
        </div>
      </SelectorDialog>

      <SelectorDialog
        itemType="Sub-Class"
        selectedItem={selectedSubclass}
        data={availableSubclasses}
        highlightedItemName={highlightedSubclass.name}
        highlightedItemDescription={highlightedSubclass.description}
        onItemClick={(item) => {
          handleSetSubclass(item);
        }}
        setHighlightedItem={setHighlightedSubclass}
      ></SelectorDialog>
    </div>
  );
};

export default ClassSelector;
