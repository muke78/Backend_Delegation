-- tabla de usuarios

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(200),
    email VARCHAR(200) UNIQUE,
    role ENUM(
        'Administrador',
        'Capturista',
        'Consultora'
    ) DEFAULT 'Consultora',
    last_login DATETIME DEFAULT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- tabla principal: archives

DROP TABLE IF EXISTS archives;

CREATE TABLE archives (
    archives_id CHAR(36) PRIMARY KEY,
    identifier VARCHAR(20) NOT NULL, -- PI, CN, OEM, etc.
    base_folio VARCHAR(50) NOT NULL, -- DYCCDC2528
    folio VARCHAR(100) UNIQUE NOT NULL, -- PI-DYCCDC2528
    name VARCHAR(255) NOT NULL,
    doc_type VARCHAR(100),
    year INT,
    storage_path TEXT,
    source_sheet VARCHAR(100),
    created_by CHAR(36) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users (user_id)
);

-- tabla related_entries

DROP TABLE IF EXISTS related_entries;

CREATE TABLE related_entries (
    related_entries_id CHAR(36) PRIMARY KEY,
    archive_id CHAR(36) NOT NULL,
    reference_number INT UNIQUE NOT NULL, -- 1, 2, 3...
    reference_folio VARCHAR(150) UNIQUE NOT NULL, -- PI-DYCCDC2528-01
    description TEXT,
    event_date DATE,
    responsible_person VARCHAR(255),
    responsible_role VARCHAR(150),
    notas TEXT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (archive_id) REFERENCES archives (archives_id) ON DELETE CASCADE
);

-- índices
CREATE INDEX idx_archives_folio ON archives(folio);

CREATE INDEX idx_related_archive_id ON related_entries(archive_id);

CREATE INDEX idx_related_reference_folio ON related_entries(reference_folio);

CREATE INDEX idx_related_archive_refnum ON related_entries(archive_id, reference_number);