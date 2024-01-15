import "./restaurant.css";
import Restaurant from "./Restaurant";
import SearchBar from './searchbar/SearchBar';
import { getAllRestaurantFoodball } from "../../../service/api";
import { useEffect, useState } from "react";
import pageResto from "../../assets/pageResto.jpg"


const ListeRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // Nouvel état pour stocker les restaurants filtrés

  useEffect(() => {
    getAllRestaurantFoodball().then((result) => {
      setRestaurants(result.data);
      setFilteredRestaurants(result.data); 
      console.log('result.data', result.data)
    });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = restaurants.filter((restau) => {
      return Object.values(restau).some((value) =>
        value !== null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    
    setFilteredRestaurants(filtered); // Mettez à jour les restaurants filtrés
  };

  return (
    <>
      {/* <Carrousel /> */}
      <figure id="pageResto">
        <img src={pageResto} alt="" />
      </figure>
      <main id="resto">
      <h2 id="restaurants">Restaurants</h2>
        <SearchBar onSearch={handleSearch} />
        <section>
          {filteredRestaurants.map((restau, index) => (
            <Restaurant
            key={index}
              titre={restau.nom}
              desc={restau.description}
              team1={restau.team1}
              team2={restau.team2}
              event={restau.typeEvent}
              menu={restau.menu}
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

export default ListeRestaurant;

