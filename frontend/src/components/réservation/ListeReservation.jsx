import React, { useEffect, useState } from "react";
import Reservation from "./Reservation";
import { getAllRestaurantFoodball } from "../../../service/api";
import { useParams } from "react-router-dom";

const ListeReservation = () => {
  const { critere } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurantFoodball().then((result) => {
      setRestaurants(result.data);

      // Filtrer les restaurants en fonction de l'utilisateur_id
      const filtered = result.data.filter((restaurant) => {
        return restaurant.utilisateur_id === parseInt(critere);
      });

      setFilteredRestaurants(filtered);
    });
  }, [critere]);

  return (
    <>
      <section>
      {filteredRestaurants.map((reservation, index) => (
        <Reservation
          key={index}
          email={reservation.email}
          utilisateur_id={reservation.utilisateur_id}
          team1={reservation.team1}
          team2={reservation.team2}
          event={reservation.typeEvent}
          localisation={reservation.localisation}
          nom={reservation.nom}
          menu={reservation.menu}
          desc={reservation.description}
        />
      ))}
        </section>
    </>
  );
};

export default ListeReservation;