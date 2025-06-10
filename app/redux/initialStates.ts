import { armourItemType, ClassType, subclassType } from "@/types";

export const initialClassState: ClassType = {
  name: "Fighter",
  type: "Martial",
  perception: [1, 1, 7],
  saves: {
    fortitude: [1, 1, 9],
    reflex: [1, 1, 15],
    will: [1, 3],
  },
  skills: {
    skillsArray: ["Acrobatics", "Athletics"],
    additional: 3,
  },
  attacks: {
    simple: [1, 1, 13, 19],
    martial: [1, 1, 13, 19],
    advanced: [1, 13, 19],
    unarmed: [1, 1, 13, 19],
  },
  defences: {
    unarmoured: [1, 11, 17],
    light: [1, 11, 17],
    medium: [1, 11, 17],
    heavy: [1, 11, 17],
  },
  specialisation: [7, 15],
  DC: "Trained",
  hp: 10,
  attributes: ["Strength", "Dexterity"],
  spellSlots: [],
  features: [
    {
      name: "Reactive Strike",
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
  description:
    "Fighting for honor, greed, loyalty, or simply the thrill of battle, you are an undisputed master of weaponry and combat techniques. You combine your actions through clever combinations of opening moves, finishing strikes, and counterattacks whenever your foes are unwise enough to drop their guard. Whether you are a knight, mercenary, sharpshooter, or blade master, you have honed your martial skills into an art form and perform devastating critical attacks on your enemies.",
};

export const initialArmourState: armourItemType = {
  name: "Unarmoured",
  category: "unarmoured",
  ACBonus: 0,
  dexCap: 5,
  strength: 0,
  checkPenalty: 0,
  speedPenalty: 0,
  bulk: "0",
  group: "",
  description: "No Armour",
};

export const initialSubclassState: subclassType = {
  name: "Select a subclass",
  description: "No subclass selected",
};
