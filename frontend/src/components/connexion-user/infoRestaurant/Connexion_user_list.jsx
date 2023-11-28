import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Connexion_user from "./Connexion_user";
import { getAllRestaurant, getAllEvent } from "../../../../service/api";

const Connexion_user_list = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);
  const { critere } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantsResponse, eventsResponse] = await Promise.all([
          getAllRestaurant(),
          getAllEvent(),
        ]);

        setRestaurants(restaurantsResponse.data);
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error.message);
      }
    };

    fetchData();
  }, []);

  const restaurantsFiltres = restaurants.filter(
    (restaurant) => restaurant.utilisateur_id === parseInt(critere)
  );

  return (
    <>
      <section id="restaurant">
        {restaurantsFiltres.map((restau) => (
          <Connexion_user
            key={restau._id}
            idRestau={restau.id}
            titre={restau.nom}
            email={restau.email}
            utilisateur_id={restau.utilisateur_id}
            desc={restau.description}
            team1={restau.team1}
            team2={restau.team2}
            event={restau.typeEvent}
            menu={restau.menu}
            restauId={restau.id}
            localisation={restau.localisation}
            eventsData={events} // Utilisez le nom correct pour la prop
          />
        ))}
      </section>
    </>
  );
};

export default Connexion_user_list;
