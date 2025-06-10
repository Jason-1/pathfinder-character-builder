export type Category =
  | "Ancestry"
  | "Background"
  | "Class"
  | "Initial"
  | "Level5"
  | "Level10"
  | "Level15"
  | "Level20";

export type AttributesType =
  | "Strength"
  | "Dexterity"
  | "Constitution"
  | "Intelligence"
  | "Wisdom"
  | "Charisma"
  | "Free";

export type TrainingType =
  | "Untrained"
  | "Trained"
  | "Expert"
  | "Master"
  | "Legendary";

export type FeatTypes =
  | "Ancestry"
  | "Class"
  | "Archetype"
  | "Skill"
  | "Paragon"
  | "General"
  | "Martial";

export type skillTypes =
  | "Acrobatics"
  | "Arcana"
  | "Athletics"
  | "Crafting"
  | "Deception"
  | "Diplomacy"
  | "Intimidation"
  | "Medicine"
  | "Nature"
  | "Occultism"
  | "Performance"
  | "Religion"
  | "Society"
  | "Stealth"
  | "Survival"
  | "Thievery";

export type saveTypes = "fortitude" | "reflex" | "will";

export type armourTypes = "unarmoured" | "light" | "medium" | "heavy";

export type weaponTypes = "unarmed" | "simple" | "martial" | "advanced";

export type diceTypes = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";

export type AncestryType = {
  name: string;
  Attributes: AttributesType[];
  hp: number;
  speed: number;
  size: string;
  description: string;
};

export type BackgroundType = {
  name: string;
  Attributes: AttributesType[];
  skills: skillTypes[];
  description: string;
};

export type ClassType = {
  name: string;
  type: string;
  tradition?: string;
  perception: number[];
  saves: {
    fortitude: number[];
    reflex: number[];
    will: number[];
  };
  skills: {
    skillsArray: skillTypes[];
    additional: number;
  };
  attacks: {
    simple: number[];
    martial: number[];
    advanced: number[];
    unarmed: number[];
  };
  defences: {
    unarmoured: number[];
    light: number[];
    medium: number[];
    heavy: number[];
  };
  specialisation: number[];
  DC: TrainingType;
  hp: number;
  attributes: AttributesType[];
  spellSlots: spellObjectType[];
  features: {
    name: string;
    level: number;
    description: string;
  }[];
  description: string;
};

export type subclassType = {
  name: string;
  className?: string;
  attribute?: AttributesType;
  training?: skillTypes[] | [];
  description: string;
};

export type skillProficienciesType = {
  skill: skillTypes | "";
  attribute: AttributesType;
  LevelsBoosted: number[];
  IntBoost: number | null;
};

export type FeatsType = {
  level: number;
  feats: { type: FeatTypes; selected: string }[];
};

export type AttributeBoostsType = {
  name: Category;
  boosts: AttributesType[];
};

export type armourItemType = {
  name: string;
  category: armourTypes;
  ACBonus: number;
  dexCap: number;
  strength: number;
  checkPenalty: number;
  speedPenalty: number;
  bulk: string;
  group: string;
  description: string;
};

export type shieldItemType = {
  name: string;
  ACBonus: number;
  Hardness: number;
  speedPenalty: number;
  bulk: number | string;
  hp: number;
  bt: number;
  description: string;
};

export type shieldReinforcingRunes =
  | "None"
  | "Minor"
  | "Lesser"
  | "Moderate"
  | "Greater"
  | "Major"
  | "Supreme";

export type shieldReinforcingType = {
  name: shieldReinforcingRunes;
  HardnessBonus: number;
  HPBonus: number;
  BTBonus: number;
  HardnessMaximum: number;
  HPMaximum: number;
  BTMaximum: number;
};

export type weaponItemType = {
  name: string;
  category: weaponTypes;
  damage: diceTypes;
  damageType: string;
  bulk: number | string;
  group: string;
  hands: number | string;
  type: string;
  reload?: number;
  range?: number;
  description: string;
  traits: string[];
};

export type classFeatType = {
  name: string;
  pfs: string;
  source: string;
  rarity: string;
  traits: string;
  level: number;
  prerequisites: string;
  preview: string;
  "spoilers?": string;
  link: string;
  description: string;
  action_cost?: string;
};

export type spellObjectType = {
  level: number;
  cantrips: number;
  spellSlots: number[];
};

export type highlightedFeatDataType = {
  level: number;
  featType: string;
  featData: classFeatType;
};

export type spellType = {
  name: string;
  pfs: string;
  source: string;
  traditions: string[];
  rarity: string;
  traits: string[];
  cantrip?: boolean;
  focus?: boolean;
  level: number;
  summary: string;
  heightenable?: boolean;
  link: string;
  action: string;
  bloodline?: string;
  component?: string;
  attributes: {
    Range?: string;
    Area?: string;
    raw?: string;
    Targets?: string;
    Duration?: string;
    "Saving Throw"?: string;
  };
  description: string;
  heightened?: string[];
};

export type selectedSpellsType = {
  rank: number;
  spells: idividualSelectedSpellType[];
};

export type idividualSelectedSpellType = {
  name: string;
  position: number;
};
