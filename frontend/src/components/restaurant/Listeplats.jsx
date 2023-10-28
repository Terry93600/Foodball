import "./restaurant.css";
import { getAllPlat } from "../../../service/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Plat from "./restaurant";
import Restaurant from "../restaurants/Restaurant";

const ListePlat = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getAllPlat().then((result) => {
      setRestaurants(result.data);
    });
  }, []);

  const { critere } = useParams();

  const restaurantsFiltres = restaurants.filter((restaurant) =>
    restaurant.menu_id === parseInt(critere)
  );

  return (
    <>
      <section id="restaurant">
        {restaurantsFiltres.map((plat) => (
          <Plat
            titreMenu={plat.nom}
            description={plat.description}
            key={plat.id}
            menu_id={plat.menu_id}
            composition={plat.composition}
            menuNom={plat.menu_nom}
            />
        ))}
      </section>
    </>
  );
};

export default ListePlat;
