CREATE TABLE `app` (
	`version` text(10) NOT NULL,
	`freshInstall` integer NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `author` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`bio` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `course` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`duration` integer NOT NULL,
	`sourceCodeRepository` text,
	`description` text,
	`urn` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `dmStatus` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`courseId` integer NOT NULL,
	`vIndex` integer NOT NULL,
	`metaStatus` text NOT NULL,
	`videoStatus` text NOT NULL,
	`captionStatus` text NOT NULL,
	`dtMetaStart` text NOT NULL,
	`dtVideoStart` text,
	`dtCaptionStart` text,
	`dtMetaEnd` text,
	`dtVideoEnd` text,
	`dtCaptionEnd` text,
	`dlMetaRetryCount` integer,
	`dlVideoRetryCount` integer,
	`dlCaptionRetryCount` integer,
	`videoSz` integer,
	`captionSz` integer,
	`finished` integer NOT NULL,
	`interupted` integer NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `dmSetup` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`courseId` integer NOT NULL,
	`finished` integer NOT NULL,
	`availableFmt` text NOT NULL,
	`availableTrans` text NOT NULL,
	`selectedFmt` text NOT NULL,
	`selectedTrans` text NOT NULL,
	`exerciseFiles` text,
	`sourceRepo` text,
	`enableFilenameIndex` integer,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `qState` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`courseId` integer NOT NULL,
	`tocId` integer NOT NULL,
	`idx` integer NOT NULL,
	`state` text NOT NULL,
	`result` text NOT NULL,
	`mState` text NOT NULL,
	`mResult` text NOT NULL,
	`mLoaded` integer NOT NULL,
	`mSize` integer NOT NULL,
	`tState` text NOT NULL,
	`tResult` text NOT NULL,
	`tLoaded` integer NOT NULL,
	`tSize` integer NOT NULL,
	`dtStart` text NOT NULL,
	`dtEnd` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `section` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`courseId` integer NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `streamLocation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tocId` integer NOT NULL,
	`fmt` text(50) NOT NULL,
	`url` text NOT NULL,
	`expiresAt` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `thumbnail` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kind` text(10) NOT NULL,
	`parentId` integer NOT NULL,
	`size` text(50) NOT NULL,
	`url` text NOT NULL,
	`path` text,
	`expiresAt` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `toc` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sectionId` integer NOT NULL,
	`title` text NOT NULL,
    `slug` text NOT NULL,
    `itemStar` text ,
    `visibility` text ,
    `vStatusUrn` text ,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transcript` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tocId` integer NOT NULL,
	`lang` text(50) NOT NULL,
	`fmt` text(50) NOT NULL,
	`url` text NOT NULL,
	`autoGenerated` integer NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `setting` (
	`key` text(100) NOT NULL,
	`value` text NOT NULL,
	`kind` text(50) NOT NULL,
	`description` text(255),
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `exerciseFile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`courseId` integer NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`size` integer NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `authorCourse` (
	`courseId` integer NOT NULL,
	`authorId` integer NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`authorId`, `courseId`),
	FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `course_slug_unique` ON `course` (`slug`);