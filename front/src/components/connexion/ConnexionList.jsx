// import "./restaurant.css";
// import Carrousel from "../outils/carroussel/Carroussel";
import Login from "./Connexion";
import SearchBar from '../restaurants/searchbar/SearchBar';
import { getAllRestaurant } from "../../../service/api";
import { useEffect, useState } from "react";

const Connexion_user_list = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // Nouvel état pour stocker les restaurants filtrés

  useEffect(() => {
    getAllRestaurant().then((result) => {
      setRestaurants(result.data);
      setFilteredRestaurants(result.data); // Initialisez les restaurants filtrés avec la liste complète
    });
  }, []);

  const handleSearch = (searchTerm) => {
    // Utilisez la méthode .filter() pour filtrer les restaurants en fonction du terme de recherche
    const filtered = restaurants.filter((restau) => {
      return Object.values(restau).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredRestaurants(filtered); // Mettez à jour les restaurants filtrés
  };

  return (
    <>
      {/* <Carrousel /> */}
      <main id="resto">
        <h2 id="restaurants"></h2>
        <SearchBar onSearch={handleSearch} />
        <section>
          {filteredRestaurants.map((restau) => (
            <Login
            key={restau._id}
            idRestau={restau.id}
              titre={restau.nom}
              desc={restau.description}
              team1={restau.team1}
              team2={restau.team2}
              event={restau.typeEvent}
              menu_id={restau.menu_id}
              restauId={restau.id}
              utilisateur_id={restau.utilisateur_id}
              localisation={restau.localisation}
            />
          ))}
              </section>
      </main>
    </>
  );
};

export default Connexion_user_list;