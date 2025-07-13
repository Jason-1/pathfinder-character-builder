import { z } from "zod";

export const loadAttributesSchema = z.object({
  characterId: z.number(),
});
