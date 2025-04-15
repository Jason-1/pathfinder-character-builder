import { armourTypes, ClassType } from "@/types";

export default function calculateCurrentArmourProficiencyBonus(
  armourType: armourTypes,
  selectedLevel: number,
  selectedClassData?: ClassType
): number {
  if (!selectedClassData) {
    return 0;
  }

  let proficiency = 0;

  selectedClassData.defences[armourType].forEach((level) => {
    if (level <= selectedLevel) {
      proficiency += 2;
    }
  });

  return proficiency;
}
