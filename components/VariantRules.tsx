import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { toggleFreeArchetype } from "@/app/Slices/freeArchetypeSlice";
import { toggleAncestralParagon } from "@/app/Slices/ancestralParagonSlice";

interface VariantRulesProps {}

const VariantRules: React.FC<VariantRulesProps> = ({}) => {
  const dispatch = useDispatch();

  const freeArchetype = useSelector(
    (state: any) => state.freeArchetype.freeArchetype
  );

  const ancestralParagon = useSelector(
    (state: any) => state.ancestralParagon.ancestralParagon
  );

  const handletoggleFreeArchetype = () => {
    dispatch(toggleFreeArchetype());
  };

  const handletoggleAncestralParagon = () => {
    dispatch(toggleAncestralParagon());
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="free-archetype"
          checked={freeArchetype}
          onCheckedChange={() => handletoggleFreeArchetype()}
        />
        <Label>Free Archetype</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="ancestral-paragon"
          checked={ancestralParagon}
          onCheckedChange={() => handletoggleAncestralParagon()}
        />
        <Label>Ancestral Paragon</Label>
      </div>
    </div>
  );
};

export default VariantRules;
