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

  return (
    <div className="mt-6 flex justify-start">
      <Dialog>
        <DialogTrigger>
          <div className="inline-block border rounded-sm hover:border-red-700 p-2 ">
            {selectedClass === "Select Class" ? "" : "Class: "}
            {selectedClass}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Class</DialogTitle>
            <Accordion type="single" collapsible>
              {Classes.map((classItem) => (
                <AccordionItem value={classItem.name} key={classItem.name}>
                  <AccordionTrigger>{classItem.name}</AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardHeader>
                        <CardDescription>
                          {classItem.Attributes}
                        </CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                      <CardFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              handleChangeClass(classItem.name);
                              handleSetSubclass("Select Subclass");
                            }}
                          >
                            Confirm Selection
                          </Button>
                        </DialogClose>
                      </CardFooter>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <div className="inline-block border rounded-sm hover:border-red-700 p-2 ">
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
