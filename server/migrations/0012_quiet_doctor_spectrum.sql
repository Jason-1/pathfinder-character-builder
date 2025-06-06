ALTER TABLE "additionalSkills" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "additionalSkills" CASCADE;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "level" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "skill" SET DATA TYPE "public"."skill"[] USING "skill"::text::"public"."skill"[];--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "additional" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "skills" DROP COLUMN "proficiency";