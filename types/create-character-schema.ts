import * as z from "zod";

export const createCharacterSchema = z.object({
  name: z.string(),
});
