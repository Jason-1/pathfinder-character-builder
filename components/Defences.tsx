import React, { useEffect } from "react";
import { Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { saveTypes } from "@/types";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";
import DiceRoller from "./DiceRoller";
import { Ancestries, armourData, Classes, shieldData } from "@/data";
import TrainingIcon from "./Icons/TrainingIcon";
import calculateCurrentArmourProficiencyBonus from "@/lib/calculateCurrentArmourProficiencyBonus";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ACBreakdown from "./ACBreakdown";
import { Button } from "./ui/button";
import {
  selectAncestry,
  selectArmour,
  selectAttributeBoostCategories,
  selectClass,
  selectLevel,
  selectPotency,
  selectResilient,
  selectShield,
} from "@/app/redux/selectors";

const Defences = () => {
  const [shieldRaised, setShieldRaised] = React.useState(false);

  const selectedLevel = useSelector(selectLevel);
  const selectedClass = useSelector(selectClass);
  const selectedArmour = useSelector(selectArmour);
  const selectedAncestry = useSelector(selectAncestry);
  const selectedPotency = useSelector(selectPotency);
  const selectedResilient = useSelector(selectResilient);
  const selectedShield = useSelector(selectShield);
  const attributeBoosts = useSelector(selectAttributeBoostCategories);

  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );
  const selectedArmourData = armourData.find(
    (armourItem) => armourItem.name === selectedArmour
  );
  const selectedShieldData = shieldData.find(
    (shieldItem) => shieldItem.name === selectedShield
  );
  const selectedAncestryData = Ancestries.find(
    (ancestryItem) => ancestryItem.name === selectedAncestry
  );

  //------------------------------------------------------------------------------//

  useEffect(() => {
    setShieldRaised(false);
  }, [selectedShield]);

  const calculateSaveProficiencyBonus = (saveType: saveTypes) => {
    if (!selectedClassData) {
      return 0;
    }

    let proficiency = 0;

    selectedClassData.saves[saveType].forEach((level) => {
      if (level <= selectedLevel) {
        proficiency += 2;
      }
    });

    return proficiency;
  };

  const calculateSaveProficiencyLevel = (saveType: saveTypes) => {
    const proficiency = calculateSaveProficiencyBonus(saveType);
    switch (proficiency) {
      case 0:
        return "U";
      case 2:
        return "T";
      case 4:
        return "E";
      case 6:
        return "M";
      case 8:
        return "L";
      default:
        return "U";
    }
  };

  function calculateAC() {
    let AC = 0;
    if (!selectedArmourData || !selectedClassData) {
      return 0;
    }

    const dexCap = selectedArmourData.dexCap;

    const Base = 10;
    const proficiency = calculateCurrentArmourProficiencyBonus(
      selectedArmourData.category,
      selectedLevel,
      selectedClassData
    );
    const item = selectedArmourData.ACBonus;
    const rune = selectedPotency;
    const dexterity = Math.min(
      calculateCurrentAttributeBoost(
        "Dexterity",
        selectedLevel,
        attributeBoosts
      ),
      dexCap
    );
    let shield = 0;
    if (shieldRaised && selectedShieldData) {
      shield = selectedShieldData.ACBonus;
    }

    AC += Base;
    AC += proficiency;

    //if the character is not proficient in the selector armour, they can't add their level to AC
    if (proficiency > 0) {
      AC += selectedLevel;
    }
    AC += item;
    AC += shield;
    AC += rune;
    AC += dexterity;

    return AC;
  }

  function calculateHP() {
    if (!selectedClassData || !selectedAncestryData) {
      return 0;
    }

    let HP = 0;
    const classHP = selectedClassData.hp;
    const ancestry = selectedAncestryData.hp;
    const constitution = calculateCurrentAttributeBoost(
      "Constitution",
      selectedLevel,
      attributeBoosts
    );
    //const bonus = 0; // TODO: Add bonus HP from items or feats

    HP += ancestry;
    HP += classHP * selectedLevel;
    HP += constitution * selectedLevel;

    return HP;
  }

  function calculateSaveBonus(saveType: saveTypes) {
    let saveBonus = 0;
    const proficiency = calculateSaveProficiencyBonus(saveType);
    const item = 0; // TODO: Add item bonus
    const rune = selectedResilient;
    let attribute = 0;
    if (saveType === "fortitude") {
      attribute = calculateCurrentAttributeBoost(
        "Constitution",
        selectedLevel,
        attributeBoosts
      );
    }
    if (saveType === "reflex") {
      attribute = calculateCurrentAttributeBoost(
        "Dexterity",
        selectedLevel,
        attributeBoosts
      );
    }
    if (saveType === "will") {
      attribute = calculateCurrentAttributeBoost(
        "Wisdom",
        selectedLevel,
        attributeBoosts
      );
    }

    saveBonus += proficiency;
    saveBonus += selectedLevel;
    saveBonus += item;
    saveBonus += rune;
    saveBonus += attribute;

    return saveBonus;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <HoverCard>
        <HoverCardTrigger>
          <div className="relative inline-block w-24 h-24 cursor-help">
            <Shield className="w-full h-full text-gray-500" />
            <span
              className={`absolute inset-0 flex flex-col items-center justify-center text-xl font-bold ${
                shieldRaised ? "text-green-500" : ""
              }`}
            >
              <span className="text-xs">AC</span>
              {calculateAC()}
            </span>
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <ACBreakdown shieldRaised={shieldRaised} />
        </HoverCardContent>
      </HoverCard>
      <div>
        <div className="w-32 h-8 bg-red-500 flex items-center px-4">
          <span className="text-white text-md font-bold">
            {"HP"} {calculateHP()}
          </span>
        </div>
        {selectedShield !== "None" && (
          <Button
            className="mt-2"
            variant={shieldRaised ? "default" : "secondary"}
            onClick={() => {
              setShieldRaised((prev) => !prev);
            }}
          >
            Raise Shield
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className=" flex flex-row gap-2 items-center align-middle">
          <TrainingIcon
            trainingLevel={calculateSaveProficiencyLevel("fortitude")}
          />
          <DiceRoller
            diceType="d20"
            modifier={calculateSaveBonus("fortitude")}
          />
          <span>Fortitude: +{calculateSaveBonus("fortitude")}</span>
        </div>
        <div className=" flex flex-row gap-2 items-center">
          <TrainingIcon
            trainingLevel={calculateSaveProficiencyLevel("reflex")}
          />
          <DiceRoller diceType="d20" modifier={calculateSaveBonus("reflex")} />
          <span>Reflex: +{calculateSaveBonus("reflex")}</span>
        </div>
        <div className=" flex flex-row gap-2 items-center">
          <TrainingIcon trainingLevel={calculateSaveProficiencyLevel("will")} />
          <DiceRoller diceType="d20" modifier={calculateSaveBonus("will")} />
          <span>Will: +{calculateSaveBonus("will")}</span>
        </div>
      </div>
    </div>
  );
};

export default Defences;
