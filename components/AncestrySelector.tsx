"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAncestry } from "@/app/redux/Slices/ancestrySlice";
import { setHeritage } from "@/app/redux/Slices/heritageSlice";
import { heritiges } from "@/data/heritiges";
import SelectorDialog from "./SelectorDialog";
import { AncestryType, heritageType } from "@/types";
import {
  selectAncestry,
  selectAncestryData,
  selectAncestryDataLoaded,
  selectHeritage,
  selectHeritageData,
  selectHeritageDataLoaded,
} from "@/app/redux/selectors";
import {
  initialAncestryState,
  initialHeritageState,
} from "@/app/redux/initialStates";
import { getAncestries } from "@/server/actions/get-all-ancestries";
import { useAction } from "next-safe-action/hooks";
import { getHeritages } from "@/server/actions/get-all-heritages";

const AncestrySelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const ancestryData = useSelector(selectAncestryData);
  const heritageData = useSelector(selectHeritageData);

  const ancestryDataLoaded = useSelector(selectAncestryDataLoaded);
  const heritageDataLoaded = useSelector(selectHeritageDataLoaded);

  const selectedAncestry = useSelector(selectAncestry);
  const selectedHeritage = useSelector(selectHeritage);

  //------------------------------------------------------------------------------//

  const availableHeritages = heritageData.filter(
    (heritageItem) => heritageItem.ancestryName === selectedAncestry.name
  );

  //------------------------------------------------------------------------------//

  const handleSetAncestry = (ancestryString: string) => {
    const ancestryItem = ancestryData.find(
      (item) => item.name === ancestryString
    );
    if (ancestryItem) {
      dispatch(setAncestry(ancestryItem));
      dispatch(setHeritage(initialHeritageState));
    }
  };

  const handleSetHeritage = (heritageString: string) => {
    const heritageItem = availableHeritages.find(
      (item) => item.name === heritageString
    );
    if (heritageItem) {
      dispatch(setHeritage(heritageItem));
    }
  };

  const availableHeritiges = heritiges.filter(
    (heritigeItem) => heritigeItem.ancestryName === selectedAncestry.name
  );

  const [highlightedAncestry, setHighlightedAncestry] = React.useState<
    AncestryType | undefined
  >(undefined);
  const [highlightedHeritage, setHighlightedHeritage] = React.useState<
    heritageType | undefined
  >(undefined);

  if (!ancestryDataLoaded || !heritageDataLoaded) {
    return (
      <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
        <div className="border rounded-sm p-2 w-full text-center text-gray-500">
          Ancestry data not loaded
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
      <SelectorDialog
        className="border rounded-sm hover:border-red-700 p-2 w-full"
        itemType="Ancestry"
        selectedItem={selectedAncestry.name}
        data={ancestryData}
        highlightedItem={
          highlightedAncestry ?? ancestryData[0] ?? initialAncestryState
        }
        onItemClick={handleSetAncestry}
        setHighlightedItem={setHighlightedAncestry}
      >
        <p className="flex flex-col">
          <span>Attributes:</span>
          <span>{highlightedAncestry?.attributes?.join(", ")}</span>
        </p>
        <p className="flex flex-col">
          <span>HP:</span>
          <span>{highlightedAncestry?.hp}</span>
        </p>
        <p className="flex flex-col">
          <span>Speed:</span>
          <span>{highlightedAncestry?.speed}</span>
        </p>
        <p className="flex flex-col">
          <span>Size:</span>
          <span>{highlightedAncestry?.size}</span>
        </p>
      </SelectorDialog>
      <SelectorDialog
        className="border rounded-sm hover:border-red-700 p-2 w-full"
        itemType="Heritage"
        selectedItem={selectedHeritage.name}
        data={availableHeritages}
        highlightedItem={
          highlightedHeritage ?? availableHeritiges[0] ?? initialHeritageState
        }
        onItemClick={(item) => handleSetHeritage(item)}
        setHighlightedItem={(item) => {
          // ✅ Cast to proper type to fix the type error
          setHighlightedHeritage(item as heritageType);
        }}
      ></SelectorDialog>
    </div>
  );
};

export default AncestrySelector;
