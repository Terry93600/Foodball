-- Se connecter à MySQL : mysql -h hostname -u username -p
-- Afficher les bases de données : SHOW DATABASES;
-- Utiliser une base de données : USE database_name;
-- Afficher les tables de la base de données : SHOW TABLES;
-- Afficher la structure d'une table de données : DESCRIBE table_name;
-- Charger un fichier SQL (exemple : foodball.sql) : source database/foodball.sql;

-- Supprimer la base de données si elle existe
DROP DATABASE IF EXISTS foodball;

-- Créer une nouvelle base de données
CREATE DATABASE foodball;

-- Utiliser la base de données nouvellement créée
USE foodball;

-- Créer une table "role"
CREATE TABLE foodball.role (
    id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(20) NOT NULL UNIQUE
);

-- Insérer des données dans la table "role"
INSERT INTO foodball.role (nom) VALUES
('admin'),
('restaurateur');

-- Créer une table "utilisateur"
CREATE TABLE foodball.utilisateur (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role_id TINYINT(1) UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES foodball.role(id)
);

-- Insérer des données dans la table "utilisateur"
INSERT INTO foodball.utilisateur (email, name, password, role_id) VALUES
('t@gmail.com', 'terry', 'ter', 1),
('ter@gmail.com', 'terry', 'ter', 2);

-- Créer une table "team"
CREATE TABLE foodball.team (
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(30) NOT NULL UNIQUE,
    logo VARCHAR(50) NOT NULL UNIQUE
);

-- Insérer des données dans la table "team"
INSERT INTO foodball.team (nom, logo) VALUES
('PSG', 'psg.jpg'),
('Bayern Munich', 'bayern-munich.jpg'),
('Real Madrid', 'real-madrid.jpg'),
('FC Barcelona', 'barcelona.jpg'),
('Liverpool FC', 'liverpool.jpg'),
('Manchester City', 'man-city.jpg'),
('Juventus', 'juventus.jpg'),
('Chelsea FC', 'chelsea.jpg'),
('Manchester United', 'man-united.jpg'),
('Arsenal FC', 'arsenal.jpg'),
('AC Milan', 'ac-milan.jpg'),
('Borussia Dortmund', 'dortmund.jpg');

-- Créer une table "typeEvent"
CREATE TABLE foodball.typeEvent (
    id TINYINT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(30) NOT NULL UNIQUE
);

-- Insérer des données dans la table "typeEvent"
INSERT INTO foodball.typeEvent (nom) VALUES
('Ligue 1'),
('Ligue des champions'),
('Europa League'),
('Liga'),
('Bundesliga'),
('Première League');

-- Créer une table "event"
CREATE TABLE foodball.event (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    team1_id TINYINT UNSIGNED,
    team2_id TINYINT UNSIGNED,
    typeEvent_id TINYINT(2) UNSIGNED,
    FOREIGN KEY (team1_id) REFERENCES foodball.team(id),
    FOREIGN KEY (team2_id) REFERENCES foodball.team(id),
    FOREIGN KEY (typeEvent_id) REFERENCES foodball.typeEvent(id)
);

-- Insérer des données dans la table "event"
INSERT INTO foodball.event (team1_id, team2_id, typeEvent_id) VALUES
(1, 2, 2),
(1, 3, 2),
(4, 6, 2);

-- Créer une table "restaurant"
CREATE TABLE foodball.restaurant (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) ,
    description TEXT,
    localisation VARCHAR(100) ,
    menu TEXT ,
    utilisateur_id INT UNSIGNED, 
    FOREIGN KEY (utilisateur_id) REFERENCES foodball.utilisateur(id)
);

-- Insérer des données dans la table "restaurant"
INSERT INTO foodball.restaurant (nom, description, localisation, menu, utilisateur_id) VALUES
('KFC', 'Le poulet c est trop bon', 'rue du général de gaule',"kojsdf.pdf", 1),
('Burger King', 'Goûtez la flamme, savourez le Whopper ! Burger King, là où les flammes rencontrent la saveur. ', 'BK BK BK',"https://res.cloudinary.com/dbswf4zf2/image/upload/v1698934085/ijpjtrz19evbfvoo36vh.jpg", 2)
-- ('macdo','','','',2)
;

-- Créer une table "restaurantEvent"
CREATE TABLE foodball.restaurantEvent (
    restaurant_id INT UNSIGNED,
    event_id INT UNSIGNED,
    FOREIGN KEY (restaurant_id) REFERENCES foodball.restaurant(id),
    FOREIGN KEY (event_id) REFERENCES foodball.event(id),
    PRIMARY KEY (restaurant_id, event_id)
);

-- Insérer des données dans la table "restaurantEvent"
INSERT INTO foodball.restaurantEvent (restaurant_id, event_id) VALUES
(1, 1),
(2, 2)
;
