"use server";

import { db } from "../index";
import { armour, characters } from "../schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const getArmour = action.action(async () => {
  const result = await db
    .select()
    .from(armour)
    .orderBy(armour.category, armour.name);
  return result;
});
