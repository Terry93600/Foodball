import React, { useState, useEffect } from "react";
import UploadImage from "./UploadImage";
import { getAllRestaurant } from "../../../service/api";
import { useParams } from "react-router-dom";  // Assurez-vous d'importer useParams

const UploadImageWrapper = () => {
  const { critere } = useParams();  // Décommentez cette ligne pour obtenir la valeur de critere
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRestaurant();
        setRestaurantData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du restaurant :", error.message);
      }
    };

    fetchData();
  }, [critere]);  // Ajoutez critere dans la liste des dépendances pour rafraîchir les données en fonction du changement de critere

  // Filtrer les restaurants en fonction de critere
  const restaurantsFiltres = restaurantData.filter(
    (restaurant) => restaurant.utilisateur_id === parseInt(critere)
  );

  return (
    <>
      {restaurantsFiltres.map((restau) => (
        <UploadImage
          key={restau._id}
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
        />
      ))}
    </>
  );
};

export default UploadImageWrapper;
