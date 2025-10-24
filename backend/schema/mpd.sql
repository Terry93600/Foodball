-- Table des rôles
CREATE TABLE roles(
   Id_roles COUNTER,
   nom VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_roles)
);

-- Table des équipes
CREATE TABLE Team(
   Id_Team COUNTER,
   nom VARCHAR(100) NOT NULL,
   logo VARCHAR(255) NOT NULL,
   PRIMARY KEY(Id_Team)
);

-- Table des types d'événements
CREATE TABLE TypeEvent(
   Id_TypeEvent COUNTER,
   nom VARCHAR(100) NOT NULL,
   PRIMARY KEY(Id_TypeEvent)
);

-- Table des utilisateurs
CREATE TABLE Utilisateur(
   Id_Utilisateur COUNTER,
   email VARCHAR(255) NOT NULL,
   nom VARCHAR(50) NOT NULL,
   prenom VARCHAR(50) NOT NULL,
   telephone VARCHAR(20) NOT NULL,
   password VARCHAR(255) NOT NULL,
   resetPasswordToken VARCHAR(255),
   resetPasswordExpires DATETIME,
   Id_roles INT NOT NULL,
   PRIMARY KEY(Id_Utilisateur),
   UNIQUE(email),
   UNIQUE(telephone),
   FOREIGN KEY(Id_roles) REFERENCES roles(Id_roles)
);

-- Table des restaurants
CREATE TABLE Restaurant(
   Id_Restaurant COUNTER,
   nom VARCHAR(100) NOT NULL,
   description TEXT NOT NULL,
   localisation VARCHAR(255) NOT NULL,
   codePostal VARCHAR(5) NOT NULL,
   ville VARCHAR(100) NOT NULL,
   telephone VARCHAR(20) NOT NULL,
   email VARCHAR(255) NOT NULL,
   capacite INT NOT NULL,
   prixMoyen CURRENCY NOT NULL,
   menu TEXT,
   Id_Utilisateur INT NOT NULL,
   Id_team1 INT,
   Id_team2 INT,
   Id_TypeEvent INT,
   PRIMARY KEY(Id_Restaurant),
   FOREIGN KEY(Id_Utilisateur) REFERENCES Utilisateur(Id_Utilisateur),
   FOREIGN KEY(Id_team1) REFERENCES Team(Id_Team),
   FOREIGN KEY(Id_team2) REFERENCES Team(Id_Team),
   FOREIGN KEY(Id_TypeEvent) REFERENCES TypeEvent(Id_TypeEvent),
   CHECK (capacite >= 1 AND capacite <= 1000),
   CHECK (prixMoyen >= 1 AND prixMoyen <= 500)
);

-- Table des événements
CREATE TABLE Event(
   Id_Event COUNTER,
   Id_Team1 INT NOT NULL,
   Id_Team2 INT NOT NULL,
   Id_TypeEvent INT NOT NULL,
   PRIMARY KEY(Id_Event),
   FOREIGN KEY(Id_Team1) REFERENCES Team(Id_Team),
   FOREIGN KEY(Id_Team2) REFERENCES Team(Id_Team),
   FOREIGN KEY(Id_TypeEvent) REFERENCES TypeEvent(Id_TypeEvent),
   CHECK (Id_Team1 <> Id_Team2)
);

-- Index pour les performances
CREATE INDEX idx_utilisateur_email ON Utilisateur(email);
CREATE INDEX idx_restaurant_ville ON Restaurant(ville);
CREATE INDEX idx_restaurant_prix ON Restaurant(prixMoyen);