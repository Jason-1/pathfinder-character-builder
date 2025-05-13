import { selectClass, selectLevel, selectSpells } from "@/app/redux/selectors";
import { addSpell, clearSpells } from "@/app/redux/Slices/selectedSpellsSlice";
import { Classes } from "@/data";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { spellsData } from "@/data/spells";
import SelectorDialog from "../SelectorDialog";
import { spellType } from "@/types";
import { Button } from "../ui/button";

const Spells = () => {
  const dispatch = useDispatch();
  const selectedLevel = useSelector(selectLevel);
  const selectedClass = useSelector(selectClass);
  const selectedSpells = useSelector(selectSpells);

  const selectedClassData = Classes.find(
    (classItem) => classItem.name === selectedClass
  );

  const currentLevelSpellData = selectedClassData?.spells.find(
    (spell) => spell.level === selectedLevel
  );

  const traditionSpells = spellsData.filter((spell) =>
    spell.traditions.includes(selectedClassData?.tradition || "")
  );

  const [highlightedSpell, setHighlightedSpell] = React.useState<spellType>(
    spellsData[0]
  );

  const cantrips = traditionSpells.filter((spell) => spell.cantrip);
  const leveledSpells = traditionSpells.filter((spell) => !spell.cantrip);

  //------------------------------------------------------------------------------//

  const handleAddSpell = (
    rank: number,
    spellName: string,
    position: number
  ) => {
    dispatch(addSpell({ rank, spellName, position }));
  };

  const getFilteredSpells = (rank: number) => {
    const filteredSpells = leveledSpells.filter(
      (spells) => spells.level <= rank
    );
    return filteredSpells;
  };

  const handleClearSpells = () => {
    dispatch(clearSpells());
  };

  if (!currentLevelSpellData) {
    return <p>You can't cast spells</p>;
  }

  return (
    <div>
      <h3 className="mt-4 text-xl font-bold">Cantrips</h3>
      <div className="mt-4">
        {Array.from({ length: currentLevelSpellData.cantrips }, (_, i) => (
          <div key={i}>
            <SelectorDialog
              itemType="Spell"
              selectedItem={
                selectedSpells
                  .find((spell) => spell.rank === 0)
                  ?.spells.find((spell) => spell.position === i)?.name ||
                "-------"
              }
              data={cantrips}
              highlightedItem={highlightedSpell}
              onItemClick={(item) => handleAddSpell(0, item, i)}
              setHighlightedItem={setHighlightedSpell}
            >
              <div className="mt-4 flex flex-row gap-2 text-xs justify-center text-center">
                <span>Tradition: {selectedClassData?.tradition} </span>
                <span>Traits: {highlightedSpell.traits.join(", ")} </span>
              </div>
            </SelectorDialog>
          </div>
        ))}
      </div>

      <h2 className="mt-4 text-xl font-bold">Spells</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {currentLevelSpellData.spellSlots.map((spellCount, spellLevel) => (
          <div key={spellLevel}>
            {spellCount !== 0 && (
              <div>
                <h3 className="text-lg font-bold">Rank {spellLevel + 1}</h3>
                <div>
                  {Array.from({ length: spellCount }, (_, i) => (
                    <div key={i}>
                      <SelectorDialog
                        itemType="Spell"
                        selectedItem={
                          selectedSpells
                            .find((spell) => spell.rank === spellLevel + 1)
                            ?.spells.find((spell) => spell.position === i)
                            ?.name || "-------"
                        }
                        data={getFilteredSpells(spellLevel + 1)}
                        highlightedItem={highlightedSpell}
                        onItemClick={(item) =>
                          handleAddSpell(spellLevel + 1, item, i)
                        }
                        setHighlightedItem={setHighlightedSpell}
                      >
                        <span>Tradition: {selectedClassData?.tradition}</span>
                        <span>
                          Traits: {highlightedSpell.traits.join(", ")}
                        </span>
                      </SelectorDialog>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button className="mt-4" onClick={handleClearSpells}>
        Clear Spells
      </Button>
    </div>
  );
};

/* 
{ level: 1, cantrips: 5, spellSlots: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
{ level: 2, cantrips: 5, spellSlots: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
{ level: 3, cantrips: 5, spellSlots: [3, 2, 0, 0, 0, 0, 0, 0, 0, 0] },
{ level: 4, cantrips: 5, spellSlots: [3, 3, 0, 0, 0, 0, 0, 0, 0, 0] },
{ level: 5, cantrips: 5, spellSlots: [3, 3, 2, 0, 0, 0, 0, 0, 0, 0] },
{ level: 6, cantrips: 5, spellSlots: [3, 3, 3, 0, 0, 0, 0, 0, 0, 0] },
{ level: 7, cantrips: 5, spellSlots: [3, 3, 3, 2, 0, 0, 0, 0, 0, 0] },
{ level: 8, cantrips: 5, spellSlots: [3, 3, 3, 3, 0, 0, 0, 0, 0, 0] },
{ level: 9, cantrips: 5, spellSlots: [3, 3, 3, 3, 2, 0, 0, 0, 0, 0] },
{ level: 10, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 0, 0, 0, 0, 0] },
{ level: 11, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 2, 0, 0, 0, 0] },
{ level: 12, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 3, 0, 0, 0, 0] },
{ level: 13, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 3, 2, 0, 0, 0] },
{ level: 14, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 3, 3, 0, 0, 0] },
{ level: 15, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 3, 3, 2, 0, 0] },
{ level: 16, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 3, 3, 3, 0, 0] },
{ level: 17, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 3, 3, 3, 2, 0] },
{ level: 18, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 3, 3, 3, 3, 0] },
{ level: 19, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 3, 3, 3, 3, 1] },
{ level: 20, cantrips: 5, spellSlots: [3, 3, 3, 3, 3, 3, 3, 3, 3, 1] },
*/
export default Spells;
