import { skillProficienciesType } from "@/types";
import React from "react";
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
  selectedLevel: number;
  selectedSkills: skillProficienciesType[];
}

const SkillShowcase: React.FC<SkillShowcaseProps> = ({
  selectedLevel,
  selectedSkills,
}) => {
  function findTrainingLevel(numericalTraining: number) {
    switch (numericalTraining) {
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
    <Table>
      <TableCaption>Current Skill Proficiencies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-48">Skill</TableHead>
          <TableHead>Proficiency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedSkills.map((skill) => (
          <TableRow>
            <TableCell className="font-medium">{skill.skill}</TableCell>
            <TableCell>
              {findTrainingLevel(
                skill.LevelsBoosted.filter((level) => level <= selectedLevel)
                  .length
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkillShowcase;
