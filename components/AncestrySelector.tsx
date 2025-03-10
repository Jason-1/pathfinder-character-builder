"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

//TODO - Replace all dropdowns with Dialogs

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
            {Ancestries.map((ancestryItem) => (
              <Accordion type="single" collapsible key={ancestryItem.name}>
                <AccordionItem value="item-1">
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
                            onClick={() =>
                              setSelectedAncestry(ancestryItem.name)
                            }
                          >
                            Confirm Selection
                          </Button>
                        </DialogClose>
                      </CardFooter>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
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
            {availableHeritiges.map((heritigeItem) => (
              <Accordion
                type="single"
                collapsible
                key={heritigeItem.heritageName}
              >
                <AccordionItem value="item-1">
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
              </Accordion>
            ))}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AncestrySelector;
