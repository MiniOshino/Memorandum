CREATE TABLE IF NOT EXISTS "flags" (
	"id" serial PRIMARY KEY NOT NULL,
	"flag_name" text PRIMARY KEY NOT NULL,
	CONSTRAINT "flags_flag_name_unique" UNIQUE("flag_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_flags" (
	"user_name" text NOT NULL,
	"flag_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_to_flags_user_name_flag_id_pk" PRIMARY KEY("user_name","flag_id")
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "userName" TO "user_name";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_userName_unique";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_flags" ADD CONSTRAINT "users_to_flags_user_name_users_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "public"."users"("user_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_flags" ADD CONSTRAINT "users_to_flags_flag_id_flags_id_fk" FOREIGN KEY ("flag_id") REFERENCES "public"."flags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_name_unique" UNIQUE("user_name");