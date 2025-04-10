"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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

import { Classes } from "@/data";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setClass } from "@/app/Slices/classSlice";
import { setSubclass } from "@/app/Slices/subclassSlice";
import { resetAllSkillBoostsAtLevel } from "@/app/Slices/selectedSkillsSlice";
import SelectorDialog from "./SelectorDialog";
import { ClassType } from "@/types";

const ClassSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedClass = useSelector(
    (state: { class: { class: string } }) => state.class.class
  );
  const selectedSubclass = useSelector(
    (state: { subclass: { subclass: string } }) => state.subclass.subclass
  );

  const handleChangeClass = (classString: string) => {
    //When a class is set also reset skill proficiencies for it
    dispatch(setClass({ class: classString }));
    dispatch(resetAllSkillBoostsAtLevel({ currentLevel: 0 }));
  };

  const handleSetSubclass = (subclass: string) => {
    dispatch(setSubclass({ subclass: subclass }));
  };

  const currentClass = Classes.find(
    (currentClass) => currentClass.name === selectedClass
  );

  const [highlightedClass, setHighlightedClass] = React.useState<ClassType>(
    Classes[0]
  );

  const trainingLevel = (value: number) => {
    switch (value) {
      case 0:
        return "Untrained";
      case 1:
        return "Trained";
      case 2:
        return "Expert";
      case 3:
        return "Master";
      case 4:
        return "Legendary";
      default:
        return "Untrained";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-between mt-4">
      <SelectorDialog
        itemType="Class"
        selectedItem={selectedClass}
        data={Classes}
        highlightedItemName={highlightedClass.name}
        highlightedItemDescription={highlightedClass.description}
        onItemClick={(item) => {
          handleChangeClass(item);
          handleSetSubclass("Select Subclass");
        }}
        setHighlightedItem={setHighlightedClass}
      >
        <div className="mt-4 flex flex-row gap-2 text-xs justify-center">
          <p>Attributes: {highlightedClass.Attributes.join(", ")}</p>
          <p>hp: {highlightedClass.hp}</p>
          <p>
            Fortitude:{" "}
            {trainingLevel(
              highlightedClass.saves.fortitude.filter(
                (value: number) => value === 1
              ).length
            )}{" "}
          </p>
          <p>
            Reflex:{" "}
            {trainingLevel(
              highlightedClass.saves.reflex.filter(
                (value: number) => value === 1
              ).length
            )}{" "}
          </p>
          <p>
            Will:{" "}
            {trainingLevel(
              highlightedClass.saves.will.filter((value: number) => value === 1)
                .length
            )}
          </p>
        </div>
      </SelectorDialog>

      <Dialog>
        <DialogTrigger>
          <div className="inline-block border rounded-sm hover:border-red-700 p-2 w-full">
            {selectedSubclass === "Select Subclass" ? "" : "Subclass: "}
            {selectedSubclass}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Subclass</DialogTitle>
            <Accordion type="single" collapsible>
              {currentClass?.subclasses &&
              currentClass.subclasses.length > 0 ? (
                currentClass.subclasses.map((subClass) => (
                  <AccordionItem value={subClass} key={subClass}>
                    <AccordionTrigger>{subClass}</AccordionTrigger>
                    <AccordionContent>
                      <Card>
                        <CardHeader>
                          <CardDescription>{subClass}</CardDescription>
                        </CardHeader>
                        <CardContent></CardContent>
                        <CardFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={() => {
                                handleSetSubclass(`${subClass}`);
                              }}
                            >
                              Confirm Selection
                            </Button>
                          </DialogClose>
                        </CardFooter>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <Card>
                  <CardHeader>
                    <CardDescription>
                      No subclasses available for this class.
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter></CardFooter>
                </Card>
              )}
            </Accordion>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassSelector;
