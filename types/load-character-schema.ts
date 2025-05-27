import { z } from "zod";

export const loadCharacterSchema = z.object({
  id: z.number(),
});
