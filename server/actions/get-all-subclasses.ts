"use server";

import { db } from "../index";
import { subclasses } from "../schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const getSubclasses = action.action(async () => {
  const result = await db
    .select()
    .from(subclasses)
    .orderBy(subclasses.name, subclasses.className);
  return result;
});
