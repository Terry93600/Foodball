import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Connexion_user from "./Connexion_user.jsx";
import { getAllRestaurant, getAllEvent } from "../../../../service/api";
import "./Connexion_user.css";
import { UserContext } from "../../../context/UserProvider";

const Connexion_user_list = () => {
  const { user } = useContext(UserContext);
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // 🔄 FONCTION POUR RECHARGER LES DONNÉES
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

  // 🆕 FONCTION QUI SERA APPELÉE PAR L'ENFANT
  const handleDataUpdated = () => {
    console.log('🔄 Rechargement des données demandé par l\'enfant...');
    console.log('🔄 Restaurants avant rechargement:', restaurants.length);
    fetchData();
  };

  useEffect(() => {
    if (!user.token) {
      navigate('/connexion');
    } else {
      fetchData();
    }
  }, [user.token, navigate]);

  console.log('👤 User context:', user);
  console.log('🔍 Utilisateur ID:', user.utilisateur_id);
  console.log('🏪 Tous les restaurants:', restaurants);

  // ✅ UTILISATION DE L'UTILISATEUR_ID DU CONTEXTE
  const restaurantsFiltres = (restaurants || []).filter(
    (restaurant) => {
      const restaurantUserId = restaurant.utilisateur_id?._id || restaurant.utilisateur_id;
      console.log(`🔍 Comparaison: restaurant.utilisateur_id (${restaurantUserId}) === user.utilisateur_id (${user.utilisateur_id})`);
      return restaurantUserId?.toString() === user.utilisateur_id?.toString();
    }
  );

  console.log('🎯 Restaurants filtrés:', restaurantsFiltres);

  return (
    <>
      <section id="restaurant">
        {restaurantsFiltres.length === 0 ? (
          <div className="no-restaurant">
            <p>🏪 Aucun restaurant trouvé</p>
            <p>Votre restaurant devrait apparaître ici après inscription.</p>
            <button onClick={() => navigate('/inscription')}>
              Créer un compte
            </button>
          </div>
        ) : (
          restaurantsFiltres.map((restau) => (
            <div key={restau._id}>
              <Connexion_user
                key={`${restau._id}-${restau.updatedAt || Date.now()}`}
                idRestau={restau._id}
                nom={restau.nom}
                email={restau.email}
                utilisateur_id={restau.utilisateur_id}
                desc={restau.description}
                team1={restau.team1}
                team2={restau.team2}
                event={restau.typeEvent}
                menu={restau.menu}
                restauId={restau._id}
                localisation={restau.localisation}
                codePostal={restau.codePostal}
                ville={restau.ville}
                telephone={restau.telephone}
                capacite={restau.capacite}
                prixMoyen={restau.prixMoyen}
                eventsData={events}
                onDataUpdated={handleDataUpdated}
              />
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default Connexion_user_list;