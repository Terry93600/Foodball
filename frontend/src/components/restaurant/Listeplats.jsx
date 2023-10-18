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

  const {critere} = useParams();

  const restaurantsFiltres = restaurants.filter((restaurant) =>
    restaurant.nom.toLowerCase().includes(critere.toLowerCase())
  );

  return (
    <>
      <section>
        {restaurantsFiltres.map((plat) => (
          <Plat titreMenu={plat.nom} description={plat.description} key={plat.id} />
        ))}
      </section>
    </>
  );
};

export default ListePlat;
