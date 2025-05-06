import React, { useCallback, useEffect } from "react";
import { Attributes } from "@/data";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AttributeButtons from "./AttributeButtons";
import { Category } from "@/types";
import { resetSpecificAttributeBoost } from "@/app/Slices/attributeBoostCategoriesSlice";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";
import { RootState } from "@/app/store";

const Abilities: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedLevel = useSelector((state: RootState) => state.level.level);
  const selectedAncestry = useSelector(
    (state: RootState) => state.ancestry.ancestry
  );
  const attributeBoosts = useSelector(
    (state: RootState) => state.attributeBoostCategories
  );

  //------------------------------------------------------------------------------//

  const handleResetAttributes = useCallback(
    (attribute: Category) => {
      dispatch(resetSpecificAttributeBoost(attribute));
    },
    [dispatch]
  );

  //Reset Ancestry boosts when a new class is selected
  useEffect(() => {
    handleResetAttributes("Ancestry");
  }, [selectedAncestry, handleResetAttributes]);

  //Reset Background boosts when a new class is selected
  useEffect(() => {
    handleResetAttributes("Background");
  }, [selectedAncestry, handleResetAttributes]);

  //Reset Class boosts when a new class is selected
  useEffect(() => {
    handleResetAttributes("Class");
  }, [selectedAncestry, handleResetAttributes]);

  return (
    <div className="grid grid-cols-3 gap-8 mt-4">
      {Attributes.map((attribute) => (
        <div
          key={attribute.name}
          className="col-span-1 flex flex-col items-center justify-center h-8"
        >
          <div>{attribute.name}</div>
          <div>
            {"+"}
            {calculateCurrentAttributeBoost(
              attribute.name,
              selectedLevel,
              attributeBoosts
            )}
          </div>
        </div>
      ))}
      <Dialog>
        <DialogTrigger>
          <div className="inline-block border rounded-sm hover:border-red-700 p-2 w-full">
            Modify Attributes
          </div>
        </DialogTrigger>
        <DialogContent
          className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
        >
          <DialogHeader>
            <DialogTitle>Attributes </DialogTitle>
            <DialogDescription>
              Click on the attribute to increase it.
            </DialogDescription>
          </DialogHeader>
          <AttributeButtons />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Abilities;
