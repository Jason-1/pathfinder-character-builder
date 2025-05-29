import * as z from "zod";

export const updateCharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: z.number().int().min(1).max(20),
});
