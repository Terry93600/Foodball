-- se connecter à Mysql: mysql -h hostname -u username -p
-- Afficher les bases de données : SHOW DATABASES;
-- Utiliser une base de données : USE database_name;
-- Afficher les tabelde de la base de donnée : SHOW TABLES;
-- afficher la structure d'une table de donnée : DESCRIBE table_name;
-- charger un fichier sql (exemple: foodball.sql) : source database/foodball.sql;
DROP DATABASE IF EXISTS foodball;

CREATE DATABASE foodball;

CREATE TABLE foodball.inscription(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

INSERT INTO foodball.inscription VALUES
( NULL, 't@gmail.com', 'terry', 'ter' )
;

-- CREATE TABLE foodball.connexion(
--     id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
-- );
-- INSERT INTO foodball.connexion VALUES
-- ( NULL, "terry@gmail.com" )
-- ;

CREATE TABLE foodball.role(
    id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO foodball.role VALUES
( NULL, 'admin' ),
( NULL, 'restaurateur' )
;

CREATE TABLE foodball.user(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    role_id TINYINT(1) UNSIGNED,
    inscription_id INT UNSIGNED,
    FOREIGN KEY(inscription_id) REFERENCES foodball.inscription(id),
    FOREIGN KEY(role_id) REFERENCES foodball.role(id)
);
INSERT INTO foodball.user VALUES
( NULL, 'admin@admin.com', 'Genly', 'Terry', 1,1),
( NULL, 'user@user.com', 'Genly', 'Laurent', 2,1)
;

CREATE TABLE foodball.team(
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(30) NOT NULL UNIQUE,
    logo VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO foodball.team VALUES
( NULL, 'PSG', 'psg.jpg' ),
( NULL, 'Bayern Munich', 'bayern-munich.jpg' ),
( NULL, 'Real Madrid', 'real-madrid.jpg' ),
( NULL, 'FC Barcelona', 'barcelona.jpg' ),
( NULL, 'Liverpool FC', 'liverpool.jpg' ),
( NULL, 'Manchester City', 'man-city.jpg' ),
( NULL, 'Juventus', 'juventus.jpg' ),
( NULL, 'Chelsea FC', 'chelsea.jpg' ),
( NULL, 'Manchester United', 'man-united.jpg' ),
( NULL, 'Arsenal FC', 'arsenal.jpg' ),
( NULL, 'AC Milan', 'ac-milan.jpg' ),
( NULL, 'Borussia Dortmund', 'dortmund.jpg' )
;


CREATE TABLE foodball.typeEvent(
    id TINYINT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO foodball.typeEvent VALUES
( NULL, 'Ligue 1' ),
( NULL, 'Ligue des champions' ),
( NULL, 'Europa League' ),
( NULL, 'Liga' ),
( NULL, 'Bundesliga' ),
( NULL, 'Première league' )
;

CREATE TABLE foodball.event(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    team1_id TINYINT UNSIGNED,
    team2_id TINYINT UNSIGNED,
    typeEvent_id TINYINT(2) UNSIGNED,
    FOREIGN KEY(team1_id) REFERENCES foodball.team(id),
    FOREIGN KEY(team2_id) REFERENCES foodball.team(id),
    FOREIGN KEY(typeEvent_id) REFERENCES foodball.typeEvent(id)
);

INSERT INTO foodball.event VALUES
( NULL, 1, 2, 2),
( NULL, 1, 3, 2)
;

CREATE TABLE foodball.menu(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

INSERT INTO foodball.menu VALUES
(NULL, 'Kfc'),
(NULL, 'BK'),
(NULL, 'Macdo')
;

CREATE TABLE foodball.plat(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description TEXT,
    menu_id INT UNSIGNED,
    FOREIGN KEY(menu_id) REFERENCES foodball.menu(id)
);

INSERT INTO foodball.plat VALUES
(NULL, 'Burger kfc', 'kfc',1),
(NULL, 'Burger BK', 'BK burger ', 2),
(NULL, 'Burger BK XL', 'BK ', 2),
(NULL, 'Burger BK XXL', 'BK ', 2),
(NULL, 'Burger Macdo', 'Macdo', 3)
;


CREATE TABLE foodball.restaurant(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description TEXT,
    localisation VARCHAR(50) NOT NULL,
    user_id INT UNSIGNED,
    menu_id INT UNSIGNED,
    FOREIGN KEY(user_id) REFERENCES foodball.user(id),
    FOREIGN KEY(menu_id) REFERENCES foodball.menu(id)
    -- PRIMARY KEY(menu_id, user_id)
);

INSERT INTO foodball.restaurant VALUES
( NULL, 'KFC', 'Le poulet c est trop bon', '2;48', 1, 3),
( NULL, 'BK', 'Burger', '2;48', 1, 2)
;

CREATE TABLE foodball.restaurantEvent(
    restaurant_id INT UNSIGNED,
    event_id INT UNSIGNED,
    FOREIGN KEY(restaurant_id) REFERENCES foodball.restaurant(id),
    FOREIGN KEY(event_id) REFERENCES foodball.event(id),
    PRIMARY KEY(restaurant_id, event_id)
);

INSERT INTO foodball.restaurantEvent VALUES
( 1,1)
;