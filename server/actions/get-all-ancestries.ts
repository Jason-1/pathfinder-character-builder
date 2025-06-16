"use server";

import { db } from "../index";
import { ancestries } from "../schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const getAncestries = action.action(async () => {
  const result = await db.select().from(ancestries).orderBy(ancestries.name);
  return result;
});
