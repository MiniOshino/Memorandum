CREATE TABLE `stats` (
	`user_name` text NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	PRIMARY KEY(`key`, `user_name`),
	FOREIGN KEY (`user_name`) REFERENCES `users`(`user_name`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_name` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `user_name_idx` ON `stats` (`user_name`);