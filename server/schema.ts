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

//------------------------------------------------------------------------------//
// Character Table

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  level: integer("level").notNull().default(1),
  ancestryName: varchar("ancestry_name", { length: 255 })
    .references(() => ancestries.name)
    .notNull()
    .default("Human"),
  heritageName: varchar("heritage_name", { length: 255 }).references(
    () => heritages.name
  ),
  backgroundName: varchar("background_name", { length: 255 }).references(
    () => background.name
  ),
  className: varchar("class_name", { length: 255 })
    .references(() => classes.name)
    .default("Fighter")
    .notNull(),
  subclassName: varchar("subclass_name", { length: 255 }).references(
    () => subclasses.name
  ),
  armourName: varchar("armour_name", { length: 255 })
    .references(() => armour.name)
    .default("Unarmoured")
    .notNull(),
});

//------------------------------------------------------------------------------//
// Armour Table

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

//------------------------------------------------------------------------------//
// Classes Table

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

export const classes = pgTable("classes", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  type: varchar("type", { length: 255 }).notNull(),
  tradition: varchar("tradition", { length: 255 }).default(""),
  perception: integer("perception").array().notNull().default([]),
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

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  className: varchar("class_name", { length: 255 }).references(
    () => classes.name
  ),
  skillsArray: SkillsEnum("skill").array().notNull(),
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
  name: varchar("name", { length: 255 }),
  level: integer("level"),
  description: text("description").default("No description available"),
});

export const spellSlots = pgTable("spellSlots", {
  id: serial("id").primaryKey(),
  className: varchar("class_name", { length: 255 }).references(
    () => classes.name
  ),
  level: integer("level").notNull(),
  cantrips: integer("cantrips").notNull().default(0),
  spellSlots: integer("spell_slots").array().notNull().default([]),
});

//------------------------------------------------------------------------------//
// subclasses

export const subclasses = pgTable("subclasses", {
  id: serial("id").primaryKey(),
  className: varchar("class_name", { length: 255 }).references(
    () => classes.name
  ),
  name: varchar("name", { length: 255 }).unique().notNull(),
  attribute: AttributesEnum("attribute"),
  skills: SkillsEnum("skills").array().notNull().default([]),
  description: text("description")
    .notNull()
    .default("No description available"),
});

//------------------------------------------------------------------------------//
// Ancestry

export const sizeEnum = pgEnum("size", [
  "Tiny",
  "Small",
  "Medium",
  "Large",
  "Huge",
  "Gargantuan",
]);

export const ancestries = pgTable("ancestries", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  attributes: AttributesEnum("attributes").array().notNull().default([]),
  hp: integer("hp").notNull().default(6),
  speed: integer("speed").notNull().default(25),
  size: sizeEnum("size").notNull().default("Medium"),
  description: text("description"),
});

//------------------------------------------------------------------------------//
// Heritage

export const heritages = pgTable("heritages", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  ancestryName: varchar("ancestry_name", { length: 255 })
    .references(() => ancestries.name)
    .notNull(),
  abilityName: varchar("ability_name", { length: 255 }),
  description: text("description").default("No description available"),
});

//------------------------------------------------------------------------------//
// Background

export const background = pgTable("background", {
  name: varchar("name", { length: 255 }).notNull().primaryKey(),
  attributes: AttributesEnum("attributes").array().notNull().default([]),
  skills: SkillsEnum("skills").array().notNull().default([]),
  description: text("description").default("No description available"),
});

//------------------------------------------------------------------------------//
//------------------------------------------------------------------------------//
// Relations

//------------------------------------------------------------------------------//
// Character and Armour Relations
export const CharacterRelations = relations(characters, ({ one }) => ({
  armour: one(armour, {
    fields: [characters.armourName],
    references: [armour.name],
  }),
}));

export const ArmourRelations = relations(armour, ({ many }) => ({
  characters: many(characters),
}));

//------------------------------------------------------------------------------//
// Class Relations

export const ClassRelations = relations(classes, ({ one, many }) => ({
  saves: one(saves, {
    fields: [classes.name],
    references: [saves.className],
  }),
  skills: one(skills, {
    fields: [classes.name],
    references: [skills.className],
  }),
  attacks: one(attacks, {
    fields: [classes.name],
    references: [attacks.className],
  }),
  defences: one(defences, {
    fields: [classes.name],
    references: [defences.className],
  }),
  features: many(features),
  spellSlots: many(spellSlots),
}));

export const savesRelations = relations(saves, ({ one }) => ({
  class: one(classes, {
    fields: [saves.className],
    references: [classes.name],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  class: one(classes, {
    fields: [skills.className],
    references: [classes.name],
  }),
}));

export const attacksRelations = relations(attacks, ({ one }) => ({
  class: one(classes, {
    fields: [attacks.className],
    references: [classes.name],
  }),
}));

export const defencesRelations = relations(defences, ({ one }) => ({
  class: one(classes, {
    fields: [defences.className],
    references: [classes.name],
  }),
}));

export const featuresRelations = relations(features, ({ one }) => ({
  class: one(classes, {
    fields: [features.className],
    references: [classes.name],
  }),
}));

export const spellSlotsRelations = relations(spellSlots, ({ one }) => ({
  class: one(classes, {
    fields: [spellSlots.className],
    references: [classes.name],
  }),
}));

//------------------------------------------------------------------------------//
// Subclass Relations

export const ClassSubclassesRelations = relations(classes, ({ many }) => ({
  subclasses: many(subclasses),
}));

export const SubclassClassRelations = relations(subclasses, ({ one }) => ({
  class: one(classes, {
    fields: [subclasses.className],
    references: [classes.name],
  }),
}));

export const CharacterSubclassRelations = relations(characters, ({ one }) => ({
  subclass: one(subclasses, {
    fields: [characters.subclassName],
    references: [subclasses.name],
  }),
}));

export const SubclassCharactersRelations = relations(
  subclasses,
  ({ many }) => ({
    characters: many(characters),
  })
);

//------------------------------------------------------------------------------//
