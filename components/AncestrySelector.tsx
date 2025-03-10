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

import { Ancestries } from "@/data";
import { heritiges } from "@/data/heritiges";
import { Button } from "./ui/button";

interface AncestrySelectorProps {
  selectedAncestry: string;
  setSelectedAncestry: React.Dispatch<React.SetStateAction<string>>;
  selectedHeritage: string;
  setSelectedHeritage: React.Dispatch<React.SetStateAction<string>>;
}

const AncestrySelector: React.FC<AncestrySelectorProps> = ({
  selectedAncestry,
  setSelectedAncestry,
  selectedHeritage,
  setSelectedHeritage,
}) => {
  const availableHeritiges = heritiges.filter(
    (heritigeItem) => heritigeItem.ancestryName === selectedAncestry
  );

  return (
    <div className="mt-6 flex flex-col">
      <Dialog>
        <DialogTrigger>
          {selectedAncestry === "Select Ancestry" ? "" : "Ancestry: "}
          {selectedAncestry}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select an Ancestry</DialogTitle>
            <Accordion type="single" collapsible>
              {Ancestries.map((ancestryItem) => (
                <AccordionItem
                  value={ancestryItem.name}
                  key={ancestryItem.name}
                >
                  <AccordionTrigger>{ancestryItem.name}</AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardHeader>
                        <CardDescription>
                          {ancestryItem.Attributes}
                        </CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                      <CardFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              setSelectedAncestry(ancestryItem.name);
                              setSelectedHeritage("Select Heritage");
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
          {selectedHeritage === "Select Heritage" ? "" : "Heritage: "}
          {selectedHeritage}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Heritage</DialogTitle>
            <Accordion type="single" collapsible>
              {availableHeritiges.map((heritigeItem) => (
                <AccordionItem
                  value={heritigeItem.heritageName}
                  key={heritigeItem.heritageName}
                >
                  <AccordionTrigger>
                    {heritigeItem.heritageName}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardHeader>
                        <CardDescription>{heritigeItem.desc}</CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                      <CardFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() =>
                              setSelectedHeritage(heritigeItem.heritageName)
                            }
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
    </div>
  );
};

export default AncestrySelector;
