CREATE TABLE "stats" (
	"user_name" text NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	CONSTRAINT "stats_user_name_key_pk" PRIMARY KEY("user_name","key")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_name" text PRIMARY KEY NOT NULL,
	"password" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "stats" ADD CONSTRAINT "stats_user_name_users_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "public"."users"("user_name") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_name_idx" ON "stats" USING btree ("user_name","key");