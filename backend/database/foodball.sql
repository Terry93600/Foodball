-- se connecter à Mysql: mysql -h hostname -u username -p
-- Afficher les bases de données : SHOW DATABASES;
-- Utiliser une base de données : USE database_name;
-- Afficher les tabelde de la base de donnée : SHOW TABLES;
-- afficher la structure d'une table de donnée : DESCRIBE table_name;
-- charger un fichier sql (exemple: foodball.sql) : source database/foodball.sql;
DROP DATABASE IF EXISTS foodball;

CREATE DATABASE foodball CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE foodball.inscription(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO foodball.inscription VALUES
( NULL, 't@gmail.com', 'terry', 'ter' ),
( NULL, 'ter@gmail.com', 'terry', 'ter' )
;

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
( NULL, 'admin@adminnnnn.com', 'Genlyyyyy', 'Terry', 1,1),
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
( NULL, 1, 3, 2),
( NULL, 4, 6, 2)
;

CREATE TABLE foodball.menu(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

INSERT INTO foodball.menu VALUES
(NULL, 'Kfc'),
(NULL, 'Burger King'),
(NULL, 'Mcdonald'),
(NULL, 'Pizza Hut'),
(NULL, 'Subway'),
(NULL, 'Starbuck'),
(NULL, 'Sushi Sama'),
(NULL, 'Taco Bell'),
(NULL, 'Café du Coin'),
(NULL, 'Subito Pizza')
;

CREATE TABLE foodball.plat(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description TEXT,
    composition TEXT,
    menu_id INT UNSIGNED,
    FOREIGN KEY(menu_id) REFERENCES foodball.menu(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO foodball.plat VALUES
(NULL, 'Crousty Box', 'Le croustillant à son meilleur', 'Filet de poulet croustillant, frites, boisson', 1),
(NULL, 'KFC Tower', 'Le plaisir de l hauteur', 'Double filet de poulet, bacon, fromage, sauce, pain aux graines de sésame', 1),
(NULL, 'Hot Wings', 'Pour les amateurs de sensations fortes', 'Morceaux de poulet épicés, sauce au choix', 1),
(NULL, 'Chicken Wrap', 'Tout le poulet dans un wrap', 'Filet de poulet grillé, tortilla, laitue, tomate, fromage, sauce', 1),
(NULL, 'Boxmaster', 'Le maître des saveurs', 'Double filet de poulet, bacon, tortilla, fromage, sauce, salade', 1),
(NULL, 'Bouche Zinger', 'Le goût épicé', 'Filet de poulet pané épicé, pain aux graines de sésame, salade, sauce, tomate', 1),
(NULL, 'Twister', 'Un tourbillon de saveurs', 'Filet de poulet grillé, tortilla, salade, sauce, tomate, fromage', 1),
(NULL, 'Krunchy', 'La croustillance à son meilleur', 'Filet de poulet pané, pain aux graines de sésame, salade, sauce, tomate', 1),
(NULL, 'Chicken Popcorn', 'Des morceaux de poulet à déguster', 'Morceaux de poulet panés, sauce au choix', 1),
(NULL, 'KFC Salad', 'Une salade fraîche et délicieuse', 'Laitue, tomate, concombre, poivrons, olives, poulet grillé, vinaigrette', 1),
(NULL, 'Whopper', 'Le fameux Whopper de Burger King', 'Steak de bœuf, pain, oignons, tomate, laitue, mayonnaise', 2),
(NULL, 'Double Whopper', 'Deux steaks pour plus de plaisir', 'Deux steaks de bœuf, pain, oignons, tomate, laitue, mayonnaise', 2),
(NULL, 'Steakhouse', 'Le goût du steakhouse dans un burger', 'Steak de bœuf, pain aux graines de sésame, fromage, bacon, oignons grillés, laitue, tomate, ketchup, mayonnaise', 2),
(NULL, 'Bacon King', 'Le roi du bacon', 'Double steak de bœuf, bacon croustillant, fromage, ketchup, mayonnaise, pain de sésame', 2),
(NULL, 'Chicken Royale', 'Pour les amateurs de poulet', 'Filet de poulet pané, pain, salade, tomate, sauce, mayonnaise', 2),
(NULL, 'Big King XXL', 'Le géant du burger', 'Trois steaks de bœuf, pain, oignons, cornichons, salade, tomate, ketchup, mayonnaise', 2),
(NULL, 'Bacon & Cheese', 'Avec du bacon et du fromage', 'Steak de bœuf, bacon, fromage fondu, pain aux graines de sésame, oignons, ketchup, mayonnaise', 2),
(NULL, 'Cheeseburger', 'Un classique au fromage', 'Steak de bœuf, fromage, pain, oignons, cornichons, moutarde, ketchup', 2),
(NULL, 'Chicken Nugget', 'De tendres morceaux de poulet', 'Morceaux de poulet panés, sauce au choix', 2),
(NULL, 'Fish Royale', 'Pour les amateurs de poisson', 'Filet de poisson pané, pain, salade, sauce tartare', 2),
(NULL, 'Burger McDonald', 'Le classique de McDonald', 'Steak de bœuf, fromage, pain, cornichons, oignons, ketchup, moutarde', 3),
(NULL, 'McChicken', 'Le sandwich McChicken classique', 'Filet de poulet pané, pain, laitue, sauce, mayonnaise', 3),
(NULL, 'Big Mac', 'Le célèbre Big Mac', 'Deux steaks de bœuf, pain, laitue, cornichons, oignons, fromage, sauce spéciale', 3),
(NULL, 'Filet-O-Fish', 'Le sandwich au poisson', 'Filet de poisson pané, pain, laitue, sauce tartare', 3),
(NULL, 'Cheeseburger', 'Le classique Cheeseburger', 'Steak de bœuf, fromage, pain, oignons, cornichons, moutarde, ketchup', 3),
(NULL, 'McDouble', 'Double cheeseburger', 'Deux steaks de bœuf, pain, fromage, cornichons, oignons, ketchup, moutarde', 3),
(NULL, 'McNuggets', 'Chicken McNuggets', 'Morceaux de poulet panés, sauce au choix', 3),
(NULL, 'Quarter Pounder', 'Quarter Pounder avec fromage', 'Steak de bœuf, fromage, pain aux graines de sésame, cornichons, oignons, ketchup, moutarde', 3),
(NULL, 'McWrap', 'Wrap au poulet', 'Filet de poulet grillé, tortilla, salade, tomate, fromage, sauce', 3),
(NULL, 'Salade Caesar', 'Salade Caesar au poulet', 'Laitue romaine, poulet grillé, croûtons, parmesan, sauce Caesar', 3),
(NULL, 'Happy Meal', 'Le Happy Meal pour les enfants', 'Un choix de menu pour les enfants avec un jouet', 3);

CREATE TABLE foodball.restaurant(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description TEXT,
    localisation VARCHAR(100) NOT NULL,
    user_id INT UNSIGNED,
    menu_id INT UNSIGNED,
    FOREIGN KEY(user_id) REFERENCES foodball.user(id),
    FOREIGN KEY(menu_id) REFERENCES foodball.menu(id)
);

INSERT INTO foodball.restaurant VALUES
( NULL, 'KFC', 'Le poulet c est trop bon', 'rue du général de gaule', 1, 1),
( NULL, 'BK', 'Burger', '2;48', 2, 2),
( NULL, 'McDonald', 'Les meilleurs burgers et frites', '123 Rue de la République', 3, 3),
( NULL,'Pizza Hut', 'Pizza délicieuse et variée', '42 Avenue des Pizzas', 3, 4),
( NULL,'Subway', 'Des sandwiches personnalisés', '5 Rue du Métro', 1, 5)
-- ( NULL,'Starbucks', 'Café et boissons gourmandes', '7 Place du Café', 6, 3),
-- ( NULL,'Sushi Sama', 'Sushis frais et délicieux', '9 Rue des Sushis', 7, 6),
-- ( NULL,'Taco Bell', 'Saveurs mexicaines', '12 Avenida de Tacos', 8, 2),
-- ( NULL,'Café du Coin', 'Ambiance chaleureuse', '16 Rue du Café', 10, 1),
-- ( NULL,'Burger King', 'Les rois du burger', '18 King Street', 11, 1),
-- ( NULL,'Subito Pizza', 'Livraison rapide de pizzas', '20 Via Pizza', 12, 4);
;

CREATE TABLE foodball.restaurantEvent(
    restaurant_id INT UNSIGNED,
    event_id INT UNSIGNED,
    FOREIGN KEY(restaurant_id) REFERENCES foodball.restaurant(id),
    FOREIGN KEY(event_id) REFERENCES foodball.event(id),
    PRIMARY KEY(restaurant_id, event_id)
);

INSERT INTO foodball.restaurantEvent VALUES
( 2,3),
( 1,1),
( 3,2),
( 4,3),
( 5,2)
;