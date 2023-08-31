import "./restaurant.css";
import Carrousel from "../outils/carroussel/Carroussel";
import Restaurant from "./Restaurant";
import { getAllRestaurant } from "../../../service/api";
import { useEffect, useState } from "react";
import Filtre from "../outils/filtre/Filtre";

const ListeRestaurant = () => {
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
      getAllRestaurant () .then(
        result => {
          setRestaurants(result.data);
          console.log(restaurants);
        }
      )
    }, [])
    
    return <>
        <Carrousel/>
      <main id="resto">
        
      <h2 id="restaurants"></h2>
      <section>

        {/* <Filtre/> */}
        <Restaurant/>
        <Restaurant/>
        <Restaurant/>
        <Restaurant/>

      </section>

    </main>
        
    </>
}

export default ListeRestaurant;