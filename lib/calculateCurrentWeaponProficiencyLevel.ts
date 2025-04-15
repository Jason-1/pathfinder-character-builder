import { ClassType, weaponTypes } from "@/types";
import calculateCurrentWeaponProficiencyBonus from "./calculateCurrentWeaponProficiencyBonus";

export default function calculateCurrentWeaponProficiencyLevel(
  weaponType: weaponTypes,
  currentLevel: number,
  selectedClassData?: ClassType
): string {
  if (!selectedClassData) {
    return "U";
  }

  const proficiency = calculateCurrentWeaponProficiencyBonus(
    weaponType,
    currentLevel,
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
