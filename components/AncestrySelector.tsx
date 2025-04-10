"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAncestry } from "@/app/Slices/ancestrySlice";
import { setHeritage } from "@/app/Slices/heritageSlice";
import { Ancestries } from "@/data";
import { heritiges } from "@/data/heritiges";
import SelectorDialog from "./SelectorDialog";

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

  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
      <SelectorDialog
        itemType="Ancestry"
        selectedItem={selectedAncestry}
        data={Ancestries}
        onItemClick={(item) => {
          handleSetAncestry(item.name);
          handleSetHeritage("Select Heritage");
        }}
      />
      <SelectorDialog
        itemType="Heritage"
        selectedItem={selectedHeritage}
        data={availableHeritiges}
        onItemClick={(item) => {
          handleSetHeritage(item.name);
        }}
      />
    </div>
  );
};

export default AncestrySelector;
