// import "./restaurant.css";
// import Carrousel from "../outils/carroussel/Carroussel";
// import Restaurant from "./Restaurant";
// import SearchBar from './searchbar/SearchBar';
// // import { getAllRestaurantFoodball } from "../../../service/api";
// import { getAllRestaurant } from "../../../service/api";
// import { useEffect, useState } from "react";
// import pageResto from "../../assets/pageResto.jpg"


// const ListeRestaurant = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]);

// useEffect(() => {
//   getAllRestaurant()
//     .then((result) => {
//       console.log('🔍 STRUCTURE COMPLÈTE des restaurants:', JSON.stringify(result.data[0], null, 2)); // 👈 AJOUTE CETTE LIGNE
      
//       if (result && result.data && Array.isArray(result.data)) {
//         setRestaurants(result.data);
//         setFilteredRestaurants(result.data);
//       } else {
//         console.error('Format de données inattendu:', result);
//         setRestaurants([]);
//         setFilteredRestaurants([]);
//       }
//     })
//     .catch((error) => {
//       console.error('Erreur lors de la récupération des restaurants:', error);
//       setRestaurants([]);
//       setFilteredRestaurants([]);
//     });
// }, []);
  
// const handleSearch = (searchTerms) => {
//   // Si c'est un reset (tous les champs vides)
//   if (!searchTerms.nom && !searchTerms.team && !searchTerms.adresse && !searchTerms.championnat) {
//     setFilteredRestaurants(restaurants);
//     return;
//   }

//   const filtered = restaurants.filter((restau) => {
//     const matchNom = !searchTerms.nom ||
//       (restau.nom && restau.nom.toLowerCase().includes(searchTerms.nom.toLowerCase()));
    
//     const matchTeam = !searchTerms.team ||
//       (restau.team1?.nom && restau.team1.nom.toLowerCase().includes(searchTerms.team.toLowerCase())) ||
//       (restau.team2?.nom && restau.team2.nom.toLowerCase().includes(searchTerms.team.toLowerCase()));
    
//     const matchAdresse = !searchTerms.adresse ||
//       (restau.localisation && restau.localisation.toLowerCase().includes(searchTerms.adresse.toLowerCase())) ||
//       (restau.ville && restau.ville.toLowerCase().includes(searchTerms.adresse.toLowerCase()));
    
//     const matchChampionnat = !searchTerms.championnat ||
//       (restau.typeEvent?.nom && restau.typeEvent.nom.toLowerCase().includes(searchTerms.championnat.toLowerCase()));

//     // TOUS les critères remplis doivent matcher
//     return matchNom && matchTeam && matchAdresse && matchChampionnat;
//   });
  
//   setFilteredRestaurants(filtered);
// };

//   return (
//     <>
//       {/* <Carrousel /> */}
//       <figure id="pageResto">
//         <img src={pageResto} alt="" />
//       </figure>
//       <main id="resto">
//       <h2 id="restaurants">Restaurants</h2>
//         <SearchBar onSearch={handleSearch} />
//         <section>
//           {filteredRestaurants.map((restau, index) => (
//             <Restaurant
//             key={index}
//               titre={restau.nom}
//               desc={restau.description}
//               team1={restau.team1}
//               team2={restau.team2}
//               event={restau.typeEvent}
//               menu={restau.menu}
//               restauId={restau.id}
//               utilisateur_id={restau.utilisateur_id}
//               localisation={restau.localisation}
//             />
//           ))}
//         </section>
//       </main>
//     </>
//   );
// };

// export default ListeRestaurant;


import "./restaurant.css";
import Carrousel from "../outils/carroussel/Carroussel";
import Restaurant from "./Restaurant";
import SearchBar from './searchbar/SearchBar';
import { getAllRestaurant } from "../../../service/api";
import { useEffect, useState } from "react";
import pageResto from "../../assets/pageResto.jpg"

const ListeRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurant()
      .then((result) => {
        console.log('🔍 STRUCTURE COMPLÈTE des restaurants:', JSON.stringify(result.data[0], null, 2));
        
        if (result && result.data && Array.isArray(result.data)) {
          setRestaurants(result.data);
          setFilteredRestaurants(result.data);
        } else {
          console.error('Format de données inattendu:', result);
          setRestaurants([]);
          setFilteredRestaurants([]);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des restaurants:', error);
        setRestaurants([]);
        setFilteredRestaurants([]);
      });
  }, []);
  
  const handleSearch = (searchTerms) => {
    if (!searchTerms.nom && !searchTerms.team && !searchTerms.adresse && !searchTerms.championnat) {
      setFilteredRestaurants(restaurants);
      return;
    }

    const filtered = restaurants.filter((restau) => {
      const matchNom = !searchTerms.nom || 
        (restau.nom && restau.nom.toLowerCase().includes(searchTerms.nom.toLowerCase()));
      
      const matchTeam = !searchTerms.team || 
        (restau.team1?.nom && restau.team1.nom.toLowerCase().includes(searchTerms.team.toLowerCase())) ||
        (restau.team2?.nom && restau.team2.nom.toLowerCase().includes(searchTerms.team.toLowerCase()));
      
      const matchAdresse = !searchTerms.adresse || 
        (restau.localisation && restau.localisation.toLowerCase().includes(searchTerms.adresse.toLowerCase())) ||
        (restau.ville && restau.ville.toLowerCase().includes(searchTerms.adresse.toLowerCase()));
      
      const matchChampionnat = !searchTerms.championnat || 
        (restau.typeEvent?.nom && restau.typeEvent.nom.toLowerCase().includes(searchTerms.championnat.toLowerCase()));

      return matchNom && matchTeam && matchAdresse && matchChampionnat;
    });
    
    setFilteredRestaurants(filtered);
  };

  return (
    <>
      <figure id="pageResto">
        <img src={pageResto} alt="" />
      </figure>
      <main id="resto">
        <h2 id="restaurants">Restaurants</h2>
        <SearchBar onSearch={handleSearch} />
        <section>
          {filteredRestaurants.map((restau, index) => (
            <Restaurant
              key={restau._id || index} // 👈 Utiliser _id comme key
              titre={restau.nom}
              desc={restau.description}
              team1={restau.team1}
              team2={restau.team2}
              event={restau.typeEvent}
              menu={restau.menu}
              restauId={restau._id} // 👈 CHANGER id EN _id
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