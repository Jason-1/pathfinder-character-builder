import { skillProficienciesType } from "@/types";
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

const SkillShowcase: React.FC = ({}) => {
  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );
  const selectedSkills = useSelector(
    (state: { selectedSkills: skillProficienciesType[] }) =>
      state.selectedSkills
  );

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
              4 <DiceRoller diceType="d20" modifier={4} />
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
