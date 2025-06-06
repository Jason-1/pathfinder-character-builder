"use client";

import React, { useEffect, useState } from "react";

import { Classes, subclasses } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { setClass } from "@/app/redux/Slices/classSlice";
import { setSubclass } from "@/app/redux/Slices/subclassSlice";
import { resetAllSkillBoostsAtLevel } from "@/app/redux/Slices/selectedSkillsSlice";
import SelectorDialog from "./SelectorDialog";
import { ClassType, subclassType } from "@/types";
import { selectClass, selectSubclass } from "@/app/redux/selectors";
import { clearSpells } from "@/app/redux/Slices/selectedSpellsSlice";
import { useAction } from "next-safe-action/hooks";
import { getClasses } from "@/server/actions/get-all-classes";

const ClassSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const [highlightedClass, setHighlightedClass] = React.useState<ClassType>(
    Classes[0]
  );
  const [highlightedSubclass, setHighlightedSubclass] =
    React.useState<subclassType>(subclasses[0]);

  const selectedClass = useSelector(selectClass);
  const selectedSubclass = useSelector(selectSubclass);

  const availableSubclasses = subclasses.filter(
    (subclassItem) => subclassItem.className === selectedClass
  );

  //------------------------------------------------------------------------------//

  const [classData, setClassData] = useState<ClassType[]>([]);

  const { execute: getAllClasses } = useAction(getClasses, {
    onSuccess: (data) => {
      if (data.data) {
        setClassData(
          data.data.map((item: any) => ({
            ...item,
            category: item.category as ClassType[],
          }))
        );
      }
    },
  });

  useEffect(() => {
    getAllClasses();
  }, [getAllClasses]);

  //------------------------------------------------------------------------------//

  const handleChangeClass = (classString: string) => {
    //When a class is set also reset skill proficiencies for it
    dispatch(setClass({ class: classString }));
    dispatch(resetAllSkillBoostsAtLevel({ currentLevel: 0 }));
  };

  const handleSetSubclass = (subclass: string) => {
    dispatch(setSubclass({ subclass: subclass }));
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

  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
      <SelectorDialog
        className="border rounded-sm hover:border-red-700 p-2 w-full"
        itemType="Class"
        selectedItem={selectedClass}
        data={Classes}
        highlightedItem={highlightedClass}
        onItemClick={(item) => {
          handleChangeClass(item);
          handleSetSubclass("Select Subclass");
          handleClearSpells();
        }}
        setHighlightedItem={setHighlightedClass}
      >
        <p className="flex flex-col">
          <span>Attributes:</span>
          <span>{highlightedClass.Attributes.join(", ")}</span>
        </p>
        <p className="flex flex-col">
          <span>HP:</span>
          <span>{highlightedClass.hp}</span>
        </p>
        <p className="flex flex-col">
          <span>Fortitude:</span>
          <span>
            {trainingLevel(
              highlightedClass.saves.fortitude.filter(
                (value: number) => value === 1
              ).length
            )}
          </span>
        </p>
        <p className="flex flex-col">
          <span>Reflex:</span>
          <span>
            {trainingLevel(
              highlightedClass.saves.reflex.filter(
                (value: number) => value === 1
              ).length
            )}
          </span>
        </p>
        <p className="flex flex-col">
          <span>Will:</span>
          <span>
            {trainingLevel(
              highlightedClass.saves.will.filter((value: number) => value === 1)
                .length
            )}
          </span>
        </p>
      </SelectorDialog>

      <SelectorDialog
        className="border rounded-sm hover:border-red-700 p-2 w-full"
        itemType="Sub-Class"
        selectedItem={selectedSubclass}
        data={availableSubclasses}
        highlightedItem={highlightedSubclass}
        onItemClick={(item) => {
          handleSetSubclass(item);
        }}
        setHighlightedItem={setHighlightedSubclass}
      ></SelectorDialog>

      <div>
        {classData.map((classItem) => (
          <div key={classItem.name}>{classItem.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ClassSelector;
