import { AttributeBoostsType, skillProficienciesType } from "@/types";
import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DiceRoller from "./DiceRoller";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";

const SkillShowcase: React.FC = ({}) => {
  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );
  const selectedSkills = useSelector(
    (state: { selectedSkills: skillProficienciesType[] }) =>
      state.selectedSkills
  );
  const attributeBoosts = useSelector(
    (state: { attributeBoostCategories: AttributeBoostsType[] }) =>
      state.attributeBoostCategories
  );

  //------------------------------------------------------------------------------//

  function findTrainingLevel(skill: skillProficienciesType) {
    const intTraining = skill.IntBoost ? 1 : 0;
    const numericalTrainingLevel = skill.LevelsBoosted.filter(
      (level) => level <= currentLevel
    ).length;
    const currentTrainingLevel = numericalTrainingLevel + intTraining;

    switch (currentTrainingLevel) {
      case 0:
        return "Untrained";
      case 1:
        return "Trained";
      case 2:
        return "Expert";
      case 3:
        return "Master";
      case 4:
        return "Legendary";
      default:
        return "Untrained";
    }
  }

  const calculateSkillModifier = (skill: skillProficienciesType) => {
    let skillModifier = 0;

    let proficiency =
      skill.LevelsBoosted.filter((level) => level <= currentLevel).length * 2;

    //if an int boost is applied to the skill, add 1 to the proficiency
    if (skill.IntBoost) {
      proficiency++;
    }

    skillModifier += proficiency;

    //if the skill is trained, add the current level to the proficiency
    if (proficiency > 0) {
      skillModifier += currentLevel;
    }

    const abilityModifier = calculateCurrentAttributeBoost(skill.attribute);

    skillModifier += abilityModifier;

    return skillModifier;
  };

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Skill</TableHead>
          <TableHead>Modifier</TableHead>
          <TableHead>Proficiency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedSkills.map((skill) => (
          <TableRow key={skill.skill}>
            <TableCell className="font-medium">{skill.skill}</TableCell>
            <TableCell className="font-medium flex items-center gap-2">
              {calculateSkillModifier(skill)}
              <DiceRoller
                diceType="d20"
                modifier={calculateSkillModifier(skill)}
              />
            </TableCell>
            <TableCell
              className={`${
                findTrainingLevel(skill) === "Untrained"
                  ? "text-gray-600"
                  : findTrainingLevel(skill) === "Trained"
                  ? "text-blue-600"
                  : findTrainingLevel(skill) === "Expert"
                  ? "text-purple-700"
                  : findTrainingLevel(skill) === "Master"
                  ? "text-yellow-600"
                  : findTrainingLevel(skill) === "Legendary"
                  ? "text-red-600"
                  : ""
              } `}
            >
              {findTrainingLevel(skill)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkillShowcase;
