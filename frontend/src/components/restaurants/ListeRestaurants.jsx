import "./restaurant.css";
import Carrousel from "../outils/carroussel/Carroussel";
import Restaurant from "./Restaurant";
import { getAllRestaurant } from "../../../service/api";
import { useEffect, useState } from "react";

const ListeRestaurant = () => {
    const [restaurant, setRestaurant] = useState([])
    useEffect(() => {
      getAllRestaurant () .then(
        result => {
          setRestaurant(result.data);
          console.log(restaurant);
        }
      )
    }, [])
    
    return <>
        <Carrousel/>
      <main id="resto">
        
      <h2 id="restaurants">Restau</h2>
      <section>

        <Restaurant/>
        <Restaurant/>
        <Restaurant/>
        <Restaurant/>

      </section>

    </main>
        
    </>
}

export default ListeRestaurant;