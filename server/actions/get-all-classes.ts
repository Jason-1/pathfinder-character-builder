"use server";

import { db } from "../index";
import { classes } from "../schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const getClasses = action.action(async () => {
  const result = await db.select().from(classes);
  return result;
});
