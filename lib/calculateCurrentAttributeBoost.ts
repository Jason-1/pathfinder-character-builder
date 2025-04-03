import { AttributeBoostsType, AttributesType } from "@/types";

export default function calculateCurrentAttributeBoost(
  attributeBoosts: AttributeBoostsType[],
  selectedLevel: number,
  attributeName: AttributesType
): number {
  let i = 0;
  let partial = false;
  attributeBoosts.forEach((boost) => {
    if (boost.boosts.includes(attributeName)) {
      if (
        (boost.name === "Level5" && selectedLevel < 5) ||
        (boost.name === "Level10" && selectedLevel < 10) ||
        (boost.name === "Level15" && selectedLevel < 15) ||
        (boost.name === "Level20" && selectedLevel < 20)
      ) {
        return;
      }
      if (i >= 4 && !partial) {
        partial = true;
      } else {
        i++;
        partial = false;
      }
    }
  });
  return i;
}
