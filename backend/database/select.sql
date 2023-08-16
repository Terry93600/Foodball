-- -- récupérer tous les admins
-- SELECT user.*, role.name
-- FROM foodball.user
-- JOIN foodball.role
-- ON role.id = user.role_id
-- ;

-- -- récupérer les équipes
-- SELECT event.*, team.nom FROM foodball.event JOIN foodball.team ON team.id = event.team1_id;
-- SELECT event.*, team.nom FROM foodball.event JOIN foodball.team ON team.id = event.team2_id;
-- SELECT event.*, typeEvent.nom FROM foodball.event JOIN foodball.typeEvent ON typeEvent.id = event.typeEvent_id;

-- -- Récupérer les resto
-- SELECT restaurant.*, user.nom FROM foodball.restaurant JOIN foodball.user ON user.id = restaurant.user_id;

-- -- selectionner user
--  source database/foodball.sql; table foodball.role; table foodball.team; table foodball.typeEvent; table foodball.user;

select restaurant.*,
t1.nom as team1,
t2.nom as team2,
user.email, 
role.name as role,
typeEvent.nom as typeEvent

FROM foodball.restaurant
JOIN foodball.event
JOIN foodball.restaurantEvent
ON restaurantEvent.event_id = event.id
AND restaurantEvent.restaurant_id = restaurant.id
JOIN foodball.team as t1
ON t1.id = event.team1_id
JOIN foodball.team as t2
ON t2.id = event.team2_id
JOIN foodball.user
ON user.id = restaurant.user_id
JOIN foodball.role 
ON role.id = user.role_id
JOIN foodball.typeEvent
ON typeEvent.id = event.typeEvent_id
\G