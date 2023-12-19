import React from "react";
import Reservation from "./Reservation";
import { useEffect, useState } from "react";
import { getAllRestaurantFoodball } from "../../../service/api";
import { useParams } from "react-router-dom";


const ListeReservation = () => {

  const { critere } = useParams();

const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // Nouvel état pour stocker les restaurants filtrés
  

  useEffect(() => {
    getAllRestaurantFoodball().then((result) => {
      setRestaurants(result.data);
      setFilteredRestaurants(result.data);
      console.log('result.data', result.data)
    });
  }, []);


  return (
    <>
        {filteredRestaurants.map((reservation, index) => (
          <Reservation
            key={index}
            email={reservation.email}
          />
        ))}
    </>
  );
};

export default ListeReservation;