CREATE TABLE `tocSection` (
	`sectionId` integer NOT NULL,
	`tocId` integer NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`sectionId`, `tocId`),
	FOREIGN KEY (`sectionId`) REFERENCES `toc`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tocId`) REFERENCES `section`(`id`) ON UPDATE no action ON DELETE no action
);
