import { selectClass, selectLevel, selectSpells } from "@/app/redux/selectors";
import { addSpell } from "@/app/redux/Slices/selectedSpellsSlice";
import { Classes } from "@/data";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
  //------------------------------------------------------------------------------//

  const handleAddSpell = (rank: number, spellName: string) => {
    dispatch(addSpell({ rank, spellName }));
  };

  if (!currentLevelSpellData) {
    return <p>You can't cast spells</p>;
  }

  const log = () => {
    handleAddSpell(1, "Fireball");
    handleAddSpell(8, "BOOOOO");
    console.log(selectedSpells);
  };

  return (
    <div>
      <h3 onClick={log}>Cantrips</h3>
      <div>
        {Array.from({ length: currentLevelSpellData.cantrips }, (_, i) => (
          <div key={i}>CANTRIP {i + 1}</div>
        ))}
      </div>

      <h2>Spells</h2>
      <div>
        {currentLevelSpellData.spellSlots.map((spellCount, spellLevel) => (
          <div key={spellLevel}>
            {spellCount !== 0 && (
              <div>
                <h3>Rank {spellLevel + 1}</h3>
                <div>
                  {Array.from({ length: spellCount }, (_, i) => (
                    <div key={i}>Spell Slot {i + 1}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
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
