import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";

interface VariantRulesProps {
  freeArchetype: boolean;
  setFreeArchetype: React.Dispatch<React.SetStateAction<boolean>>;
  ancestralParagon: boolean;
  setAncestralParagon: React.Dispatch<React.SetStateAction<boolean>>;
}

const VariantRules: React.FC<VariantRulesProps> = ({
  freeArchetype,
  setFreeArchetype,
  ancestralParagon,
  setAncestralParagon,
}) => {
  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="free-archetype"
          checked={freeArchetype}
          onCheckedChange={() => setFreeArchetype((prev) => !prev)}
        />
        <Label>Free Archetype</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="ancestral-paragon"
          checked={ancestralParagon}
          onCheckedChange={() => setAncestralParagon((prev) => !prev)}
        />
        <Label>Ancestral Paragon</Label>
      </div>
    </div>
  );
};

export default VariantRules;
