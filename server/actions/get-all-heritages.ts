"use server";

import { db } from "../index";
import { heritages } from "../schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const getAncestries = action.action(async () => {
  const result = await db.select().from(heritages).orderBy(heritages.name);
  return result;
});
