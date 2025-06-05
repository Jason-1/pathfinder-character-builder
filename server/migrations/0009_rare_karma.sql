CREATE TYPE "public"."skills" AS ENUM('Acrobatics', 'Arcana', 'Athletics', 'Crafting', 'Deception', 'Diplomacy', 'Intimidation', 'Medicine', 'Nature', 'Occultism', 'Performance', 'Religion', 'Society', 'Stealth', 'Survival', 'Thievery');--> statement-breakpoint
ALTER TABLE "additionalSkills" ADD COLUMN "additional" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "attacks" ADD COLUMN "simple" integer[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "attacks" ADD COLUMN "martial" integer[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "attacks" ADD COLUMN "advanced" integer[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "attacks" ADD COLUMN "unarmed" integer[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "defences" ADD COLUMN "unarmoured" integer[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "defences" ADD COLUMN "light" integer[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "defences" ADD COLUMN "medium" integer[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "defences" ADD COLUMN "heavy" integer[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "level" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "description" text DEFAULT 'No description available' NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "skill" "skills" NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "proficiency" "training" DEFAULT 'Untrained' NOT NULL;