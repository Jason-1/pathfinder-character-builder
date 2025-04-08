import { armourTypes, ClassType } from "@/types";

export default function calculateArmourProficiencyBonus(
  armourType: armourTypes,
  selectedClassData: ClassType,
  currentLevel: number
): number {
  if (!selectedClassData) {
    return 0;
  }

  let proficiency = 0;

  selectedClassData.defences[armourType].forEach((level) => {
    if (level <= currentLevel) {
      proficiency += 2;
    }
  });

  return proficiency;
}
