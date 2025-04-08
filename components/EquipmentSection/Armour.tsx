import { armourData, Classes } from "@/data";
import { armourTypes } from "@/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainingIcon from "../Icons/TrainingIcon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setArmour } from "@/app/Slices/armourSlice";
import calculateArmourProficiencyBonus from "@/lib/calculateArmourProficiencyBonus";

const Armour = () => {
  const dispatch = useDispatch();

  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );
  const selectedClass = useSelector(
    (state: { class: { class: string } }) => state.class.class
  );
  const selectedArmour = useSelector(
    (state: { armour: { armour: string } }) => state.armour.armour
  );
  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );
  const selectedArmourData = armourData.find(
    (armourItem) => armourItem.name === selectedArmour
  );

  //------------------------------------------------------------------------------//

  const handleSetArmour = (armour: string) => {
    dispatch(setArmour({ armour }));
  };

  const calculateArmourProficiencyLevel = (armourType: armourTypes) => {
    if (!selectedClassData) {
      return "U";
    }

    const proficiency = calculateArmourProficiencyBonus(
      armourType,
      selectedClassData,
      currentLevel
    );
    switch (proficiency) {
      case 0:
        return "U";
      case 2:
        return "T";
      case 4:
        return "E";
      case 6:
        return "M";
      case 8:
        return "L";
      default:
        return "U";
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-2">
          <p>Unarmoured</p>
          <TrainingIcon>
            {calculateArmourProficiencyLevel("unarmoured")}
          </TrainingIcon>
        </div>
        <div className="flex flex-row gap-2">
          <p>Light</p>
          <TrainingIcon>
            {calculateArmourProficiencyLevel("light")}
          </TrainingIcon>
        </div>
        <div className="flex flex-row gap-2">
          <p>Medium</p>
          <TrainingIcon>
            {calculateArmourProficiencyLevel("medium")}
          </TrainingIcon>
        </div>
        <div className="flex flex-row gap-2">
          <p>Heavy</p>
          <TrainingIcon>
            {calculateArmourProficiencyLevel("heavy")}
          </TrainingIcon>
        </div>
      </div>

      <div className="flex flex-row gap-2 mt-8">
        <TrainingIcon>
          {calculateArmourProficiencyLevel(
            selectedArmourData?.type || "unarmoured"
          )}
        </TrainingIcon>
        <Dialog>
          <DialogTrigger>{selectedArmour}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Armour</DialogTitle>
              {armourData.map((armourItem) => (
                <div key={armourItem.name} className="flex flex-row gap-2">
                  <DialogTrigger
                    onClick={() => {
                      handleSetArmour(armourItem.name);
                    }}
                  >
                    {armourItem.name}
                  </DialogTrigger>
                </div>
              ))}
              <DialogDescription>Armour Description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <p>Item Bonus: +{selectedArmourData?.ACBonus}</p>
        <p>Dex Cap +{selectedArmourData?.dexCap}</p>
      </div>
    </div>
  );
};

export default Armour;
