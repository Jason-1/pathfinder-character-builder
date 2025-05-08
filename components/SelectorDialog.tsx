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
import calculateCurrentWeaponProficiencyLevel from "@/lib/calculateCurrentWeaponProficiencyLevel";
import { selectClass, selectLevel } from "@/app/redux/selectors";
import oneAction from "@/public/single-action-white.png";
import twoActions from "@/public/two-actions-white.png";
import threeActions from "@/public/three-actions-white.png";
import reaction from "@/public/reaction-white.png";
import freeAction from "@/public/free-action-white.png";

interface SelectorDialogProps<T> {
  itemType: string;
  selectedItem: string;
  data: T[];
  highlightedItem: T;
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
    action?: string;
  }
>({
  itemType,
  selectedItem,
  data,
  highlightedItem,
  onItemClick,
  setHighlightedItem,
  children,
}: SelectorDialogProps<T>) => {
  const [selectedTab, setSelectedTab] = React.useState<string>("All");

  const selectedLevel = useSelector(selectLevel);
  const selectedClass = useSelector(selectClass);
  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  //------------------------------------------------------------------------------//

  const actionImages: Record<string, string> = {
    "Single Action": oneAction.src,
    "Two Actions": twoActions.src,
    "Three Actions": threeActions.src,
    Reaction: reaction.src,
    "Free Actions": freeAction.src,
    "-": "",
  };

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
            <span className="col-span-2 self-start relative">
              <span className="absolute inset-0 flex items-center justify-center">
                {highlightedItem.name || ""}
              </span>
              <span className="absolute inset-0 flex items-center justify-end">
                {itemType === "Spell" && highlightedItem.action && (
                  <img
                    width={30}
                    height={20}
                    src={actionImages[highlightedItem.action] || undefined}
                    alt={highlightedItem.action}
                  />
                )}
              </span>
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
                      highlightedItem.name === item.name ? "bg-gray-400" : ""
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
                            selectedLevel,
                            selectedClassData
                          )}
                          size={5}
                        />
                      ) : itemType === "Weapon" ? (
                        <TrainingIcon
                          trainingLevel={calculateCurrentWeaponProficiencyLevel(
                            item.category as weaponTypes,
                            selectedLevel,
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
            <p className="mt-4">{highlightedItem.description || ""}</p>
          </div>
        </div>
        <DialogClose asChild className="w-1/3">
          <Button
            className="mt-auto"
            variant="default"
            onClick={() => {
              onItemClick(highlightedItem.name);
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
