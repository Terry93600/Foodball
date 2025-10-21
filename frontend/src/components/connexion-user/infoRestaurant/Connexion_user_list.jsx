// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Connexion_user from "./Connnexion_user.jsx";
// import { getAllRestaurant, getAllEvent } from "../../../../service/api";
// import "./connexion_user.css";
// import { UserContext } from "../../../context/UserProvider";

// const Connexion_user_list = () => {
//   const { user } = useContext(UserContext);
//   const [restaurants, setRestaurants] = useState([]);
//   const [events, setEvents] = useState([]);
//   const { critere } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [restaurantsResponse, eventsResponse] = await Promise.all([
//           getAllRestaurant(),
//           getAllEvent()
//         ]);

//         setRestaurants(restaurantsResponse.data);
//         setEvents(eventsResponse.data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données :", error.message);
//       }
//     };

//     if (!user.token) {
//       // L'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
//       navigate('/connexion');
//     } else {
//       fetchData();
//     }
//   }, [user.token, navigate]);

//   // const restaurantsFiltres = restaurants.filter(
//   //   (restaurant) => restaurant.utilisateur_id === parseInt(critere)
//   // );

//   const restaurantsFiltres = (restaurants || []).filter(
//   (restaurant) => restaurant.utilisateur_id === parseInt(critere)
// );

//   return (
//     <>
//       <section id="restaurant">
//         {restaurantsFiltres.map((restau) => (
//           <Connexion_user
//             key={restau._id}
//             idRestau={restau.id}
//             nom={restau.nom}
//             email={restau.email}
//             utilisateur_id={restau.utilisateur_id}
//             desc={restau.description}
//             team1={restau.team1}
//             team2={restau.team2}
//             event={restau.typeEvent}
//             menu={restau.menu}
//             restauId={restau.id}
//             localisation={restau.localisation}
//             eventsData={events} // Utilisez le nom correct pour la prop
//           />
//         ))}
//       </section>
//     </>
//   );
// };

// export default Connexion_user_list;

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Connexion_user from "./Connnexion_user.jsx";
import { getAllRestaurant, getAllEvent } from "../../../../service/api";
import "./Connnexion_user.jsx.css";
import { UserContext } from "../../../context/UserProvider";

const Connexion_user_list = () => {
  const { user } = useContext(UserContext);
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);
  const { critere } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Récupération des données...');
        const [restaurantsResponse, eventsResponse] = await Promise.all([
          getAllRestaurant(),
          getAllEvent()
        ]);

        console.log('🏪 Restaurants response:', restaurantsResponse);
        console.log('🎉 Events response:', eventsResponse);

        setRestaurants(restaurantsResponse.data || []);
        setEvents(eventsResponse.data || []);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des données :", error.message);
        setRestaurants([]);
        setEvents([]);
      }
    };

    if (!user.token) {
      navigate('/connexion');
    } else {
      fetchData();
    }
  }, [user.token, navigate]);

  console.log('👤 User context:', user);
  console.log('🔍 Critère de recherche:', critere);
  console.log('🏪 Tous les restaurants:', restaurants);

  const restaurantsFiltres = (restaurants || []).filter(
    (restaurant) => {
      console.log(`🔍 Comparaison: restaurant.utilisateur_id (${restaurant.utilisateur_id}) === critere (${critere})`);
      return restaurant.utilisateur_id === critere; // Suppression de parseInt pour tester
    }
  );

  console.log('🎯 Restaurants filtrés:', restaurantsFiltres);

  return (
    <>
      <section id="restaurant">
        <h2>Debug Info:</h2>
        <p>Critère: {critere}</p>
        <p>Nombre total de restaurants: {restaurants.length}</p>
        <p>Nombre de restaurants filtrés: {restaurantsFiltres.length}</p>
        
        {restaurantsFiltres.length === 0 ? (
          <p>Aucun restaurant trouvé pour l'utilisateur {critere}</p>
        ) : (
          restaurantsFiltres.map((restau) => (
            <div key={restau._id}>
              <h3>Restaurant trouvé: {restau.nom}</h3>
              <p>ID utilisateur: {restau.utilisateur_id}</p>
              <Connexion_user
                idRestau={restau.id}
                nom={restau.nom}
                email={restau.email}
                utilisateur_id={restau.utilisateur_id}
                desc={restau.description}
                team1={restau.team1}
                team2={restau.team2}
                event={restau.typeEvent}
                menu={restau.menu}
                restauId={restau.id}
                localisation={restau.localisation}
                eventsData={events}
              />
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default Connexion_user_list;