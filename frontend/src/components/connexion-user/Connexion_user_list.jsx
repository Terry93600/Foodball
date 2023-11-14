// import "./restaurant.css";
import { getAllRestaurant } from "../../../service/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Connexion_user from "./Connexion_user";
// import Restaurant from "../restaurants/Restaurant";

const Connexion_user_list = () => {
   const [restaurants, setRestaurants] = useState([]);
   useEffect(() => {
     getAllRestaurant().then((result) => {
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
           idRestau={restau.id}
             titre={restau.nom}
             desc={restau.description}
             team1={restau.team1}
             team2={restau.team2}
             event={restau.typeEvent}
             menu_id={restau.menu_id}
             restauId={restau.id}
             localisation={restau.localisation}
             />
         ))}
       </section>
     </>
   );
};

export default Connexion_user_list;
