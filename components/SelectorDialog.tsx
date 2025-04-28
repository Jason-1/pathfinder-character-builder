import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import capitaliseFirstLetter from "@/lib/capitaliseFirstLetter";
import { useSelector } from "react-redux";
import TrainingIcon from "./Icons/TrainingIcon";
import calculateCurrentArmourProficiencyLevel from "@/lib/calculateCurrentArmourProficiencyLevel";
import { Classes } from "@/data";
import { armourTypes, weaponTypes } from "@/types";
import calculateCurrentWeaponProficiencyBonus from "@/lib/calculateCurrentWeaponProficiencyBonus";
import calculateCurrentWeaponProficiencyLevel from "@/lib/calculateCurrentWeaponProficiencyLevel";

interface SelectorDialogProps<T> {
  itemType: string;
  selectedItem: string;
  data: T[];
  highlightedItemName: string;
  highlightedItemDescription?: string;
  onItemClick: (item: string) => void;
  setHighlightedItem: (item: T) => void;
  children?: React.ReactNode;
}

const SelectorDialog = <
  T extends {
    name: string;
    description: string;
    level?: number;
    category?: string;
  }
>({
  itemType,
  selectedItem,
  data,
  highlightedItemName,
  highlightedItemDescription,
  onItemClick,
  setHighlightedItem,
  children,
}: SelectorDialogProps<T>) => {
  const [selectedTab, setSelectedTab] = React.useState<string>("All");

  const selectedlevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );
  const selectedClass = useSelector(
    (state: { class: { class: string } }) => state.class.class
  );
  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  //------------------------------------------------------------------------------//

  const handleButtonVariant = (button: string) => {
    if (button === selectedTab) {
      return "default";
    } else {
      return "secondary";
    }
  };

  const getCategoryTabs = () => {
    const categories: string[] = [];

    for (let i = 0; i < data.length; i++) {
      const category = data[i].category;
      if (category !== undefined) {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      }
    }

    if (categories.length > 0) {
      categories.unshift("All");
    }
    return categories;
  };

  return (
    <Dialog
      onOpenChange={() => {
        setHighlightedItem(
          data.find((item) => item.name === selectedItem) || data[0] || {}
        );
        setSelectedTab("All");
      }}
    >
      <DialogTrigger>{selectedItem}</DialogTrigger>
      <DialogContent className="w-3/4 max-w-4xl h-3/4 max-h-[75vh] flex flex-col">
        <DialogHeader className="flex-grow">
          <div className="flex flex-row gap-4 mb-2 justify-left">
            {getCategoryTabs().map((category, index) => (
              <Button
                key={index}
                variant={handleButtonVariant(category)}
                onClick={() => setSelectedTab(category)}
              >
                {capitaliseFirstLetter(category)}
              </Button>
            ))}
          </div>
          <DialogTitle className="grid grid-cols-3 text-center items-start">
            <span className="col-span-1 self-start">Select {itemType}</span>
            <span className="col-span-2 self-start">
              {highlightedItemName || ""}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-10 items-start justify-between flex-grow overflow-y-auto h-full">
          <div className="border rounded-sm p-2 self-start h-full overflow-y-auto ">
            {data.map(
              (item) =>
                (item.category
                  ? item.category === selectedTab || selectedTab === "All"
                  : selectedTab === "All") && (
                  <div
                    key={item.name}
                    className={`flex flex-row gap-2 mt-0 cursor-pointer col-span-1 justify-between items-center ${
                      highlightedItemName === item.name ? "bg-gray-400" : ""
                    }`}
                    onClick={() => {
                      setHighlightedItem(item);
                    }}
                  >
                    <span>{item.name}</span>
                    {item.level && (
                      <span className="border px-2 rounded-md h-5 w-5 text-sm flex items-center justify-center border-blue-800 bg-blue-800">
                        {`${item.level}`}
                      </span>
                    )}
                    {item.category &&
                      (itemType === "Armour" ? (
                        <TrainingIcon
                          trainingLevel={calculateCurrentArmourProficiencyLevel(
                            item.category as armourTypes,
                            selectedlevel,
                            selectedClassData
                          )}
                          size={5}
                        />
                      ) : itemType === "Weapon" ? (
                        <TrainingIcon
                          trainingLevel={calculateCurrentWeaponProficiencyLevel(
                            item.category as weaponTypes,
                            selectedlevel,
                            selectedClassData
                          )}
                          size={5}
                        />
                      ) : (
                        ""
                      ))}
                  </div>
                )
            )}
          </div>
          <div className="col-span-2 self-start">
            {children}
            <p className="mt-4">{highlightedItemDescription || ""}</p>
          </div>
        </div>
        <DialogClose asChild className="w-1/3">
          <Button
            className="mt-auto"
            variant="default"
            onClick={() => {
              onItemClick(highlightedItemName);
            }}
          >
            Select {itemType}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SelectorDialog;
