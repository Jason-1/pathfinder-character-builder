import { weaponData } from "@/data";
import { weaponItemType } from "@/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainingIcon from "../Icons/TrainingIcon";
import calculateCurrentWeaponProficiencyLevel from "@/lib/calculateCurrentWeaponProficiencyLevel";
import SelectorDialog from "../SelectorDialog";
import { setWeapon } from "@/app/redux/Slices/weaponSlice";
import DiceRoller from "../DiceRoller";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import calculateCurrentWeaponProficiencyBonus from "@/lib/calculateCurrentWeaponProficiencyBonus";
import {
  selectAttributeBoostCategories,
  selectClass,
  selectLevel,
  selectWeapon,
} from "@/app/redux/selectors";
import { Separator } from "../ui/separator";

const Armour = () => {
  const dispatch = useDispatch();

  const [potencyRune, setPotencyRune] = React.useState<number>(0);
  const [strikingRune, setStrikingRune] = React.useState<number>(0);

  const selectedWeapon = useSelector(selectWeapon);
  const selectedLevel = useSelector(selectLevel);
  const attributeBoosts = useSelector(selectAttributeBoostCategories);
  const selectedClass = useSelector(selectClass);

  const selectedWeaponData = weaponData.find(
    (weaponItem) => weaponItem.name === selectedWeapon
  );

  const [highlightedWeapon, setHighlightedWeapon] =
    React.useState<weaponItemType>(weaponData[0]);

  //------------------------------------------------------------------------------//

  const handleSetWeapon = (weapon: string) => {
    dispatch(setWeapon({ weapon }));
    if (weapon === "Fist") {
    }
  };

  const calculateWeaponSpecialisationDamage = () => {
    // No weapon specialisation
    if (!selectedClass?.specialisation.length) {
      return 0;
    }
    let specialisation = 0;
    for (let i = 0; i < selectedClass?.specialisation.length; i++) {
      if (selectedClass?.specialisation[i] <= selectedLevel) {
        specialisation += 1;
      }
    }

    //get weapon training level
    const weaponTrainingLevel = calculateCurrentWeaponProficiencyLevel(
      selectedWeaponData?.category || "unarmed",
      selectedLevel,
      selectedClass
    );
    switch (weaponTrainingLevel) {
      case "E":
        specialisation = specialisation * 2;
        break;
      case "M":
        specialisation = specialisation * 3;
        break;
      case "L":
        specialisation = specialisation * 4;
        break;
      default:
        specialisation = 0;
    }

    return specialisation;
  };

  const calculateCurrentAttackModifier = () => {
    let attackModifier = 0;

    const proficiency = calculateCurrentWeaponProficiencyBonus(
      selectedWeaponData?.category || "unarmed",
      selectedLevel,
      selectedClass
    );
    console.log("Proficiency: ", proficiency);
    if (proficiency > 0) {
      attackModifier += selectedLevel;
    }

    if (
      selectedWeaponData?.type === "ranged" ||
      selectedWeaponData?.traits.includes("finesse")
    ) {
      attackModifier += calculateCurrentAttributeBoost(
        "Dexterity",
        selectedLevel,
        attributeBoosts
      );
    } else {
      attackModifier += calculateCurrentAttributeBoost(
        "Strength",
        selectedLevel,
        attributeBoosts
      );
    }

    attackModifier += proficiency;
    attackModifier += potencyRune;

    return attackModifier;
  };

  const calculateCurrentDamageModifier = () => {
    let damageModifier = 0;

    damageModifier += calculateCurrentAttributeBoost(
      "Strength",
      selectedLevel,
      attributeBoosts
    );

    const specialisation = calculateWeaponSpecialisationDamage();

    damageModifier += specialisation;

    return damageModifier;
  };

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="flex flex-col gap-2">
          <p className="mx-auto">Unarmed</p>
          <TrainingIcon
            className="mx-auto"
            trainingLevel={calculateCurrentWeaponProficiencyLevel(
              "unarmed",
              selectedLevel,
              selectedClass
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="mx-auto">Simple</p>
          <TrainingIcon
            className="mx-auto"
            trainingLevel={calculateCurrentWeaponProficiencyLevel(
              "simple",
              selectedLevel,
              selectedClass
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="mx-auto">Martial</p>
          <TrainingIcon
            className="mx-auto"
            trainingLevel={calculateCurrentWeaponProficiencyLevel(
              "martial",
              selectedLevel,
              selectedClass
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="mx-auto">Advanced</p>
          <TrainingIcon
            className="mx-auto"
            trainingLevel={calculateCurrentWeaponProficiencyLevel(
              "advanced",
              selectedLevel,
              selectedClass
            )}
          />
        </div>
      </div>
      <Separator className="mt-8" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 mt-8 items-center">
          <TrainingIcon
            trainingLevel={calculateCurrentWeaponProficiencyLevel(
              selectedWeaponData?.category || "unarmed",
              selectedLevel,
              selectedClass
            )}
          />

          <SelectorDialog
            className="border rounded-sm hover:border-red-700 p-2"
            itemType="Weapon"
            selectedItem={selectedWeapon}
            data={weaponData}
            highlightedItem={highlightedWeapon}
            onItemClick={(item) => handleSetWeapon(item)}
            setHighlightedItem={setHighlightedWeapon}
          >
            <p className="flex flex-col">
              <span>Category:</span>
              <span>
                {highlightedWeapon.category.charAt(0).toUpperCase() +
                  highlightedWeapon.category.slice(1)}
              </span>
            </p>
            <p className="flex flex-col">
              <span>Damage:</span>
              <span>
                {highlightedWeapon.damage.charAt(0).toUpperCase() +
                  highlightedWeapon.damage.slice(1)}{" "}
                {highlightedWeapon.damageType.charAt(0).toUpperCase() +
                  highlightedWeapon.damageType.slice(1)}
              </span>
            </p>
            <p className="flex flex-col">
              <span>Group:</span>
              <span>
                {highlightedWeapon.group.charAt(0).toUpperCase() +
                  highlightedWeapon.group.slice(1)}
              </span>
            </p>
            <p className="flex flex-col">
              <span>Hands:</span>
              <span>{highlightedWeapon.hands}</span>
            </p>
            <p className="flex flex-col">
              <span>Type:</span>
              <span>
                {highlightedWeapon.type.charAt(0).toUpperCase() +
                  highlightedWeapon.type.slice(1)}
              </span>
            </p>
            {highlightedWeapon.reload != null && (
              <p className="flex flex-col">
                <span>Reload:</span>
                <span>{highlightedWeapon.reload}</span>
              </p>
            )}
            {highlightedWeapon.range && (
              <p className="flex flex-col">
                <span>Range:</span>
                <span>{highlightedWeapon.range}ft</span>
              </p>
            )}
          </SelectorDialog>
        </div>
        <div className="flex flex-row gap-2">
          <p>
            Damage: 1{selectedWeaponData?.damage ?? ""}{" "}
            {selectedWeaponData?.damageType.charAt(0).toUpperCase() +
              (selectedWeaponData?.damageType?.slice(1) ?? "")}
          </p>
          {selectedWeaponData?.reload != null && (
            <p>Reload: {selectedWeaponData.reload}</p>
          )}
          {selectedWeaponData?.range && (
            <p>Range: {selectedWeaponData.range}ft</p>
          )}
        </div>
      </div>

      <div className="flex flex-row mt-8 gap-2">
        <DiceRoller
          diceType={selectedWeaponData?.damage || "d4"}
          modifier={calculateCurrentAttackModifier()}
          diceCount={strikingRune + 1}
          damageModifier={calculateCurrentDamageModifier()}
        />
        <span>+{calculateCurrentAttackModifier()}</span>
        <span>
          {strikingRune + 1}
          {selectedWeaponData?.damage || "d4"}
          {" + "}
          {calculateCurrentDamageModifier()}{" "}
          {selectedWeaponData?.damageType || ""}
        </span>
      </div>

      <div className="flex flex-row gap-4 mt-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {potencyRune === 0
              ? "No Potency Rune"
              : "+" + potencyRune + " Potency"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setPotencyRune(0);
              }}
            >
              No Potency Rune
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPotencyRune(1);
              }}
            >
              +1 Potency
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPotencyRune(2);
              }}
            >
              +2 Potency
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPotencyRune(3);
              }}
            >
              +3 Potency
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setPotencyRune(4);
              }}
            >
              +4 Potency
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {strikingRune === 0
              ? "No Striking Rune"
              : strikingRune === 1
              ? "Striking"
              : strikingRune === 2
              ? "Striking (Greater)"
              : "Striking (Major)"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setStrikingRune(0);
              }}
            >
              No Striking Rune
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setStrikingRune(1);
              }}
            >
              Striking
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setStrikingRune(2);
              }}
            >
              Striking (Greater)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setStrikingRune(3);
              }}
            >
              Striking (Major)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Armour;
