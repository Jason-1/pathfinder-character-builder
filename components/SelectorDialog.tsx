import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import capitaliseFirstLetter from "@/lib/capitaliseFirstLetter";
import { useSelector } from "react-redux";
import TrainingIcon from "./Icons/TrainingIcon";
import calculateCurrentArmourProficiencyLevel from "@/lib/calculateCurrentArmourProficiencyLevel";
import { armourTypes, weaponTypes } from "@/types";
import calculateCurrentWeaponProficiencyLevel from "@/lib/calculateCurrentWeaponProficiencyLevel";
import { selectClass, selectLevel } from "@/app/redux/selectors";
import oneAction from "@/public/single-action-white.png";
import twoActions from "@/public/two-actions-white.png";
import threeActions from "@/public/three-actions-white.png";
import reaction from "@/public/reaction-white.png";
import freeAction from "@/public/free-action-white.png";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface SelectorDialogProps<T> {
  className?: string;
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
  className,
  itemType,
  selectedItem,
  data,
  highlightedItem,
  onItemClick,
  setHighlightedItem,
  children,
}: SelectorDialogProps<T>) => {
  const [selectedTab, setSelectedTab] = React.useState<string>("All");
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const selectedLevel = useSelector(selectLevel);
  const selectedClass = useSelector(selectClass);

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

  const getGridCols = (children: React.ReactNode) => {
    const count = Array.isArray(children) ? children.length : 1;
    if (count < 4) return `grid-cols-${count}`;
    if (count < 6) return `grid-cols-4 lg:grid-cols-${count}`;
    if (count < 8) return `grid-cols-4 lg:grid-cols-6 xl:grid-cols-${count}`;
    return "grid-cols-4 lg:grid-cols-6 xl:grid-cols-8";
  };

  return (
    <Dialog
      onOpenChange={() => {
        setHighlightedItem(
          data.find((item) => item.name === selectedItem) || data[0] || {}
        );
        setSelectedTab("All");
        setSearchTerm("");
      }}
    >
      <DialogTrigger className={cn(className)}>{selectedItem}</DialogTrigger>
      <DialogContent className="w-3/4 max-w-4xl h-3/4 max-h-[75vh] flex flex-col">
        <DialogHeader className="flex-grow">
          <div className="flex flex-col lg:flex-row gap-4 mb-2 justify-left">
            <div className="relative w-full lg:w-1/3">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-10"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
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
          </div>
          <DialogTitle className="hidden md:grid grid-cols-3 text-center items-center">
            <span className="col-span-1 self-start">Select {itemType}</span>
            <span className="col-span-2 flex items-center justify-center relative">
              <span className="absolute inset-0 flex items-center justify-center">
                {highlightedItem.name || ""}
              </span>
              <span className="absolute inset-0 flex items-center justify-end pr-32">
                {itemType === "Spell" &&
                  highlightedItem.action &&
                  highlightedItem.action !== "-" && (
                    <img
                      className="h-8"
                      src={actionImages[highlightedItem.action] || undefined}
                      alt=""
                    />
                  )}
              </span>
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="hidden md:grid grid-cols-3 gap-10 items-start justify-between flex-grow h-full ">
          <div className="border rounded-sm p-2 self-start h-full overflow-y-auto max-h-[55vh]">
            {data.map(
              (item) =>
                (item.category
                  ? item.category === selectedTab || selectedTab === "All"
                  : selectedTab === "All") &&
                (searchTerm === "" ||
                  item.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) && (
                  <div
                    key={item.name}
                    className={`flex flex-row gap-2 mt-0 cursor-pointer col-span-1 justify-between items-center ${
                      highlightedItem.name === item.name
                        ? "bg-gray-400"
                        : "hover:bg-gray-800"
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
                            selectedClass
                          )}
                          size={5}
                        />
                      ) : itemType === "Weapon" ? (
                        <TrainingIcon
                          trainingLevel={calculateCurrentWeaponProficiencyLevel(
                            item.category as weaponTypes,
                            selectedLevel,
                            selectedClass
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
            <div
              className={cn(
                "mt-4 grid gap-2 text-xs justify-center text-center items-center",
                getGridCols(children)
              )}
            >
              {children}
            </div>
            <p className="mt-4 overflow-y-auto max-h-[50vh]">
              {highlightedItem.description || ""}
            </p>
          </div>
        </div>
        <div className="md:hidden items-start justify-between flex-grow h-full overflow-y-auto">
          <Accordion
            type="single"
            collapsible
            className="w-[90%] justify-between"
          >
            {data.map(
              (item) =>
                (item.category
                  ? item.category === selectedTab || selectedTab === "All"
                  : selectedTab === "All") &&
                (searchTerm === "" ||
                  item.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) && (
                  <AccordionItem value={item.name} key={item.name}>
                    <AccordionTrigger
                      className="items-center justify-between hover:no-underline group grid grid-cols-10"
                      onClick={() => {
                        setHighlightedItem(item);
                      }}
                    >
                      <span className="group-hover:underline col-span-8">
                        {item.name}
                      </span>
                      <span className="flex items-center justify-end pr-2">
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
                                selectedClass
                              )}
                              size={5}
                            />
                          ) : itemType === "Weapon" ? (
                            <TrainingIcon
                              trainingLevel={calculateCurrentWeaponProficiencyLevel(
                                item.category as weaponTypes,
                                selectedLevel,
                                selectedClass
                              )}
                              size={5}
                            />
                          ) : (
                            ""
                          ))}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        <div className="mt-4 grid grid-cols-4 lg:grid-cols-8 gap-2 text-xs justify-center text-center items-center">
                          {children}
                        </div>
                        <span>{item.description}</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
            )}
          </Accordion>
        </div>
        <DialogClose asChild className="w-1/3 min-w-32">
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
