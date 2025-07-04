import { z } from "zod";

export const loadAttributesSchema = z.object({
  character_id: z.number(),
});
