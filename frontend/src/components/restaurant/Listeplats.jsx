// import "./restaurant.css";
// import { getAllRestaurant } from "../../../service/api";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Plat from "./restaurant";

// const ListePlat = () => {
//   const [restaurants, setRestaurants] = useState([]); // Nouvel état pour stocker les restaurants filtrés

//   console.log('restaurants', restaurants)
  
//   useEffect(() => {
//     getAllRestaurant().then((result) => {
//       setRestaurants(result.data);
//       console.log('result.data', result.data)
//     });
//   }, []);

//   console.log('restaurants', restaurants)
//   const { critere } = useParams();

// //   const restaurantsFiltres = restaurants.filter((restaurant) =>
// //     restaurant.menuPdf === parseInt(critere)
// //   );

//   return (
//     <>
//       <section id="restaurant">
//         {restaurants.map((plat, index) => (
//           <Plat
//             key={index}
//             menuPdf={plat.menuPdf}
//             nom={plat.nom}
//             />
//         ))}
//       </section>
//     </>
//   );
// };

// export default ListePlat;