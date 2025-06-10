ALTER TABLE "subclasses" ADD COLUMN "attribute" "attributes";--> statement-breakpoint
ALTER TABLE "subclasses" ADD COLUMN "training" "skill"[] DEFAULT '{}' NOT NULL;