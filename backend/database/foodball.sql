DROP DATABASE IF EXISTS foodball;

CREATE DATABASE foodball;

CREATE TABLE foodball.role(
    id TINYINT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE foodball.user(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    role_id TINYINT(1) UNSIGNED,
    FOREIGN KEY(role_id) REFERENCES foodball.role(id)
);

CREATE TABLE foodball.team(
    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(30) NOT NULL UNIQUE,
    logo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE foodball.typeEvent(
    id TINYINT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE foodball.event(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    team1_id TINYINT UNSIGNED,
    team2_id TINYINT UNSIGNED,
    typeEvent_id TINYINT(2) UNSIGNED,
    FOREIGN KEY(team1_id) REFERENCES foodball.team(id),
    FOREIGN KEY(team2_id) REFERENCES foodball.team(id),
    FOREIGN KEY(typeEvent_id) REFERENCES foodball.typeEvent(id)
);

CREATE TABLE foodball.restaurant(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description TEXT,
    localisation VARCHAR(50) NOT NULL,
    is_validate BOOLEAN NOT NULL,
    menu VARCHAR(50),
    user_id INT UNSIGNED,
    FOREIGN KEY(user_id) REFERENCES foodball.user(id)
);

CREATE TABLE foodball.restaurantEvent(
    restaurant_id INT UNSIGNED,
    event_id INT UNSIGNED,
    FOREIGN KEY(restaurant_id) REFERENCES foodball.restaurant(id),
    FOREIGN KEY(event_id) REFERENCES foodball.event(id),
    PRIMARY KEY(restaurant_id, event_id)
);

-- insertion des données
INSERT INTO foodball.role VALUES
( NULL, 'admin' ),
( NULL, 'restaurateur' )
;

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
( NULL, 'Borussia Dortmund', 'dortmund.jpg' );
;

INSERT INTO foodball.typeEvent VALUES
( NULL, 'Ligue 1' ),
( NULL, 'Ligue des champions' ),
( NULL, 'Europa League' ),
( NULL, 'Liga' ),
( NULL, 'Bundesliga' ),
( NULL, 'Première league' )
;

INSERT INTO foodball.user VALUES
( NULL, 'admin@admin.com', 'Genly', 'Terry', 1),
( NULL, 'user@user.com', 'Genly', 'Laurent', 2)
;

INSERT INTO foodball.event VALUES
( NULL, 1, 4, 2),
( NULL, 1, 6, 2)
;

INSERT INTO foodball.restaurant VALUES
( NULL, 'KFC', 'Le poulet c est trop bon', 'non', true, 'Menu', 2),
( NULL, 'MACDO', 'Le poulet c est trop bon', 'non', true, 'Menu', 2),
( NULL, 'BK', 'Le poulet c est trop bon', 'non', true, 'Menu', 2),
( NULL, 'QUICK', 'Le poulet c est trop bon', 'non', true, 'Menu', 2)
;

INSERT INTO foodball.restaurantEvent VALUES
( 1,1),
( 2,2),
( 3,2)
;