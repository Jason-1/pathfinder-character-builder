CREATE TABLE "additionalSkills" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "attacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "defences" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "features" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "saves" ADD COLUMN "fortitude" integer[] NOT NULL;--> statement-breakpoint
ALTER TABLE "saves" ADD COLUMN "reflex" integer[] NOT NULL;--> statement-breakpoint
ALTER TABLE "saves" ADD COLUMN "will" integer[] NOT NULL;--> statement-breakpoint
ALTER TABLE "additionalSkills" ADD CONSTRAINT "additionalSkills_class_name_classes_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attacks" ADD CONSTRAINT "attacks_class_name_classes_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "defences" ADD CONSTRAINT "defences_class_name_classes_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "features" ADD CONSTRAINT "features_class_name_classes_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_class_name_classes_name_fk" FOREIGN KEY ("class_name") REFERENCES "public"."classes"("name") ON DELETE no action ON UPDATE no action;