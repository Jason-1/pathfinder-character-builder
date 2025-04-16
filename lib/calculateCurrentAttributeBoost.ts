import { AttributeBoostsType, AttributesType } from "@/types";

export default function calculateCurrentAttributeBoost(
  attributeName: AttributesType,
  currentLevel: number,
  attributeBoosts?: AttributeBoostsType[]
): number {
  if (!attributeBoosts) {
    return 0;
  }
  let i = 0;
  let partial = false;
  attributeBoosts.forEach((boost) => {
    if (boost.boosts.includes(attributeName)) {
      if (
        (boost.name === "Level5" && currentLevel < 5) ||
        (boost.name === "Level10" && currentLevel < 10) ||
        (boost.name === "Level15" && currentLevel < 15) ||
        (boost.name === "Level20" && currentLevel < 20)
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
