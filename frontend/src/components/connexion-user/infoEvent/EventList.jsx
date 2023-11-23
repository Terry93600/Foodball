import { getAllEvent } from "../../../../service/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Connexion_user from "../infoRestaurant/Connexion_user";

const Eventlist = () => {
   const [restaurants, setRestaurants] = useState([]);
   useEffect(() => {
     getAllEvent().then((result) => {
       setRestaurants(result.data);
     });
   }, []);

   const { critere } = useParams();

   const restaurantsFiltres = restaurants.filter((restaurant) =>
     restaurant.id === parseInt(critere)
   );

   return (
     <>
       <section id="restaurant">
         {restaurantsFiltres.map((restau) => (
           <Connexion_user
           key={restau._id}
           event_id={restau.id}
           team1_id={restau.team1_id}
           team2_id={restau.team2_id}
             />
         ))}
       </section>
     </>
   );
};

export default Eventlist;


