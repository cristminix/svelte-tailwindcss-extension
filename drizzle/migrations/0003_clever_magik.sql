CREATE TABLE `authorCourse` (
	`courseId` integer NOT NULL,
	`authorId` integer NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`authorId`, `courseId`),
	FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON UPDATE no action ON DELETE no action
);
