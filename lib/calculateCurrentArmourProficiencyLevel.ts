import { armourTypes } from "@/types";
import calculateCurrentArmourProficiencyBonus from "./calculateCurrentArmourProficiencyBonus";
import { useSelector } from "react-redux";
import { Classes } from "@/data";

export default function calculateCurrentArmourProficiencyLevel(
  armourType: armourTypes
): string {
  const selectedClass = useSelector(
    (state: { class: { class: string } }) => state.class.class
  );
  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  if (!selectedClassData) {
    return "U";
  }

  const proficiency = calculateCurrentArmourProficiencyBonus(armourType);
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
}
