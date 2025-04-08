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

export type diceTypes = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";

export type AncestryType = {
  name: string;
  Attributes: AttributesType[];
};

export type BackgroundType = {
  name: string;
  Attributes: AttributesType[];
  skills: skillTypes[];
};

export type ClassType = {
  name: string;
  type: string;
  perception: TrainingType;
  saves: {
    fortitude: number[];
    reflex: number[];
    will: number[];
  };
  skills: {
    Acrobatics?: TrainingType;
    Arcana?: TrainingType;
    Athletics?: TrainingType;
    Crafting?: TrainingType;
    Deception?: TrainingType;
    Diplomacy?: TrainingType;
    Intimidation?: TrainingType;
    Medicine?: TrainingType;
    Nature?: TrainingType;
    Occultism?: TrainingType;
    Performance?: TrainingType;
    Religion?: TrainingType;
    Society?: TrainingType;
    Stealth?: TrainingType;
    Survival?: TrainingType;
    Thievery?: TrainingType;
    additional: number;
  };
  attacks: {
    simple: TrainingType;
    martial: TrainingType;
    advanced: TrainingType;
    unarmed: TrainingType;
  };
  defences: {
    unarmoured: TrainingType;
    light: TrainingType;
    medium: TrainingType;
    heavy: TrainingType;
  };
  DC: TrainingType;
  Attributes: AttributesType[];
  subclasses: string[];
  features: {
    name: string;
    level: number;
    description: string;
  }[];
};

export type skillProficienciesType = {
  skill: skillTypes | "";
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
