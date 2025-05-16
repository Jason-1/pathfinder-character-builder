import { armourData, Classes, shieldData, shieldReinforcingData } from "@/data";
import {
  armourItemType,
  shieldItemType,
  shieldReinforcingRunes,
} from "@/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainingIcon from "../Icons/TrainingIcon";
import { setArmour } from "@/app/redux/Slices/armourSlice";
import calculateCurrentArmourProficiencyLevel from "@/lib/calculateCurrentArmourProficiencyLevel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setPotency } from "@/app/redux/Slices/armourPotencySlice";
import { setResilient } from "@/app/redux/Slices/resilientSlice";
import { Separator } from "@/components/ui/separator";
import { setShield } from "@/app/redux/Slices/shieldSlice";
import SelectorDialog from "../SelectorDialog";
import {
  selectArmour,
  selectClass,
  selectLevel,
  selectPotency,
  selectResilient,
  selectShield,
  selectShieldReinforcing,
} from "@/app/redux/selectors";
import { setReinforcing } from "@/app/redux/Slices/shieldReinforcingSlice";

const Armour = () => {
  const dispatch = useDispatch();

  const selectedArmour = useSelector(selectArmour);
  const selectedPotency = useSelector(selectPotency);
  const selectedResilient = useSelector(selectResilient);
  const selectedShield = useSelector(selectShield);
  const selectedShieldReinforcing = useSelector(selectShieldReinforcing);
  const selectedLevel = useSelector(selectLevel);
  const selectedClass = useSelector(selectClass);

  const selectedArmourData = armourData.find(
    (armourItem) => armourItem.name === selectedArmour
  );
  const selectedShieldData = shieldData.find(
    (shieldItem) => shieldItem.name === selectedShield
  );
  const selectedShieldReinforcingData = shieldReinforcingData.find(
    (reinforcingItem) => reinforcingItem.name === selectedShieldReinforcing
  );
  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  const [highlightedArmour, setHighlightedArmour] =
    React.useState<armourItemType>(armourData[0]);

  const [highlightedShield, setHighlightedShield] =
    React.useState<shieldItemType>(shieldData[0]);

  //------------------------------------------------------------------------------//

  const handleSetArmour = (armour: string) => {
    dispatch(setArmour({ armour }));
    if (armour === "Unarmoured") {
      dispatch(setPotency({ potency: 0 }));
      dispatch(setResilient({ resilient: 0 }));
    }
  };

  const handleSetShield = (shield: string) => {
    dispatch(setShield({ shield }));
  };

  const handleSetReinforcing = (reinforcing: shieldReinforcingRunes) => {
    dispatch(setReinforcing({ reinforcing }));
  };

  const handleSetPotency = (potency: number) => {
    if (selectedArmour !== "Unarmoured") {
      dispatch(setPotency({ potency }));
    }
  };

  const handleSetResilient = (resilient: number) => {
    if (selectedArmour !== "Unarmoured") {
      dispatch(setResilient({ resilient }));
    }
  };

  const calculateShieldHardness = () => {
    if (!selectedShieldData || selectedShield === "None") {
      return 0;
    }

    if (
      !selectedShieldReinforcingData ||
      selectedShieldReinforcing === "None"
    ) {
      return selectedShieldData.Hardness;
    }

    const hardness =
      selectedShieldData.Hardness + selectedShieldReinforcingData.HardnessBonus;

    return Math.min(hardness, selectedShieldReinforcingData.HardnessMaximum);
  };

  const calculateShieldHP = () => {
    if (!selectedShieldData || selectedShield === "None") {
      return 0;
    }

    if (
      !selectedShieldReinforcingData ||
      selectedShieldReinforcing === "None"
    ) {
      return selectedShieldData.hp;
    }

    const hp = selectedShieldData.hp + selectedShieldReinforcingData.HPBonus;
    return Math.min(hp, selectedShieldReinforcingData.HPMaximum);
  };

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="flex flex-col gap-2 justify-center">
          <p className="mx-auto">Unarmoured</p>
          <TrainingIcon
            className="mx-auto"
            trainingLevel={calculateCurrentArmourProficiencyLevel(
              "unarmoured",
              selectedLevel,
              selectedClassData
            )}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="mx-auto">Light</p>
          <TrainingIcon
            className="mx-auto"
            trainingLevel={calculateCurrentArmourProficiencyLevel(
              "light",
              selectedLevel,
              selectedClassData
            )}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="mx-auto">Medium</p>
          <TrainingIcon
            className="mx-auto"
            trainingLevel={calculateCurrentArmourProficiencyLevel(
              "medium",
              selectedLevel,
              selectedClassData
            )}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="mx-auto">Heavy</p>
          <TrainingIcon
            className="mx-auto"
            trainingLevel={calculateCurrentArmourProficiencyLevel(
              "heavy",
              selectedLevel,
              selectedClassData
            )}
          />
        </div>
      </div>
      <Separator className="mt-8" />
      <div className="flex flex-col gap-2 mt-8 items-center lg:items-start">
        <div className="flex flex-row gap-2 items-center">
          <TrainingIcon
            trainingLevel={calculateCurrentArmourProficiencyLevel(
              selectedArmourData?.category || "unarmoured",
              selectedLevel,
              selectedClassData
            )}
          />
          <SelectorDialog
            className="border rounded-sm hover:border-red-700 p-2"
            itemType="Armour"
            selectedItem={selectedArmour}
            data={armourData}
            highlightedItem={highlightedArmour}
            onItemClick={(item) => handleSetArmour(item)}
            setHighlightedItem={setHighlightedArmour}
          >
            <div className="mt-4 grid grid-cols-4 lg:grid-cols-8 gap-2 text-xs justify-center text-center items-center">
              <p className="flex flex-col">
                <span>Type:</span>
                <span>{highlightedArmour.category}</span>
              </p>
              <p className="flex flex-col">
                <span>AC Bonus:</span>
                <span>{highlightedArmour.ACBonus}</span>
              </p>
              <p className="flex flex-col">
                <span>Dex Cap:</span>
                <span>{highlightedArmour.dexCap}</span>
              </p>
              <p className="flex flex-col">
                <span>Strength:</span>
                <span>{highlightedArmour.strength}</span>
              </p>
              <p className="flex flex-col">
                <span>Check Penalty:</span>
                <span>{highlightedArmour.checkPenalty}</span>
              </p>
              <p className="flex flex-col">
                <span>Speed Penalty:</span>
                <span>{highlightedArmour.speedPenalty}</span>
              </p>
              <p className="flex flex-col">
                <span>Bulk:</span>
                <span>{highlightedArmour.bulk}</span>
              </p>
              <p className="flex flex-col">
                <span>Group:</span>
                <span>{highlightedArmour.group || "None"}</span>
              </p>
            </div>
          </SelectorDialog>
        </div>

        <div className="flex flex-row gap-2 justify-start text-center">
          <p>Item Bonus: +{selectedArmourData?.ACBonus}</p>
          <p>Dex Cap +{selectedArmourData?.dexCap}</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {selectedPotency === 0
              ? "No Potency Rune"
              : "+" + selectedPotency + " Potency"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                handleSetPotency(0);
              }}
            >
              No Potency Rune
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetPotency(1);
              }}
            >
              +1 Potency
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetPotency(2);
              }}
            >
              +2 Potency
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetPotency(3);
              }}
            >
              +3 Potency
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {selectedResilient === 0
              ? "No Resilient Rune"
              : selectedResilient === 1
              ? "Resilient"
              : selectedResilient === 2
              ? "Resilient (Greater)"
              : "Resilient (Major)"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                handleSetResilient(0);
              }}
            >
              No Resilient Rune
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetResilient(1);
              }}
            >
              Resilient
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetResilient(2);
              }}
            >
              Resilient (Greater)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetResilient(3);
              }}
            >
              Resilient (Major)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator className="mt-8" />

      <div className="flex flex-col gap-0 lg:gap-2 mt-8 items-center lg:items-start">
        <SelectorDialog
          className="border rounded-sm hover:border-red-700 p-2"
          itemType="Shield"
          selectedItem={selectedShield}
          data={shieldData}
          highlightedItem={highlightedShield}
          onItemClick={(item) => handleSetShield(item)}
          setHighlightedItem={setHighlightedShield}
        >
          <div className="mt-4 flex flex-row gap-2 text-xs justify-center">
            <p>AC Bonus: {highlightedShield.ACBonus}</p>
            <p>Hardness: {highlightedShield.Hardness}</p>
            <p>Speed Penalty: {highlightedShield.speedPenalty}</p>
            <p>Bulk: {highlightedShield.bulk}</p>
            <p>
              HP(BT): {highlightedShield.hp}({highlightedShield.bt})
            </p>
          </div>
        </SelectorDialog>
        <div className="flex flex-row gap-2 justify-start text-center">
          <p>AC Bonus: +{selectedShieldData?.ACBonus}</p>
          <p>Hardness: {calculateShieldHardness()}</p>
          <p>
            HP(BT): {calculateShieldHP()}({calculateShieldHP() / 2})
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {selectedShieldReinforcing === "None"
              ? "No Shield Rune"
              : "Reinforcing Rune (" + selectedShieldReinforcing + ")"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                handleSetReinforcing("None");
              }}
            >
              No Reinforcing Rune
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetReinforcing("Minor");
              }}
            >
              Reinforcing Rune (Minor)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetReinforcing("Lesser");
              }}
            >
              Reinforcing Rune (Lesser)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetReinforcing("Moderate");
              }}
            >
              Reinforcing Rune (Moderate)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetReinforcing("Greater");
              }}
            >
              Reinforcing Rune (Greater)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetReinforcing("Major");
              }}
            >
              Reinforcing Rune (Major)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                handleSetReinforcing("Supreme");
              }}
            >
              Reinforcing Rune (Supreme)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Armour;
