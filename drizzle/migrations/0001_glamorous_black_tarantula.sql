CREATE TABLE `setting` (
	`key` text(100) NOT NULL,
	`value` text NOT NULL,
	`kind` text(50) NOT NULL,
	`description` text(255),
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
