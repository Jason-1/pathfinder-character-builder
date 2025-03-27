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

interface SkillShowcaseProps {
  selectedSkills: skillProficienciesType[];
}

const SkillShowcase: React.FC<SkillShowcaseProps> = ({ selectedSkills }) => {
  const currentLevel = useSelector((state: any) => state.level.level);

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
          <TableHead>Proficiency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedSkills.map((skill) => (
          <TableRow key={skill.skill}>
            <TableCell className="font-medium">{skill.skill}</TableCell>
            <TableCell>{findTrainingLevel(skill)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkillShowcase;
