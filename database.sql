-- tabla de usuarios

DROP TABLE IF EXISTS users;

CREATE TABLE `users` (
    `user_id` char(36) NOT NULL,
    `username` varchar(100) NOT NULL,
    `password_hash` varchar(255) NOT NULL,
    `full_name` varchar(200) DEFAULT NULL,
    `email` varchar(200) DEFAULT NULL,
    `role` enum(
        'Administrador',
        'Capturista',
        'Consultora'
    ) DEFAULT 'Consultora',
    `last_login` datetime DEFAULT NULL,
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

-- tabla principal: archives

DROP TABLE IF EXISTS archives;

CREATE TABLE `archives` (
    `archives_id` char(36) NOT NULL,
    `identifier` varchar(20) NOT NULL,
    `base_folio` varchar(50) NOT NULL,
    `folio` varchar(100) NOT NULL,
    `name` varchar(255) NOT NULL,
    `doc_type` varchar(100) DEFAULT NULL,
    `year` int NOT NULL,
    `storage_path` text,
    `source_sheet` varchar(100) DEFAULT NULL,
    `created_by` char(36) NOT NULL,
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`archives_id`),
    UNIQUE KEY `folio` (`folio`),
    KEY `created_by` (`created_by`),
    CONSTRAINT `archives_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

-- tabla related_entries

DROP TABLE IF EXISTS related_entries;

CREATE TABLE `related_entries` (
    `related_entries_id` char(36) NOT NULL,
    `archive_id` char(36) NOT NULL,
    `reference_number` int NOT NULL,
    `reference_folio` varchar(150) NOT NULL,
    `description` text NOT NULL,
    `event_date` date NOT NULL,
    `responsible_person` varchar(255) DEFAULT NULL,
    `responsible_role` varchar(150) DEFAULT NULL,
    `notas` text,
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`related_entries_id`),
    UNIQUE KEY `reference_folio` (`reference_folio`),
    KEY `idx_related_archive_id` (`archive_id`),
    KEY `idx_related_archive_refnum` (
        `archive_id`,
        `reference_number`
    ),
    CONSTRAINT `related_entries_ibfk_1` FOREIGN KEY (`archive_id`) REFERENCES `archives` (`archives_id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci