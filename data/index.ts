import {
  AncestryType,
  armourItemType,
  AttributeBoostsType,
  AttributesType,
  BackgroundType,
  ClassType,
  FeatsType,
  shieldItemType,
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
    name: "Champion",
    type: "Martial",
    perception: "Trained",
    saves: {
      fortitude: [1, 1, 9],
      reflex: [1, 9],
      will: [1, 1, 11],
    },
    skills: {
      Religion: "Trained",
      additional: 2,
    },
    attacks: {
      simple: [1, 5, 13],
      martial: [1, 5, 13],
      advanced: [1, 5, 13],
      unarmed: [1, 5, 13],
    },
    defences: {
      unarmoured: [1, 7, 13, 17],
      light: [1, 7, 13, 17],
      medium: [1, 7, 13, 17],
      heavy: [1, 7, 13, 17],
    },
    DC: "Trained",
    hp: 10,
    Attributes: ["Strength", "Dexterity"],
    subclasses: [
      "Desecration (Unholy)",
      "Grandeur (Holy)",
      "Justice",
      "Liberation",
      "Obedience",
      "Redemption (Holy)",
    ],
    features: [],
  },
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
  {
    skill: "Acrobatics",
    attribute: "Dexterity",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Arcana",
    attribute: "Intelligence",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Athletics",
    attribute: "Strength",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Crafting",
    attribute: "Intelligence",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Deception",
    attribute: "Charisma",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Diplomacy",
    attribute: "Charisma",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Intimidation",
    attribute: "Charisma",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Medicine",
    attribute: "Wisdom",
    LevelsBoosted: [],
    IntBoost: null,
  },
  { skill: "Nature", attribute: "Wisdom", LevelsBoosted: [], IntBoost: null },
  {
    skill: "Occultism",
    attribute: "Intelligence",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Performance",
    attribute: "Charisma",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Religion",
    attribute: "Wisdom",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Society",
    attribute: "Intelligence",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Stealth",
    attribute: "Dexterity",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Survival",
    attribute: "Wisdom",
    LevelsBoosted: [],
    IntBoost: null,
  },
  {
    skill: "Thievery",
    attribute: "Dexterity",
    LevelsBoosted: [],
    IntBoost: null,
  },
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
    description: "No Armour",
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
    description:
      "Adventurers who don't wear armor travel in durable clothing. Though it's not armor and uses your unarmored defense proficiency, it still has a Dex Cap and can grant an item bonus to AC if etched with armor potency runes.",
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
    description:
      "This armor is simply a layer of heavy, quilted cloth, but it is sometimes used because it's so inexpensive. Padded armor is easier to damage and destroy than other types of armor. Heavy armor comes with a padded armor undercoat included in its Price, though it loses the comfort trait when worn under heavy armor. You can wear just that padded armor undercoat to sleep in, if your heavy armor is destroyed, or when otherwise not wearing the full heavy armor. This allows you to keep magic armor invested and benefit from the power of any runes on the associated heavy armor, but no one else can wear your heavy armor without the padded undercoat.",
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
    description:
      "A mix of flexible and molded boiled leather, a suit of this type of armor provides some protection with maximum flexibility.",
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
    description:
      "Sometimes called a hauberk, this is a long shirt constructed of the same metal rings as chainmail. However, it is much lighter than chainmail and protects only the torso, upper arms, and upper legs of its wearer.",
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
    description:
      "A mix of furs, sturdy hide, and sometimes molded boiled leather, this armor provides protection due to its layers of leather, though its bulkiness slows the wearer down and decreases mobility.",
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
    description:
      "Scale mail consists of many metal scales sewn onto a reinforced leather backing, often in the form of a long shirt that protects the torso, arms, and legs.",
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
    description:
      "A suit of chain mail consists of several pieces of armor composed of small metal rings linked together in a protective mesh. It typically includes a chain shirt, leggings, a pair of arms, and a coif, collectively protecting most of the body.",
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
    description:
      "Though referred to as a breastplate, this type of armor consists of several pieces of plate or half-plate armor (see below) that protect the torso, chest, neck, and sometimes the hips and lower legs. It strategically grants some of the protection of plate while allowing greater flexibility and speed.",
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
    description:
      "This type of armor is chain mail reinforced with flexible, interlocking metal plates, typically located on the wearer's torso, upper arms, and legs. A suit of this armor comes with an undercoat of padded armor (see above) and a pair of gauntlets.",
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
    description:
      "Half plate consists of most of the upper body plates used in full plate, with lighter or sparser steel plate protection for the arms and legs. This provides some of the protection of full plate with greater flexibility and speed. A suit of this armor comes with an undercoat of padded armor and a pair of gauntlets.",
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
    description:
      "Plate mail consists of interlocking plates that encase nearly the entire body in a carapace of steel. It is costly and heavy, and the wearer often requires help to don it correctly, but it provides some of the best defense armor can supply. A suit of this armor comes with an undercoat of padded armor and a pair of gauntlets.",
  },
];

export const shieldData: shieldItemType[] = [
  {
    name: "None",
    ACBonus: 0,
    Hardness: 0,
    speedPenalty: 0,
    bulk: 0,
    hp: 0,
    bt: 0,
    description: "No Shield",
  },
  {
    name: "Wooden Shield",
    ACBonus: 2,
    Hardness: 3,
    speedPenalty: 0,
    bulk: 1,
    hp: 12,
    bt: 6,
    description:
      "Though they come in a variety of shapes and sizes, the protection offered by wooden shields comes from the stoutness of their materials. While wooden shields are less expensive than steel shields, they break more easily.",
  },
  {
    name: "Steel Shield",
    ACBonus: 2,
    Hardness: 5,
    speedPenalty: 0,
    bulk: 1,
    hp: 20,
    bt: 10,
    description:
      "Like wooden shields, steel shields come in a variety of shapes and sizes. Though more expensive than wooden shields, they are much more durable.",
  },
  {
    name: "Tower Shield",
    ACBonus: 2,
    Hardness: 5,
    speedPenalty: 5,
    bulk: 4,
    hp: 20,
    bt: 10,
    description:
      "These massive shields can be used to provide cover to nearly the entire body. Due to their size, they are typically made of wood reinforced with metal. 2 Getting the higher bonus for a tower shield requires using the Take Cover action while the shield is raised.",
  },
  {
    name: "Fortress Shield",
    ACBonus: 3,
    Hardness: 6,
    speedPenalty: 10,
    bulk: 4,
    hp: 24,
    bt: 12,
    description:
      "Also known as portable walls, these thick and heavy shields are slightly larger than tower shields. Like tower shields, they're typically made from wood reinforced with metal, but many are made from larger amounts of metal or even stone. 2 Getting the higher bonus for a fortress shield requires using the Take Cover action while the shield is raised.",
  },
];
