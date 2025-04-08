import {
  AncestryType,
  armourItemType,
  AttributeBoostsType,
  AttributesType,
  BackgroundType,
  ClassType,
  FeatsType,
  skillProficienciesType,
} from "@/types";

export const Ancestries: AncestryType[] = [
  { name: "Human", Attributes: ["Free"], hp: 8, speed: 25, size: "medium" },
  {
    name: "Elf",
    Attributes: ["Dexterity", "Intelligence"],
    hp: 6,
    speed: 30,
    size: "medium",
  },
  {
    name: "Dwarf",
    Attributes: ["Constitution", "Wisdom"],
    hp: 10,
    speed: 20,
    size: "medium",
  },
  {
    name: "Halfling",
    Attributes: ["Dexterity", "Wisdom"],
    hp: 6,
    speed: 25,
    size: "small",
  },
];

export const Backgrounds: BackgroundType[] = [
  {
    name: "Barkeep",
    Attributes: ["Constitution", "Charisma"],
    skills: ["Diplomacy"],
  },
  { name: "Hunter", Attributes: ["Dexterity", "Wisdom"], skills: ["Survival"] },
  {
    name: "Hermit",
    Attributes: ["Constitution", "Intelligence"],
    skills: ["Nature", "Occultism"],
  },
  {
    name: "Field Medic",
    Attributes: ["Constitution", "Wisdom"],
    skills: ["Medicine"],
  },
];

export const Classes: ClassType[] = [
  {
    name: "Fighter",
    type: "Martial",
    perception: "Expert",
    saves: {
      fortitude: [1, 1, 9],
      reflex: [1, 1, 15],
      will: [1, 3],
    },
    skills: {
      Acrobatics: "Trained",
      Athletics: "Trained",
      additional: 3,
    },
    attacks: {
      simple: [1, 1, 13, 19],
      martial: [1, 1, 13, 19],
      advanced: [1, 13, 19],
      unarmed: [1, 13, 19],
    },
    defences: {
      unarmoured: [1, 11, 17],
      light: [1, 11, 17],
      medium: [1, 11, 17],
      heavy: [1, 11, 17],
    },
    DC: "Trained",
    hp: 10,
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
      fortitude: [1, 9],
      reflex: [1, 5],
      will: [1, 1, 17],
    },
    skills: {
      Arcana: "Trained",
      additional: 3,
    },
    attacks: {
      simple: [1, 11],
      martial: [],
      advanced: [],
      unarmed: [1, 11],
    },
    defences: {
      unarmoured: [1, 13],
      light: [],
      medium: [],
      heavy: [],
    },
    DC: "Trained",
    hp: 6,
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
    features: [],
  },
];

//Add intelligenceBoosted as a new item in the object. Can then check and update it the same way as the other boosts without infinite rerenders. Likely need the level associated with when int was boosted
export const skillProficiencies: skillProficienciesType[] = [
  { skill: "Acrobatics", LevelsBoosted: [], IntBoost: null },
  { skill: "Arcana", LevelsBoosted: [], IntBoost: null },
  { skill: "Athletics", LevelsBoosted: [], IntBoost: null },
  { skill: "Crafting", LevelsBoosted: [], IntBoost: null },
  { skill: "Deception", LevelsBoosted: [], IntBoost: null },
  { skill: "Diplomacy", LevelsBoosted: [], IntBoost: null },
  { skill: "Intimidation", LevelsBoosted: [], IntBoost: null },
  { skill: "Medicine", LevelsBoosted: [], IntBoost: null },
  { skill: "Nature", LevelsBoosted: [], IntBoost: null },
  { skill: "Occultism", LevelsBoosted: [], IntBoost: null },
  { skill: "Performance", LevelsBoosted: [], IntBoost: null },
  { skill: "Religion", LevelsBoosted: [], IntBoost: null },
  { skill: "Society", LevelsBoosted: [], IntBoost: null },
  { skill: "Stealth", LevelsBoosted: [], IntBoost: null },
  { skill: "Survival", LevelsBoosted: [], IntBoost: null },
  { skill: "Thievery", LevelsBoosted: [], IntBoost: null },
];

export const Feats: FeatsType[] = [
  {
    level: 1,
    feats: [
      { type: "Martial", selected: "" },
      { type: "Ancestry", selected: "" },
      { type: "Paragon", selected: "" },
    ],
  },
  {
    level: 2,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
  },
  {
    level: 3,
    feats: [
      { type: "Paragon", selected: "" },
      { type: "General", selected: "" },
    ],
  },
  {
    level: 4,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
  },
  { level: 5, feats: [{ type: "Ancestry", selected: "" }] },
  {
    level: 6,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
  },
  {
    level: 7,
    feats: [
      { type: "Paragon", selected: "" },
      { type: "General", selected: "" },
    ],
  },
  {
    level: 8,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
  },
  { level: 9, feats: [{ type: "Ancestry", selected: "" }] },
  {
    level: 10,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
  },
  {
    level: 11,
    feats: [
      { type: "Paragon", selected: "" },
      { type: "General", selected: "" },
    ],
  },
  {
    level: 12,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
  },
  { level: 13, feats: [{ type: "Ancestry", selected: "" }] },
  {
    level: 14,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
  },
  {
    level: 15,
    feats: [
      { type: "Paragon", selected: "" },
      { type: "General", selected: "" },
    ],
  },
  {
    level: 16,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
  },
  { level: 17, feats: [{ type: "Ancestry", selected: "" }] },
  {
    level: 18,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
  },
  {
    level: 19,
    feats: [
      { type: "Paragon", selected: "" },
      { type: "General", selected: "" },
    ],
  },
  {
    level: 20,
    feats: [
      { type: "Class", selected: "" },
      { type: "Archetype", selected: "" },
      { type: "Skill", selected: "" },
    ],
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

export const InitialAttributeBoosts: AttributeBoostsType[] = [
  { name: "Ancestry", boosts: [] },
  { name: "Background", boosts: [] },
  { name: "Class", boosts: [] },
  { name: "Initial", boosts: [] },
  { name: "Level5", boosts: [] },
  { name: "Level10", boosts: [] },
  { name: "Level15", boosts: [] },
  { name: "Level20", boosts: [] },
];

export const skillIncreaseLevels = [3, 5, 7, 9, 11, 13, 15, 17, 19];

export const DCbyLevel: Record<number, number> = {
  1: 15,
  2: 16,
  3: 18,
  4: 19,
  5: 20,
  6: 22,
  7: 23,
  8: 24,
  9: 26,
  10: 27,
  11: 28,
  12: 30,
  13: 31,
  14: 32,
  15: 34,
  16: 35,
  17: 36,
  18: 38,
  19: 39,
  20: 40,
};

export const DCAdjustments: Record<string, number> = {
  incrediblyEasy: -10,
  veryEasy: -5,
  easy: -2,
  hard: 2,
  veryHard: 5,
  incrediblyHard: 10,
};

export const armourData: armourItemType[] = [
  {
    name: "Unarmoured",
    type: "unarmoured",
    ACBonus: 0,
    dexCap: 5,
    strength: 0,
    checkPenalty: 0,
    speedPenalty: 0,
    bulk: 0,
    group: "",
  },
  {
    name: "Explorers Clothing",
    type: "unarmoured",
    ACBonus: 0,
    dexCap: 5,
    strength: 0,
    checkPenalty: 0,
    speedPenalty: 0,
    bulk: "light",
    group: "cloth",
  },
  {
    name: "Padded Armour",
    type: "light",
    ACBonus: 1,
    dexCap: 3,
    strength: 0,
    checkPenalty: 0,
    speedPenalty: 0,
    bulk: "light",
    group: "cloth",
  },
  {
    name: "Leather Armour",
    type: "light",
    ACBonus: 1,
    dexCap: 4,
    strength: 0,
    checkPenalty: 1,
    speedPenalty: 0,
    bulk: 1,
    group: "Leather",
  },
  {
    name: "Chain Shirt",
    type: "light",
    ACBonus: 2,
    dexCap: 3,
    strength: 1,
    checkPenalty: 1,
    speedPenalty: 0,
    bulk: 1,
    group: "chain",
  },
  {
    name: "Hide Armour",
    type: "medium",
    ACBonus: 3,
    dexCap: 2,
    strength: 2,
    checkPenalty: 2,
    speedPenalty: 5,
    bulk: "2",
    group: "leather",
  },
  {
    name: "Scale Mail",
    type: "medium",
    ACBonus: 3,
    dexCap: 2,
    strength: 2,
    checkPenalty: 2,
    speedPenalty: 5,
    bulk: "2",
    group: "composite",
  },
  {
    name: "Chain Mail",
    type: "medium",
    ACBonus: 4,
    dexCap: 1,
    strength: 3,
    checkPenalty: 2,
    speedPenalty: 5,
    bulk: "2",
    group: "chain",
  },
  {
    name: "Breastplate",
    type: "medium",
    ACBonus: 4,
    dexCap: 1,
    strength: 3,
    checkPenalty: 2,
    speedPenalty: 5,
    bulk: "2",
    group: "plate",
  },
  {
    name: "Splint Mail",
    type: "heavy",
    ACBonus: 5,
    dexCap: 1,
    strength: 3,
    checkPenalty: 3,
    speedPenalty: 10,
    bulk: "3",
    group: "composite",
  },
  {
    name: "Half Plate",
    type: "heavy",
    ACBonus: 5,
    dexCap: 1,
    strength: 3,
    checkPenalty: 3,
    speedPenalty: 10,
    bulk: 3,
    group: "plate",
  },
  {
    name: "Full Plate",
    type: "heavy",
    ACBonus: 6,
    dexCap: 0,
    strength: 4,
    checkPenalty: 3,
    speedPenalty: 10,
    bulk: 4,
    group: "plate",
  },
];
