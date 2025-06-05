import {
  pgTable,
  varchar,
  integer,
  serial,
  boolean,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  level: integer("level").notNull().default(1),
  armourName: varchar("armour_name", { length: 255 })
    .references(() => armour.name)
    .default("Unarmoured"),
});

export const ArmourCategoryEnum = pgEnum("category", [
  "unarmoured",
  "light",
  "medium",
  "heavy",
]);

export const armour = pgTable("armour", {
  name: varchar("name", { length: 255 }).unique().notNull().primaryKey(),
  category: ArmourCategoryEnum("category").notNull().default("unarmoured"),
  ACBonus: integer("AC_bonus").notNull().default(0),
  dexCap: integer("dex_cap").notNull().default(5),
  strength: integer("strength").notNull().default(0),
  checkPenalty: integer("check_penalty").notNull().default(0),
  speedPenalty: integer("speed_penalty").notNull().default(0),
  bulk: varchar("bulk", { length: 255 }).notNull().default("0"),
  group: varchar("group", { length: 255 }).notNull().default(""),
  description: text("description").notNull().default("No Armour"),
});

export const CharacterRelations = relations(characters, ({ one }) => ({
  armour: one(armour, {
    fields: [characters.armourName],
    references: [armour.name],
  }),
}));

export const ArmourRelations = relations(armour, ({ many }) => ({
  characters: many(characters),
}));

export const TrainingEnum = pgEnum("training", [
  "Untrained",
  "Trained",
  "Expert",
  "Master",
  "Legendary",
]);

export const AttributesEnum = pgEnum("attributes", [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
  "Free",
]);

export const classes = pgTable("classes", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  type: varchar("type", { length: 255 }).notNull(),
  tradition: varchar("tradition", { length: 255 }).default(""),
  perception: TrainingEnum("perception").notNull().default("Untrained"),
  specialisation: integer("specialisation").array().notNull().default([]),
  DC: TrainingEnum("DC").notNull().default("Untrained"),
  hp: integer("hp").notNull().default(0),
  attributes: AttributesEnum("attributes").array().notNull().default([]),
  description: text("description")
    .notNull()
    .default("No description available"),
});

export const saves = pgTable("saves", {
  id: serial("id").primaryKey(),
  className: varchar("class_name", { length: 255 }).references(
    () => classes.name
  ),
  fortitude: integer().array().notNull(),
  reflex: integer().array().notNull(),
  will: integer().array().notNull(),
});

export const SkillsEnum = pgEnum("skill", [
  "Acrobatics",
  "Arcana",
  "Athletics",
  "Crafting",
  "Deception",
  "Diplomacy",
  "Intimidation",
  "Medicine",
  "Nature",
  "Occultism",
  "Performance",
  "Religion",
  "Society",
  "Stealth",
  "Survival",
  "Thievery",
]);

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  className: varchar("class_name", { length: 255 }).references(
    () => classes.name
  ),
  skill: SkillsEnum("skill").notNull(),
  proficiency: TrainingEnum("proficiency").notNull().default("Untrained"),
});

export const additionalSkills = pgTable("additionalSkills", {
  id: serial("id").primaryKey(),
  className: varchar("class_name", { length: 255 }).references(
    () => classes.name
  ),
  additional: integer("additional").notNull().default(0),
});

export const attacks = pgTable("attacks", {
  id: serial("id").primaryKey(),
  className: varchar("class_name", { length: 255 }).references(
    () => classes.name
  ),
  simple: integer("simple").array().notNull().default([]),
  martial: integer("martial").array().notNull().default([]),
  advanced: integer("advanced").array().notNull().default([]),
  unarmed: integer("unarmed").array().notNull().default([]),
});

export const defences = pgTable("defences", {
  id: serial("id").primaryKey(),
  className: varchar("class_name", { length: 255 }).references(
    () => classes.name
  ),
  unarmoured: integer("unarmoured").array().notNull().default([]),
  light: integer("light").array().notNull().default([]),
  medium: integer("medium").array().notNull().default([]),
  heavy: integer("heavy").array().notNull().default([]),
});

export const features = pgTable("features", {
  id: serial("id").primaryKey(),
  className: varchar("class_name", { length: 255 }).references(
    () => classes.name
  ),
  name: varchar("name", { length: 255 }).notNull(),
  level: integer("level").notNull(),
  description: text("description")
    .notNull()
    .default("No description available"),
});
