import "./restaurant.css";
import Carrousel from "../outils/carroussel/Carroussel";
import Restaurant from "./Restaurant";
import { getAllRestaurant } from "../../../service/api";
import { useEffect, useState } from "react";
import Search from "./SearchBar";

const ListeRestaurant = () => {
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
      getAllRestaurant().then(
        result => {
          setRestaurants(result.data);
          console.log(restaurants);
        }
      )
    }, [])
    console.log(restaurants)
    
    return <>
        <Carrousel/>
      <main id="resto">
        
      <h2 id="restaurants"></h2>
      <Search/>
      <section>
        {restaurants && restaurants.map ((restau) => (
          <Restaurant titre={restau.nom} desc={restau.description} team1={restau.team1} team2={restau.team2} event={restau.typeEvent} restauId={restau.id} />
        ))}
      </section>
    </main>
        
    </>
}

export default ListeRestaurant;