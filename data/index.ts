import { AttributesType } from "@/types";

export const Ancestries = [
  { name: "Human", Attributes: ["Free"] },
  { name: "Elf", Attributes: ["Dexterity", "Intelligence"] },
  { name: "Dwarf", Attributes: ["Constitution", "Wisdom"] },
  { name: "Halfling", Attributes: ["Dexterity", "Wisdom"] },
];

export const Backgrounds = [
  { name: "Barkeep", Attributes: ["Constitution", "Charisma"] },
  { name: "Hunter", Attributes: ["Dexterity", "Wisdom"] },
  { name: "Hermit", Attributes: ["Constitution", "Intelligence"] },
  { name: "Field Medic", Attributes: ["Constitution", "Wisdom"] },
];

export const Classes = [
  {
    name: "Fighter",
    type: "Martial",
    perception: "Expert",
    saves: {
      fortitude: "Expert",
      reflex: "Trained",
      will: "Trained",
    },
    skills: {
      acrobatics: "Trained",
      athletics: "Trained",
      additional: 3,
    },
    attacks: {
      simple: "Expert",
      martial: "Expert",
      advanced: "Trained",
      unarmed: "Expert",
    },
    defences: {
      unarmoured: "Trained",
      light: "Trained",
      medium: "Trained",
      heavy: "Trained",
    },
    DC: "Trained",
    Attributes: ["Strength", "Dexterity"],
    subclasses: [],
    features: [
      {
        name: "reactive strike",
        level: 1,
        description:
          "Ever watchful for weaknesses, you can quickly attack foes that leave an opening in their defenses. You gain the Reactive Strike reaction.",
      },
      {
        name: "Shield Block",
        level: 1,
        description:
          "You gain the Shield Block general feat, a reaction that lets you reduce damage with your shield.",
      },
      {
        name: "Bravery",
        level: 3,
        description:
          "Having faced countless foes and the chaos of battle, you have learned how to stand strong in the face of fear. Your proficiency rank for Will saves increases to expert. When you roll a success at a Will save against a fear effect, you get a critical success instead. In addition, anytime you gain the frightened condition, reduce its value by 1.",
      },
      {
        name: "Fighter Weapon Mastery",
        level: 5,
        description:
          "Hours spent training with your preferred weapons, learning and developing new combat techniques, have made you particularly effective with your weapons of choice. Choose one weapon group. Your proficiency rank increases to master with the simple weapons, martial weapons, and unarmed attacks in that group, and to expert with the advanced weapons in that group. You gain access to the critical specialization effects of all weapons and unarmed attacks for which you have master proficiency.",
      },
      {
        name: "Battlefield Surveyor",
        level: 7,
        description:
          "Whether taking stock of an enemy army or simply standing guard, you excel at observing your foes. Your proficiency rank for Perception increases to master. In addition, you gain a +2 circumstance bonus to Perception checks for initiative, making you faster to react during combat.",
      },
      {
        name: "Weapon Specialization",
        level: 7,
        description:
          "You've learned how to inflict greater injuries with the weapons you know best. You deal 2 additional damage with weapons and unarmed attacks in which you're an expert. This damage increases to 3 if you're a master, and 4 if you're legendary.",
      },
      {
        name: "Battle Hardened",
        level: 9,
        description:
          "Your experience in battle helps protect you against magic and toxins alike. Your proficiency rank for Fortitude saves increases to master. When you roll a success on a Fortitude save, you get a critical success instead.",
      },
      {
        name: "Combat Flexibility",
        level: 9,
        description:
          "You can prepare your tactics to suit different situations. When you make your daily preparations, you gain one fighter feat of 8th level or lower that you meet the prerequisites for and don't already have. You can use that feat until your next daily preparations.",
      },
      {
        name: "Armor Expertise",
        level: 11,
        description:
          "You have spent so much time in armor that you know how to make the most of its protection. Your proficiency ranks for light, medium, and heavy armor, as well as for unarmored defense, increase to expert. You gain the armor specialization effects of medium and heavy armor.",
      },
      {
        name: "Fighter Expertise",
        level: 11,
        description:
          "Your practiced techniques have made you even more formidable. Your proficiency rank for your fighter class DC increases to expert.",
      },
      {
        name: "Weapon Legend",
        level: 13,
        description:
          "You've learned fighting techniques that apply to all armaments, and you've developed unparalleled skill with your favorite weapons. Your proficiency ranks for simple weapons, martial weapons, and unarmed attacks increase to master. Your proficiency rank for advanced weapons increases to expert. You can select one weapon group and increase your proficiency ranks to legendary for all simple weapons, martial weapons, and unarmed attacks in that weapon group, and to master for all advanced weapons in that weapon group.",
      },
      {
        name: "Greater Weapon Specialization",
        level: 15,
        description:
          "Your damage from weapon specialization increases to 4 with weapons and unarmed attacks in which you're an expert, 6 if you're a master, and 8 if you're legendary.",
      },
      {
        name: "Improved Flexibility",
        level: 15,
        description:
          "Your extensive experience gives you even greater ability to adapt to each day's challenges. When you use combat flexibility, you can gain two fighter feats instead of one. While the first feat must still be 8th level or lower, the second feat can be up to 14th level, and you can use the first feat to meet the prerequisites of the second feat. You must meet all of the feats' prerequisites.",
      },
      {
        name: "Tempered Reflexes",
        level: 15,
        description:
          "Practiced reflexes let you find safety even in the face of cataclysmic explosions. Your proficiency rank for Reflex saves increases to master. When you roll a success on a Reflex save, you get a critical success instead.",
      },
      {
        name: "Armor Mastery",
        level: 17,
        description:
          "Your skill with armor improves further. Your proficiency ranks for light, medium, and heavy armor, as well as for unarmored defense, increase to master.",
      },
      {
        name: "Versatile Legend",
        level: 19,
        description:
          "You are nigh-unmatched with any weapon. Your proficiency ranks for simple weapons, martial weapons, and unarmed attacks increase to legendary, and your proficiency rank for advanced weapons increases to master. Your proficiency rank for your fighter class DC increases to master.",
      },
    ],
  },

  {
    name: "Wizard",
    type: "Caster",
    perception: "Trained",
    saves: {
      fortitude: "Trained ",
      reflex: "Trained",
      will: "Expert",
    },
    skills: {
      arcana: "Trained",
      additional: 3,
    },
    attacks: {
      simple: "Trained",
      martial: "Untrained",
      advanced: "Untrained",
      unarmed: "Trained",
    },
    defences: {
      unarmoured: "Trained",
      light: "Untrained",
      medium: "Untrained",
      heavy: "Untrained",
    },
    DC: "Trained",
    Attributes: ["Intelligence"],
    subclasses: [
      "Red Mantis Magic School",
      "School of Ars Grammatica",
      "School of Battle Magic",
      "School of Civic Wizardry",
      "School of Mentalism",
      "School of Protean Form",
      "School of the Boundary",
      "School of Unified Magical Theory",
    ],
  },
];

export const Feats = [
  {
    level: 1,
    feats: [{ type: "Martial" }, { type: "Ancestry" }, { type: "Paragon" }],
  },
  {
    level: 2,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
  { level: 3, feats: [{ type: "Paragon" }, { type: "General" }] },
  {
    level: 4,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
  { level: 5, feats: [{ type: "Ancestry" }] },
  {
    level: 6,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
  { level: 7, feats: [{ type: "Paragon" }, { type: "General" }] },
  {
    level: 8,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
  { level: 9, feats: [{ type: "Ancestry" }] },
  {
    level: 10,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
  { level: 11, feats: [{ type: "Paragon" }, { type: "General" }] },
  {
    level: 12,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
  { level: 13, feats: [{ type: "Ancestry" }] },
  {
    level: 14,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
  { level: 15, feats: [{ type: "Paragon" }, { type: "General" }] },
  {
    level: 16,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
  { level: 17, feats: [{ type: "Ancestry" }] },
  {
    level: 18,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
  { level: 19, feats: [{ type: "Paragon" }, { type: "General" }] },
  {
    level: 20,
    feats: [{ type: "Class" }, { type: "Archetype" }, { type: "Skill" }],
  },
];

export const Attributes: { name: AttributesType }[] = [
  { name: "Strength" },
  { name: "Dexterity" },
  { name: "Constitution" },
  { name: "Intelligence" },
  { name: "Wisdom" },
  { name: "Charisma" },
];

export const InitialAttributeBoosts = [
  { name: "Ancestry", boosts: [] },
  { name: "Background", boosts: [] },
  { name: "Class", boosts: [] },
  { name: "Initial", boosts: [] },
  { name: "Level5", boosts: [] },
  { name: "Level10", boosts: [] },
  { name: "Level15", boosts: [] },
  { name: "Level20", boosts: [] },
];
