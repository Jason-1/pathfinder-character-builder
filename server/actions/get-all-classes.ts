"use server";

import { db } from "../index";
import {
  attacks,
  classes,
  defences,
  features,
  saves,
  skills,
  spellSlots,
} from "../schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const getClasses = action.action(async () => {
  const classRows = await db.select().from(classes);
  const savesRows = await db.select().from(saves);
  const skillsRows = await db.select().from(skills);
  const attacksRows = await db.select().from(attacks);
  const defencesRows = await db.select().from(defences);
  const featuresRows = await db.select().from(features);
  const spellSlotsRows = await db.select().from(spellSlots);

  const result = classRows.map((classRow) => ({
    ...classRow,
    saves: savesRows.find((save) => save.className === classRow.name) ?? null,
    skills:
      skillsRows.find((skill) => skill.className === classRow.name) ?? null,
    attacks:
      attacksRows.find((attack) => attack.className === classRow.name) ?? null,
    defences:
      defencesRows.find((defence) => defence.className === classRow.name) ??
      null,
    features: featuresRows.filter(
      (feature) => feature.className === classRow.name
    ),
    spellSlots: spellSlotsRows.filter(
      (slot) => slot.className === classRow.name
    ),
  }));

  return result;
});
