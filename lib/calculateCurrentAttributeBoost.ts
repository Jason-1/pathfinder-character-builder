import { AttributeBoostsType, AttributesType } from "@/types";
import { useSelector } from "react-redux";

export default function calculateCurrentAttributeBoost(
  attributeName: AttributesType
): number {
  const attributeBoosts = useSelector(
    (state: { attributeBoostCategories: AttributeBoostsType[] }) =>
      state.attributeBoostCategories
  );
  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );

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
