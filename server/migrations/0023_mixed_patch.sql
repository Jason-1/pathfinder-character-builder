CREATE TABLE "background" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"attributes" "attributes"[] DEFAULT '{}' NOT NULL,
	"skills" "skill"[] DEFAULT '{}' NOT NULL,
	"description" text DEFAULT 'No description available'
);
--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "background_name" varchar(255);--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_background_name_background_name_fk" FOREIGN KEY ("background_name") REFERENCES "public"."background"("name") ON DELETE no action ON UPDATE no action;