// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./connexion_user.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Connexion_user = ({ titre, desc, team1, team2, event, localisation, idRestau, menu, team1_id, eventsData }) => {
// //   const { critere } = useParams();
// //   const navigate = useNavigate();

// //   const [values, setValues] = useState({
// //     nom: "",
// //     description: "",
// //     localisation: "",
// //     menu: "",
// //     utilisateur_id: 1,
// //   });

// //   useEffect(() => {
// //     if (critere) {
// //       // Fetch existing restaurant data if editing
// //       axios
// //         .get(`http://localhost:3000/api/restaurant/${critere}`)
// //         .then((res) => {
// //           const existingData = res.data;
// //           setValues(existingData);
// //         })
// //         .catch((err) => console.log(err));
// //     }
// //   }, [critere]);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
  
// //     console.log('Valeurs avant la soumission :', values);
  
// //     try {
// //       const apiUrl = critere
// //         ? `http://localhost:3000/api/restaurant/${critere}`
// //         : `http://localhost:3000/api/restaurant/${critere}`;
  
// //       const response = await axios({
// //         method: critere ? "put" : "post",
// //         url: apiUrl,
// //         data: { ...values, nom: values.nom || titre, description: values.description || desc, localisation: values.localisation || localisation, menu: values.menu || menu },
// //       });
  
// //       console.log('Valeurs envoyées à l\'API :', values);
  
// //       if (response.data.Status === "Success") {
// //         console.log(
// //           `Données ${critere ? "mises à jour" : "ajoutées"} à l'API restaurant`
// //         );
// //         toast.success('Mise à jour réussie !', {
// //           position: "top-right",
// //           autoClose: 3000,
// //           hideProgressBar: false,
// //           closeOnClick: true,
// //           pauseOnHover: true,
// //           draggable: true,
// //         });
// //         navigate("/");
// //       } else {
// //         console.error(
// //           `Erreur lors de l'appel à l'API restaurant: ${response.data.message}`
// //         );
// //         toast.error(`Erreur lors de la mise à jour : ${response.data.message}`, {
// //           position: "top-right",
// //           autoClose: 5000,
// //           hideProgressBar: false,
// //           closeOnClick: true,
// //           pauseOnHover: true,
// //           draggable: true,
// //         });
// //       }
// //     } catch (error) {
// //       console.error(
// //         `Erreur lors de l'appel à l'API restaurant: ${error.message}`
// //       );
// //       toast.error(`Erreur lors de la mise à jour : ${error.message}`, {
// //         position: "top-right",
// //         autoClose: 5000,
// //         hideProgressBar: false,
// //         closeOnClick: true,
// //         pauseOnHover: true,
// //         draggable: true,
// //       });
// //     }
// //   };
  

//   const { critere } = useParams();
//   const navigate = useNavigate();

//   const [values, setValues] = useState({
//     nom: "",
//     description: "",
//     localisation: "",
//     menu: "",
//     utilisateur_id: 1,
//   });

//   useEffect(() => {
//     if (critere) {
//       // Fetch existing restaurant data if editing
//       axios
//         .get(`http://localhost:3000/api/restaurant/${critere}`)
//         .then((res) => {
//           const existingData = res.data;
//           setValues(existingData);
//         })
//         .catch((err) => console.log(err));
//     } else {
//       // If critere doesn't exist, initialize with default values for creation
//       setValues({
//         nom: titre || "",
//         description: desc || "",
//         localisation: localisation || "",
//         menu: menu || "",
//         utilisateur_id: 1,
//       });
//     }
//   }, [critere, titre, desc, localisation, menu]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     console.log('Valeurs avant la soumission :', values);

//     try {
//       const apiUrl = critere
//         ? `http://localhost:3000/api/restaurant/${critere}`
//         : `http://localhost:3000/api/restaurant`;

//       const response = await axios({
//         method: critere ? "put" : "post",
//         url: apiUrl,
//         data: { ...values, nom: values.nom || titre, description: values.description || desc, localisation: values.localisation || localisation, menu: values.menu || menu },
//       });

//       console.log('Valeurs envoyées à l\'API :', values);

//       if (response.data.Status === "Success") {
//         console.log(
//           `Données ${critere ? "mises à jour" : "ajoutées"} à l'API restaurant`
//         );
//         toast.success('Mise à jour réussie !', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         navigate("/");
//       } else {
//         console.error(
//           `Erreur lors de l'appel à l'API restaurant: ${response.data.message}`
//         );
//         toast.error(`Erreur lors de la mise à jour : ${response.data.message}`, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       }
//     } catch (error) {
//       console.error(
//         `Erreur lors de l'appel à l'API restaurant: ${error.message}`
//       );
//       toast.error(`Erreur lors de la mise à jour : ${error.message}`, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };


//   return (
//     <>
//       <h2>{critere ? "Modifier le restaurant" : "Ajouter un restaurant"}</h2>

//       <form onSubmit={handleSubmit} className="formRestaurant">
//         <div>
//           <label htmlFor="nom">Nom du restaurant</label>
//           <input
//             type="text"
//             placeholder={titre}
//             name="nom"
//             defaultValue={titre}
//             onChange={(e) => setValues({ ...values, nom: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Description de votre restaurant</label>
//           <input
//             type="text"
//             placeholder={desc}
//             name="description"
//             defaultValue={desc}
//             onChange={(e) => setValues({ ...values, description: e.target.value })}
//           />
//         </div>
//         <div>
//           <label htmlFor="localisation">Localisation du restaurant</label>
//           <input
//             type="text"
//             placeholder="Localisation du restaurant"
//             name="localisation"
//             defaultValue={localisation}
//             onChange={(e) => setValues({ ...values, localisation: e.target.value })}
//           />
//         </div>
//         <div>
//           <label htmlFor="menu">Menu du restaurant</label>
//           <input
//             type="text"
//             placeholder="Nom du fichier PDF du menu"
//             name="menu"
//             defaultValue={menu}
//             onChange={(e) => setValues({ ...values, menu: e.target.value })}
//           />
//         </div>
//         <button type="submit">
//           {critere ? "Modifier le restaurant" : "Ajouter le restaurant"}
//         </button>
//         <h2>{eventsData} </h2>
//       </form>
//       <ToastContainer />
//     </>
//   );
// }

// export default Connexion_user;


// Import des composants nécessaires
import { useState, useEffect } from "react";
import axios from "axios";
import "./connexion_user.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Définition du composant Connexion_user
const Connexion_user = ({ titre, desc, team1, team2, event, localisation, idRestau, menu, team1_id, eventsData }) => {
  const { critere } = useParams();
  const navigate = useNavigate();

  // Utilisation de l'état local pour gérer les valeurs du formulaire
  const [values, setValues] = useState({
    nom: "",
    description: "",
    localisation: "",
    menu: "",
    utilisateur_id: 1,
  });

  // Utilisation de useEffect pour charger les données existantes lors de la modification
  useEffect(() => {
    if (critere) {
      // Fetch existing restaurant data if editing
      axios
        .get(`http://localhost:3000/api/restaurant/${critere}`)
        .then((res) => {
          const existingData = res.data;
          setValues(existingData);
        })
        .catch((err) => console.log(err));
    } else {
      // If critere doesn't exist, initialize with default values for creation
      setValues({
        nom: titre || "",
        description: desc || "",
        localisation: localisation || "",
        menu: menu || "",
        utilisateur_id: 1,
      });
    }
  }, [critere, titre, desc, localisation, menu]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Valeurs avant la soumission :', values);

    try {
      const apiUrl = critere
        ? `http://localhost:3000/api/restaurant/${critere}`
        : `http://localhost:3000/api/restaurant`;

      const response = await axios({
        method: critere ? "put" : "post",
        url: apiUrl,
        data: { ...values, nom: values.nom || titre, description: values.description || desc, localisation: values.localisation || localisation, menu: values.menu || menu },
      });

      console.log('Valeurs envoyées à l\'API :', values);

      if (response.data.Status === "Success") {
        console.log(
          `Données ${critere ? "mises à jour" : "ajoutées"} à l'API restaurant`
        );
        toast.success('Mise à jour réussie !', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/");
      } else {
        console.error(
          `Erreur lors de l'appel à l'API restaurant: ${response.data.message}`
        );
        toast.error(`Erreur lors de la mise à jour : ${response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error(
        `Erreur lors de l'appel à l'API restaurant: ${error.message}`
      );
      toast.error(`Erreur lors de la mise à jour : ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Rendu du composant
  return (
    <>
      <h2>{critere ? "Modifier le restaurant" : "Ajouter un restaurant"}</h2>

      <form onSubmit={handleSubmit} className="formRestaurant">
        <div>
          <label htmlFor="nom">Nom du restaurant</label>
          <input
            type="text"
            placeholder={titre}
            name="nom"
            defaultValue={titre}
            onChange={(e) => setValues({ ...values, nom: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description de votre restaurant</label>
          <input
            type="text"
            placeholder={desc}
            name="description"
            defaultValue={desc}
            onChange={(e) => setValues({ ...values, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="localisation">Localisation du restaurant</label>
          <input
            type="text"
            placeholder="Localisation du restaurant"
            name="localisation"
            defaultValue={localisation}
            onChange={(e) => setValues({ ...values, localisation: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="menu">Menu du restaurant</label>
          <input
            type="text"
            placeholder="Nom du fichier PDF du menu"
            name="menu"
            defaultValue={menu}
            onChange={(e) => setValues({ ...values, menu: e.target.value })}
          />
        </div>
        <button type="submit">
          {critere ? "Modifier le restaurant" : "Ajouter le restaurant"}
        </button>
        {/* <h2>{eventsData} </h2> */}
        {eventsData && eventsData.length > 0 && (
          <div>
            <h2>Événements :</h2>
            {eventsData.map((event) => (
              <div key={event.id}>
                <p>{event.team1_id}</p>
                <p>{event.team2_id}</p>
                <p>{event.typeEvent_id}</p>
              </div>
              
            ))}
          </div>
        )}
      </form>
      <ToastContainer />
    </>
  );
}

export default Connexion_user;
