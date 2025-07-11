import * as z from "zod";

export const AttributeBoostSchema = z.object({
  name: z.enum([
    "Ancestry",
    "Background",
    "Class",
    "Initial",
    "Level5",
    "Level10",
    "Level15",
    "Level20",
  ]),
  boosts: z.array(
    z.enum([
      "Strength",
      "Dexterity",
      "Constitution",
      "Intelligence",
      "Wisdom",
      "Charisma",
      "Free",
    ])
  ),
});

export const updateCharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: z.number().int().min(1).max(20),
  ancestryName: z.string(),
  heritageName: z.string().nullable().optional(),
  backgroundName: z.string(),
  className: z.string(),
  subclassName: z.string().nullable().optional(),
  attributesTable: z.array(AttributeBoostSchema),
  armourName: z.string(),
});
