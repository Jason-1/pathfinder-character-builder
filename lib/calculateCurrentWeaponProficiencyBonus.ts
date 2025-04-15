import { ClassType, weaponTypes } from "@/types";

export default function calculateCurrentWeaponProficiencyBonus(
  weaponType: weaponTypes,
  selectedLevel: number,
  selectedClassData?: ClassType
): number {
  if (!selectedClassData) {
    return 0;
  }

  let proficiency = 0;

  selectedClassData.attacks[weaponType].forEach((level) => {
    if (level <= selectedLevel) {
      proficiency += 2;
    }
  });

  return proficiency;
}
