"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAncestry } from "@/app/redux/Slices/ancestrySlice";
import { setHeritage } from "@/app/redux/Slices/heritageSlice";
import { Ancestries } from "@/data";
import { heritiges } from "@/data/heritiges";
import SelectorDialog from "./SelectorDialog";
import { AncestryType } from "@/types";
import { selectAncestry, selectHeritage } from "@/app/redux/selectors";

const AncestrySelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedAncestry = useSelector(selectAncestry);
  const selectedHeritage = useSelector(selectHeritage);

  //------------------------------------------------------------------------------//

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
        className="border rounded-sm hover:border-red-700 p-2"
        itemType="Ancestry"
        selectedItem={selectedAncestry}
        data={Ancestries}
        highlightedItem={highlightedAncestry}
        onItemClick={(item) => {
          handleSetAncestry(item);
          handleSetHeritage("Select Heritage");
        }}
        setHighlightedItem={setHighlightedAncestry}
      >
        <p className="flex flex-col">
          <span>Speed:</span>
          <span>{highlightedAncestry.speed}</span>
        </p>
        <p className="flex flex-col">
          <span>Attributes:</span>
          <span>{highlightedAncestry.Attributes.join(", ")}</span>
        </p>
        <p className="flex flex-col">
          <span>HP:</span>
          <span>{highlightedAncestry.hp}</span>
        </p>
        <p className="flex flex-col">
          <span>Size:</span>
          <span>{highlightedAncestry.size}</span>
        </p>
      </SelectorDialog>
      <SelectorDialog
        className="border rounded-sm hover:border-red-700 p-2 w-full"
        itemType="Heritage"
        selectedItem={selectedHeritage}
        data={availableHeritiges}
        highlightedItem={highlightedHeritage}
        onItemClick={(item) => handleSetHeritage(item)}
        setHighlightedItem={setHighlighterHeritage}
      ></SelectorDialog>
    </div>
  );
};

export default AncestrySelector;
