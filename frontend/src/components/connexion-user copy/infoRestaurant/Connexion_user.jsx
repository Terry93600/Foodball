import React, { useState, useEffect } from "react";
import axios from "axios";
import "./connexion_user.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import connexionUser from "../../../assets/resto/connexionUser.jpg";

const Connexion_user = ({ nom, desc, localisation, menu, eventsData, utilisateur_id, email }) => {
  const { critere } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nom: "",
    description: "",
    localisation: "",
    menu: "",
    email: "",
    utilisateur_id: 1,
  });

  useEffect(() => {
    if (critere) {
      axios
        .get(`http://localhost:3000/api/restaurant/${critere}`)
        .then((res) => {
          const existingData = res.data;
          setValues(existingData);
        })
        .catch((err) => console.log(err));
    } else {
      setValues({
        nom: nom || "",
        description: desc || "",
        localisation: localisation || "",
        menu: menu || "",
        email: email || "",
        utilisateur_id: 1,
      });
    }
  }, [critere, nom, desc, localisation, menu, email]);

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
        data: { ...values, nom: values.nom || nom, description: values.description || desc, localisation: values.localisation || localisation, menu: values.menu || menu, email: values.email || email },
      });

      console.log('Réponse de l\'API :', response.data);

      if (response.data && response.data.Status === "Success") {
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
        const errorMessage = response.data && response.data.message ? response.data.message : 'Erreur inconnue';
        console.error(`Erreur lors de l'appel à l'API restaurant: ${errorMessage}`);
        toast.error(`Erreur lors de la mise à jour : ${errorMessage}`, {
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

  return (
    <>
      <figure className="imgConnexionUser">
        <img src={connexionUser} alt="" />
      </figure>

      <form onSubmit={handleSubmit} className="formRestaurant">
        <h2>{critere ? "Modifier le restaurant" : "Ajouter un restaurant"}</h2>

        <div>
          <label htmlFor="nom">Nom du restaurant</label>
          <input
            type="text"
            placeholder="Nom du restaurant"
            name="nom"
            value={values.nom}
            onChange={(e) => setValues({ ...values, nom: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description de votre restaurant</label>
          <input
            type="text"
            placeholder="Description du restaurant"
            name="description"
            value={values.description}
            onChange={(e) => setValues({ ...values, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="localisation">Localisation du restaurant</label>
          <input
            type="text"
            placeholder="Localisation du restaurant"
            name="localisation"
            value={values.localisation}
            onChange={(e) => setValues({ ...values, localisation: e.target.value })}
          />
        </div>

        <button type="submit">
          {critere ? "Enregistrer les informations du restaurant" : "Ajouter le restaurant"}
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default Connexion_user;
