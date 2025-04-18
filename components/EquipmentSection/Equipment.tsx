import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Armour from "./Armour";
import Weapons from "./Weapons";

const Equipment = () => {
  const [selectedEquipment, setSelectedEquipment] = React.useState("Armour");

  const handleButtonVariant = (button: string) => {
    if (button === selectedEquipment) {
      return "default";
    } else {
      return "secondary";
    }
  };

  return (
    <Card className="mt-8 h-full">
      <CardHeader>
        <CardTitle className="flex gap-4 items-center">
          <Button
            onClick={() => {
              setSelectedEquipment("Armour");
            }}
            variant={handleButtonVariant("Armour")}
          >
            Armour
          </Button>
          <Button
            onClick={() => {
              setSelectedEquipment("Weapons");
            }}
            variant={handleButtonVariant("Weapons")}
          >
            Weapons
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedEquipment === "Armour" && <Armour />}
        {selectedEquipment === "Weapons" && <Weapons />}
      </CardContent>
    </Card>
  );
};

export default Equipment;
