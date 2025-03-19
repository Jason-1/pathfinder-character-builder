import { skillProficienciesType } from "@/types";
import React from "react";

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
    <div>
      {selectedSkills.map((skill) => (
        <div key={skill.skill}>
          {skill.skill} {": "}{" "}
          {findTrainingLevel(
            skill.LevelsBoosted.filter((level) => level <= selectedLevel).length
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillShowcase;
