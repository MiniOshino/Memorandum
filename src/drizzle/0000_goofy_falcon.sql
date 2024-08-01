CREATE TABLE IF NOT EXISTS "users" (
	"userName" text PRIMARY KEY NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_userName_unique" UNIQUE("userName")
);
