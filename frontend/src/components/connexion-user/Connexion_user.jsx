import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Connexion_user = ({titre}) => {

    const { critere } = useParams();
    const navigate = useNavigate();
  
    const [values, setValues] = useState({
      nom: "",
      description: "",
      localisation: "",
      menu: "",
      utilisateur_id: 1,
    });
  
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
      }
    }, [critere]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      console.log('Valeurs avant la soumission :', values);
  
      try {
        const apiUrl = critere
          ? `http://localhost:3000/api/restaurant/${critere}`
          : `http://localhost:3000/api/restaurant/${critere}`;
  
        const response = await axios({
          method: critere ? "put" : "post",
          url: apiUrl,
          data: values,
        });

        console.log('Valeurs envoyées à l\'API :', values);
  
        if (response.data.Status === "Success") {
          console.log(
            `Données ${critere ? "mises à jour" : "ajoutées"} à l'API restaurant`
          );
          navigate("/");
        } else {
          console.error(
            `Erreur lors de l'appel à l'API restaurant: ${response.data.message}`
          );
        }
      } catch (error) {
        console.error(
          `Erreur lors de l'appel à l'API restaurant: ${error.message}`
        );
      }
    };

    return <>
    <h2>{critere ? "Modifier le restaurant" : "Ajouter un restaurant"}</h2>

<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="nom">Nom</label>
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
    <label htmlFor="description">Description</label>
    <input
      type="text"
      placeholder="Description du restaurant"
      name="description"
      value={values.description}
      onChange={(e) => setValues({ ...values, description: e.target.value })}
    />
  </div>
  <div>
    <label htmlFor="localisation">Localisation</label>
    <input
      type="text"
      placeholder="Localisation du restaurant"
      name="localisation"
      value={values.localisation}
      onChange={(e) => setValues({ ...values, localisation: e.target.value })}
    />
  </div>
  <div>
    <label htmlFor="menu">Menu PDF</label>
    <input
      type="text"
      placeholder="Nom du fichier PDF du menu"
      name="menu"
      value={values.menu}
      onChange={(e) => setValues({ ...values, menu: e.target.value })}
    />
  </div>
  <button type="submit">
    {critere ? "Modifier le restaurant" : "Ajouter le restaurant"}
  </button>
</form>
    </>
}

export default Connexion_user;