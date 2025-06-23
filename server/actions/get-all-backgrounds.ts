"use server";

import { db } from "../index";
import { backgrounds } from "../schema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const getBackgrounds = action.action(async () => {
  const result = await db.select().from(backgrounds).orderBy(backgrounds.name);
  return result;
});
