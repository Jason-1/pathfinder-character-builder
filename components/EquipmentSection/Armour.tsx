import { armourData, Classes, shieldData } from "@/data";
import { armourTypes } from "@/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainingIcon from "../Icons/TrainingIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setArmour } from "@/app/Slices/armourSlice";
import calculateCurrentArmourProficiencyBonus from "@/lib/calculateCurrentArmourProficiencyBonus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setPotency } from "@/app/Slices/potencySlice";
import { setResilient } from "@/app/Slices/resilientSlice";
import { Separator } from "@/components/ui/separator";
import { setShield } from "@/app/Slices/shieldSlice";
import SelectorDialog from "../SelectorDialog";

const Armour = () => {
  const dispatch = useDispatch();

  const selectedClass = useSelector(
    (state: { class: { class: string } }) => state.class.class
  );
  const selectedArmour = useSelector(
    (state: { armour: { armour: string } }) => state.armour.armour
  );
  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );
  const selectedArmourData = armourData.find(
    (armourItem) => armourItem.name === selectedArmour
  );
  const selectedPotency = useSelector(
    (state: { potency: { potency: number } }) => state.potency.potency
  );
  const selectedResilient = useSelector(
    (state: { resilient: { resilient: number } }) => state.resilient.resilient
  );
  const selectedShield = useSelector(
    (state: { shield: { shield: string } }) => state.shield.shield
  );
  const selectedShieldData = shieldData.find(
    (shieldItem) => shieldItem.name === selectedShield
  );

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

  const calculateArmourProficiencyLevel = (armourType: armourTypes) => {
    if (!selectedClassData) {
      return "U";
    }

    const proficiency = calculateCurrentArmourProficiencyBonus(armourType);
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

  return (
    <div>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-2">
          <p>Unarmoured</p>
          <TrainingIcon
            trainingLevel={calculateArmourProficiencyLevel("unarmoured")}
          />
        </div>
        <div className="flex flex-row gap-2">
          <p>Light</p>
          <TrainingIcon
            trainingLevel={calculateArmourProficiencyLevel("light")}
          />
        </div>
        <div className="flex flex-row gap-2">
          <p>Medium</p>
          <TrainingIcon
            trainingLevel={calculateArmourProficiencyLevel("medium")}
          />
        </div>
        <div className="flex flex-row gap-2">
          <p>Heavy</p>
          <TrainingIcon
            trainingLevel={calculateArmourProficiencyLevel("heavy")}
          />
        </div>
      </div>
      <div className="mt-8">{/*<SelectorDialog /> */}</div>
      <div className="flex flex-row gap-2 mt-8">
        <TrainingIcon
          trainingLevel={calculateArmourProficiencyLevel(
            selectedArmourData?.type || "unarmoured"
          )}
        />

        <SelectorDialog
          itemType="Armour"
          selectedItem={selectedArmour}
          data={armourData}
          onItemClick={(item) => handleSetArmour(item.name)}
        />
        <p>Item Bonus: +{selectedArmourData?.ACBonus}</p>
        <p>Dex Cap +{selectedArmourData?.dexCap}</p>
      </div>
      <div className="flex flex-row gap-4 mt-8">
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

      <div className="flex flex-row gap-2 mt-8">
        <SelectorDialog
          itemType="Shield"
          selectedItem={selectedShield}
          data={shieldData}
          onItemClick={(item) => handleSetShield(item.name)}
        />
        <p>Raised AC Bonus: +{selectedShieldData?.ACBonus}</p>
        <p>Hardness: {selectedShieldData?.Hardness}</p>
        <p>
          HP(BT): {selectedShieldData?.hp}({selectedShieldData?.bt})
        </p>
      </div>
    </div>
  );
};

export default Armour;
