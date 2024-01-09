// import React from "react";
// import Reservation from "./Reservation";
// import { useEffect, useState } from "react";
// import { getAllRestaurantFoodball } from "../../../service/api";
// import { useParams } from "react-router-dom";


// const ListeReservation = () => {

//   const { critere } = useParams();

// const [restaurants, setRestaurants] = useState([]);
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]); // Nouvel état pour stocker les restaurants filtrés
  

//   useEffect(() => {
//     getAllRestaurantFoodball().then((result) => {
//       setRestaurants(result.data);
//       setFilteredRestaurants(result.data);
//       console.log('result.data', result.data)
//     });
//   }, []);


//   return (
//     <>
//         {filteredRestaurants.map((reservation, index) => (
//           <Reservation
//             key={index}
//             email={reservation.email}
//           />
//         ))}
//     </>
//   );
// };

// export default ListeReservation;

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
      {filteredRestaurants.map((reservation, index) => (
        <Reservation
          key={index}
          email={reservation.email}
          utilisateur_id={reservation.utilisateur_id}
          team1={reservation.team1}
            team2={reservation.team2}
          event={reservation.typeEvent}
          localisation={reservation.localisation}
        />
      ))}
    </>
  );
};

export default ListeReservation;


// import React, { useEffect, useState } from "react";
// import Reservation from "./Reservation";
// import { getAllRestaurantFoodball } from "../../../service/api";
// import { useParams } from "react-router-dom";

// const ListeReservation = () => {
//   const { critere } = useParams();
//   const [restaurants, setRestaurants] = useState([]);
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]); 

//   useEffect(() => {
//     getAllRestaurantFoodball().then((result) => {
//       // Filtrer les restaurants en fonction du critère
//       const filteredData = result.data.filter((restaurant) => {
//         // Ajoutez ici la logique de filtrage en fonction du critère
//         // Remplacez "critere" par le champ spécifique que vous souhaitez utiliser pour le filtrage
//         return restaurant.critere === critere;
//       });

//       setRestaurants(result.data);
//       setFilteredRestaurants(filteredData);
//     });
//   }, []);

//   return (
//     <>
//       {filteredRestaurants.map((reservation, index) => (
//         <Reservation
//           key={index}
//           email={reservation.email}
//         />
//       ))}
//     </>
//   );
// };

// export default ListeReservation;
