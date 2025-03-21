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

interface ClassSelectorProps {
  selectedClass: string;
  setSelectedClass: React.Dispatch<React.SetStateAction<string>>;
  selectedSubclass: string;
  setSelectedSubclass: React.Dispatch<React.SetStateAction<string>>;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({
  selectedClass,
  setSelectedClass,
  selectedSubclass,
  setSelectedSubclass,
}) => {
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
                              setSelectedClass(`${classItem.name}`);
                              setSelectedSubclass("Select Subclass");
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
                                setSelectedSubclass(`${subClass}`);
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
