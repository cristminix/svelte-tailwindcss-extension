ALTER TABLE `thumbnail` RENAME COLUMN `courseId` TO `parentId`;--> statement-breakpoint
ALTER TABLE `thumbnail` ADD `kind` text(10) NOT NULL;