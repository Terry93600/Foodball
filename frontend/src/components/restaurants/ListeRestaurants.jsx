import "./restaurant.css";
import Carrousel from "../outils/carroussel/Carroussel";
import Restaurant from "./Restaurant";
import { getAllRestaurant } from "../../../service/api";
import { useEffect, useState } from "react";

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
      <section>

        {restaurants && restaurants.map((restau, index) => (
          <Restaurant titre={restau.nom} desc={restau.description} key={index}/>
        ))}

      </section>

    </main>
        
    </>
}

export default ListeRestaurant;