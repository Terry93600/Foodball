import "./restaurant.css";
import { getAllPlat } from "../../../service/api";
import { useEffect, useState } from "react";
import Plat from "./restaurant";

const ListePlat = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getAllPlat().then((result) => {
      setRestaurants(result.data);
    });
  }, []);

  const critere = "macdo";

  const restaurantsFiltres = restaurants.filter((restaurant) =>
    restaurant.nom.toLowerCase().includes(critere.toLowerCase())
  );

  return (
    <>
      <section>
        {restaurantsFiltres.map((plat) => (
          <Plat titre={plat.nom} description={plat.description} key={plat.id} />
        ))}
      </section>
    </>
  );
};

export default ListePlat;
