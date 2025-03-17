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

export type AncestryBackgroundType = {
  name: string;
  Attributes: AttributesType[];
};

export type ClassType = {
  name: string;
  type: string;
  perception: TrainingType;
  saves: {
    fortitude: TrainingType;
    reflex: TrainingType;
    will: TrainingType;
  };
  skills: {
    acrobatics?: TrainingType;
    arcana?: TrainingType;
    athletics?: TrainingType;
    crafting?: TrainingType;
    deception?: TrainingType;
    diplomacy?: TrainingType;
    intimidation?: TrainingType;
    medicine?: TrainingType;
    nature?: TrainingType;
    occultism?: TrainingType;
    performance?: TrainingType;
    religion?: TrainingType;
    society?: TrainingType;
    stealth?: TrainingType;
    survival?: TrainingType;
    thievery?: TrainingType;
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
};

export type FeatsType = {
  level: number;
  feats: { type: FeatTypes; selected: string }[];
};

export type AttributeBoostsType = {
  name: Category;
  boosts: AttributesType[];
};
