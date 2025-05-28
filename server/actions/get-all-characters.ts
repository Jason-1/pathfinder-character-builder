"use server";

import { db } from "../index";
import { characters } from "../schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const getCharacters = action.action(async () => {
  const result = await db.select().from(characters).orderBy(characters.id);
  return result;
});
