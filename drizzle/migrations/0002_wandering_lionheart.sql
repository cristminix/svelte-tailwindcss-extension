CREATE TABLE `exerciseFile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`courseId` integer NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`size` integer NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
