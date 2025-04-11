import { Classes } from "@/data";
import { weaponTypes } from "@/types";
import { useSelector } from "react-redux";

export default function calculateCurrentWeaponProficiencyBonus(
  weaponType: weaponTypes
): number {
  const selectedClass = useSelector(
    (state: { class: { class: string } }) => state.class.class
  );
  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );
  const selectedLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );

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
