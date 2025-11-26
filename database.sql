-- tabla de usuarios
CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(200),
    email VARCHAR(200) UNIQUE,
    role ENUM(
        'admin',
        'capturista',
        'consulta'
    ) DEFAULT 'consulta',
    last_login DATETIME DEFAULT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- tabla principal: archives
CREATE TABLE archives (
    archives_id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
    folio VARCHAR(100) UNIQUE NOT NULL,
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
CREATE TABLE related_entries (
    related_entries_id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
    archive_id CHAR(36) NOT NULL,
    reference_folio VARCHAR(100),
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
CREATE INDEX idx_archives_folio ON archives (folio);

CREATE INDEX idx_related_archive_id ON related_entries (archive_id);

CREATE INDEX idx_related_archive_folio ON related_entries (reference_folio);