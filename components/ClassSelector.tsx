"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClass } from "@/app/redux/Slices/classSlice";
import { setSubclass } from "@/app/redux/Slices/subclassSlice";
import {
  resetAllSkillBoostsAtLevel,
  resetAllSkillBoostsAtLevels,
} from "@/app/redux/Slices/selectedSkillsSlice";
import SelectorDialog from "./SelectorDialog";
import { ClassType, subclassType } from "@/types";
import {
  selectClass,
  selectClassData,
  selectClassDataLoaded,
  selectSubclass,
  selectSubclassData,
  selectSubclassDataLoaded,
} from "@/app/redux/selectors";
import { clearSpells } from "@/app/redux/Slices/selectedSpellsSlice";
import {
  initialClassState,
  initialSubclassState,
} from "@/app/redux/initialStates";
import { resetSpecificAttributeBoost } from "@/app/redux/Slices/attributeBoostCategoriesSlice";

const ClassSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const classData = useSelector(selectClassData);
  const subclassData = useSelector(selectSubclassData);

  const classesLoaded = useSelector(selectClassDataLoaded);
  const subclassesLoaded = useSelector(selectSubclassDataLoaded);

  const [highlightedClass, setHighlightedClass] = React.useState<
    ClassType | undefined
  >(undefined);
  const [highlightedSubclass, setHighlightedSubclass] = React.useState<
    subclassType | undefined
  >(undefined);

  const selectedClass = useSelector(selectClass);
  const selectedSubclass = useSelector(selectSubclass);

  //------------------------------------------------------------------------------//

  const availableSubclasses = subclassData.filter(
    (subclassItem) => subclassItem.className === selectedClass.name
  );

  //------------------------------------------------------------------------------//

  const handleChangeClass = (classString: string) => {
    //When a class is set also reset skill proficiencies for it

    const classItem = classData.find((item) => item.name === classString);
    if (classItem) {
      dispatch(setClass(classItem));
      dispatch(setSubclass(initialSubclassState));
      dispatch(
        resetAllSkillBoostsAtLevels({
          levels: [-2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        })
      );
      dispatch(resetSpecificAttributeBoost("Class"));
    }
  };

  const handleSetSubclass = (subclassString: string) => {
    const subclassItem = subclassData.find(
      (item) => item.name === subclassString
    );
    if (subclassItem) {
      dispatch(setSubclass(subclassItem));
      dispatch(resetAllSkillBoostsAtLevel({ currentLevel: -2 }));
    }
  };

  const handleClearSpells = () => {
    dispatch(clearSpells());
  };

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

  if (!classesLoaded || !subclassesLoaded) {
    return (
      <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
        <div className="border rounded-sm p-2 w-full text-center text-gray-500">
          Class data not loaded
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
      <SelectorDialog
        className="border rounded-sm hover:border-red-700 p-2 w-full"
        itemType="Class"
        selectedItem={selectedClass.name}
        data={classData}
        highlightedItem={highlightedClass ?? classData[0] ?? initialClassState}
        onItemClick={(item) => {
          handleChangeClass(item);
          handleSetSubclass("Select Subclass");
          handleClearSpells();
        }}
        setHighlightedItem={setHighlightedClass}
      >
        <p className="flex flex-col">
          <span>Attributes:</span>
          <span>{highlightedClass?.attributes.join(", ")}</span>
        </p>
        <p className="flex flex-col">
          <span>HP:</span>
          <span>{highlightedClass?.hp}</span>
        </p>
        <p className="flex flex-col">
          <span>Fortitude:</span>
          <span>
            {trainingLevel(
              highlightedClass?.saves.fortitude.filter(
                (value: number) => value === 1
              ).length || 0
            )}
          </span>
        </p>
        <p className="flex flex-col">
          <span>Reflex:</span>
          <span>
            {trainingLevel(
              highlightedClass?.saves.reflex.filter(
                (value: number) => value === 1
              ).length || 0
            )}
          </span>
        </p>
        <p className="flex flex-col">
          <span>Will:</span>
          <span>
            {trainingLevel(
              highlightedClass?.saves.will.filter(
                (value: number) => value === 1
              ).length || 0
            )}
          </span>
        </p>
      </SelectorDialog>

      <SelectorDialog
        className="border rounded-sm hover:border-red-700 p-2 w-full"
        itemType="Sub-Class"
        selectedItem={selectedSubclass.name}
        data={availableSubclasses}
        highlightedItem={
          highlightedSubclass ?? subclassData[0] ?? initialSubclassState
        }
        onItemClick={(item) => {
          handleSetSubclass(item);
        }}
        setHighlightedItem={setHighlightedSubclass}
      />
    </div>
  );
};

export default ClassSelector;
