import { weaponData } from "@/data";
import { weaponItemType } from "@/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainingIcon from "../Icons/TrainingIcon";

import calculateCurrentWeaponProficiencyLevel from "@/lib/calculateCurrentWeaponProficiencyLevel";
import SelectorDialog from "../SelectorDialog";
import { setWeapon } from "@/app/Slices/weaponSlice";
import DiceRoller from "../DiceRoller";

const Armour = () => {
  const dispatch = useDispatch();

  const selectedWeapon = useSelector(
    (state: { weapon: { weapon: string } }) => state.weapon.weapon
  );
  const selectedWeaponData = weaponData.find(
    (weaponItem) => weaponItem.name === selectedWeapon
  );

  //------------------------------------------------------------------------------//

  const [highlightedWeapon, setHighlightedWeapon] =
    React.useState<weaponItemType>(weaponData[0]);

  const handleSetWeapon = (weapon: string) => {
    dispatch(setWeapon({ weapon }));
    if (weapon === "Fist") {
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-2">
          <p>Unarmed</p>
          <TrainingIcon
            trainingLevel={calculateCurrentWeaponProficiencyLevel("unarmed")}
          />
        </div>
        <div className="flex flex-row gap-2">
          <p>Simple</p>
          <TrainingIcon
            trainingLevel={calculateCurrentWeaponProficiencyLevel("simple")}
          />
        </div>
        <div className="flex flex-row gap-2">
          <p>Martial</p>
          <TrainingIcon
            trainingLevel={calculateCurrentWeaponProficiencyLevel("martial")}
          />
        </div>
        <div className="flex flex-row gap-2">
          <p>Advanced</p>
          <TrainingIcon
            trainingLevel={calculateCurrentWeaponProficiencyLevel("advanced")}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2 mt-8">
        <TrainingIcon
          trainingLevel={calculateCurrentWeaponProficiencyLevel(
            selectedWeaponData?.category || "unarmed"
          )}
        />

        <SelectorDialog
          itemType="Weapon"
          selectedItem={selectedWeapon}
          data={weaponData}
          highlightedItemName={highlightedWeapon.name}
          highlightedItemDescription={highlightedWeapon.description}
          onItemClick={(item) => handleSetWeapon(item)}
          setHighlightedItem={setHighlightedWeapon}
        >
          <div className="mt-4 flex flex-row gap-2 text-xs justify-center text-center">
            <p>
              Category:{" "}
              {highlightedWeapon.category.charAt(0).toUpperCase() +
                highlightedWeapon.category.slice(1)}
            </p>
            <p>
              Damage:{" "}
              {highlightedWeapon.damage.charAt(0).toUpperCase() +
                highlightedWeapon.damage.slice(1)}{" "}
              {highlightedWeapon.damageType.charAt(0).toUpperCase() +
                highlightedWeapon.damageType.slice(1)}
            </p>
            <p>
              Group:{" "}
              {highlightedWeapon.group.charAt(0).toUpperCase() +
                highlightedWeapon.group.slice(1)}
            </p>
            <p>Hands: {highlightedWeapon.hands}</p>
            <p>
              Type:{" "}
              {highlightedWeapon.type.charAt(0).toUpperCase() +
                highlightedWeapon.type.slice(1)}
            </p>
            {highlightedWeapon.reload != null && (
              <p>Reload: {highlightedWeapon.reload}</p>
            )}
            {highlightedWeapon.range && (
              <p>Range: {highlightedWeapon.range}ft</p>
            )}
          </div>
        </SelectorDialog>

        <p>
          Damage:{" "}
          {(selectedWeaponData?.damage?.charAt(0).toUpperCase() ?? "") +
            selectedWeaponData?.damage.slice(1)}{" "}
          {selectedWeaponData?.damageType.charAt(0).toUpperCase() +
            (selectedWeaponData?.damageType?.slice(1) ?? "")}
        </p>
        {selectedWeaponData?.reload != null && (
          <p>Reload: {highlightedWeapon.reload}</p>
        )}
        {selectedWeaponData?.range && <p>Range: {highlightedWeapon.range}ft</p>}
      </div>

      <DiceRoller diceType={selectedWeaponData?.damage || "d4"} modifier={0} />
    </div>
  );
};

export default Armour;
