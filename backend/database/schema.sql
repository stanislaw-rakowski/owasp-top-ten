CREATE TABLE Accounts (
    organizationId VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (organizationId)
);

CREATE TABLE Shelters (
    shelterId VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    owner VARCHAR(255),
    published BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (shelterId),
    FOREIGN KEY (owner) REFERENCES Accounts(organizationId) ON DELETE SET NULL
);

CREATE TABLE Employees (
    id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    shelter VARCHAR(255),
    organization VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (shelter) REFERENCES Shelters(shelterId) ON DELETE SET NULL,
    FOREIGN KEY (organization) REFERENCES Accounts(organizationId) ON DELETE SET NULL
);

CREATE TABLE Animals (
    id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    birthDate VARCHAR(255),
    gender ENUM('male', 'female'),
    species ENUM('dog', 'cat', 'other'),
    adopted BOOLEAN NOT NULL DEFAULT false,
    adoptionDate VARCHAR(255),
    description MEDIUMTEXT,
    shelter VARCHAR(255),
    organization VARCHAR(255),
    employee VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (shelter) REFERENCES Shelters(shelterId) ON DELETE SET NULL,
    FOREIGN KEY (organization) REFERENCES Accounts(organizationId) ON DELETE SET NULL,
    FOREIGN KEY (employee) REFERENCES Employees(id) ON DELETE SET NULL
);

