import { armourTypes, ClassType } from "@/types";
import calculateCurrentArmourProficiencyBonus from "./calculateCurrentArmourProficiencyBonus";

export default function calculateCurrentArmourProficiencyLevel(
  armourType: armourTypes,
  selectedLevel: number,
  selectedClassData?: ClassType
): string {
  if (!selectedClassData) {
    return "U";
  }

  const proficiency = calculateCurrentArmourProficiencyBonus(
    armourType,
    selectedLevel,
    selectedClassData
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
}
