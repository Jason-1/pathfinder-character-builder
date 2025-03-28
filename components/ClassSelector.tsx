"use client";

import React, { useState } from "react";

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

const ClassSelector: React.FC = ({}) => {
  const dispatch = useDispatch();

  const selectedClass = useSelector((state: any) => state.class.class);
  const selectedSubclass = useSelector((state: any) => state.subclass.subclass);

  const handleSetClass = (classString: string) => {
    dispatch(setClass({ class: classString }));
  };

  const handleSetSubclass = (subclass: string) => {
    dispatch(setSubclass({ subclass: subclass }));
  };

  const currentClass = Classes.find(
    (currentClass) => currentClass.name === selectedClass
  );

  return (
    <div className="mt-6 flex flex-col">
      <Dialog>
        <DialogTrigger>
          {selectedClass === "Select Class" ? "" : "Class: "}
          {selectedClass}
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
                              handleSetClass(classItem.name);
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
          {selectedSubclass === "Select Subclass" ? "" : "Subclass: "}
          {selectedSubclass}
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
