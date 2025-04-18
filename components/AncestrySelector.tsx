"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAncestry } from "@/app/Slices/ancestrySlice";
import { setHeritage } from "@/app/Slices/heritageSlice";
import { Ancestries } from "@/data";
import { heritiges } from "@/data/heritiges";
import SelectorDialog from "./SelectorDialog";
import { AncestryType } from "@/types";

const AncestrySelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedAncestry = useSelector(
    (state: { ancestry: { ancestry: string } }) => state.ancestry.ancestry
  );
  const selectedHeritage = useSelector(
    (state: { heritage: { heritage: string } }) => state.heritage.heritage
  );

  const handleSetAncestry = (ancestry: string) => {
    dispatch(setAncestry({ ancestry }));
  };

  const handleSetHeritage = (heritage: string) => {
    dispatch(setHeritage({ heritage }));
  };

  const availableHeritiges = heritiges.filter(
    (heritigeItem) => heritigeItem.ancestryName === selectedAncestry
  );

  const [highlightedAncestry, setHighlightedAncestry] =
    React.useState<AncestryType>(Ancestries[0]);
  const [highlightedHeritage, setHighlighterHeritage] = React.useState(
    availableHeritiges[0]
  );

  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
      <SelectorDialog
        itemType="Ancestry"
        selectedItem={selectedAncestry}
        data={Ancestries}
        highlightedItemName={highlightedAncestry.name}
        highlightedItemDescription={highlightedAncestry.description}
        onItemClick={(item) => handleSetAncestry(item)}
        setHighlightedItem={setHighlightedAncestry}
      >
        {" "}
        <div className="mt-4 flex flex-row gap-2 text-xs justify-center">
          <p>speed: {highlightedAncestry.speed}</p>
          <p>Attributes: {highlightedAncestry.Attributes.join(", ")}</p>
          <p>hp: {highlightedAncestry.hp}</p>
          <p>size: {highlightedAncestry.size}</p>
        </div>
      </SelectorDialog>
      <SelectorDialog
        itemType="Heritage"
        selectedItem={selectedHeritage}
        data={availableHeritiges}
        highlightedItemName={highlightedHeritage.name}
        highlightedItemDescription={highlightedHeritage.description}
        onItemClick={(item) => handleSetHeritage(item)}
        setHighlightedItem={setHighlighterHeritage}
      ></SelectorDialog>
    </div>
  );
};

export default AncestrySelector;
