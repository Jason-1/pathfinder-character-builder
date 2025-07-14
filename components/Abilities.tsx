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
import { resetSpecificAttributeBoost } from "@/app/redux/Slices/attributeBoostCategoriesSlice";
import calculateCurrentAttributeBoost from "@/lib/calculateCurrentAttributeBoost";
import {
  selectAncestry,
  selectAttributeBoostCategories,
  selectBackground,
  selectClass,
  selectLevel,
} from "@/app/redux/selectors";

const Abilities: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedLevel = useSelector(selectLevel);
  const selectedAncestry = useSelector(selectAncestry);
  const selecteedBackground = useSelector(selectBackground);
  const selectedClass = useSelector(selectClass);
  const attributeBoosts = useSelector(selectAttributeBoostCategories);

  //------------------------------------------------------------------------------//

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
