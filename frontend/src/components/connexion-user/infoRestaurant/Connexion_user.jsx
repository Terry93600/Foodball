import { useState, useEffect } from "react";
import axios from "axios";
import "./connexion_user.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImage from "../../restaurant/UploadImage";

// Définition du composant Connexion_user
const Connexion_user = ({ titre, desc, team1, team2, event, localisation, idRestau, menu, team1_id, eventsData, utilisateur_id, email }) => {
  const { critere } = useParams();
  const navigate = useNavigate();

  // État local pour gérer les événements sélectionnés
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Gestion du changement de l'état des événements sélectionnés
  const handleCheckboxChange = (eventId) => {
    // Si l'événement est déjà sélectionné, le retirer
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents([]);
    } else {
      // Sinon, l'ajouter à la liste
      setSelectedEvents([eventId]);
    }
  };

  // État local pour gérer les valeurs du formulaire du restaurant
  const [values, setValues] = useState({
    nom: "",
    description: "",
    localisation: "",
    menu: "",
    email: "",
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
        email: email || "",
        utilisateur_id: 1,
      });
    }
  }, [critere, titre, desc, localisation, menu, email]);

  // Fonction pour gérer la soumission du formulaire du restaurant
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
        data: { ...values, nom: values.nom || titre, description: values.description || desc, localisation: values.localisation || localisation, menu: values.menu || menu, email: values.email || email },
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

  const handleUpdateEvents = async () => {
    try {
      // Vérifier s'il y a un input sélectionné
      if (selectedEvents.length === 0) {
        console.error("Aucun input sélectionné.");
        return;
      }
  
      // Supposons que vous ne permettez qu'un seul input sélectionné
      const selectedEventId = selectedEvents[0];
  
      // Appel à l'API pour mettre à jour la table restaurantEvent
      const response = await axios.put(
        `http://localhost:3000/api/restaurantevent/${critere}`,
        { restaurant_id: critere, event_id: selectedEventId }
      );
  
      if (response.data.Status === "Success") {
        console.log('Événements mis à jour avec succès !');
        toast.success('Mise à jour des événements réussie !', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.error(`Erreur lors de la mise à jour des événements: ${response.data.message}`);
        toast.error(`Erreur lors de la mise à jour des événements : ${response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error(`Erreur lors de la mise à jour des événements: ${error.message}`);
      toast.error(`Erreur lors de la mise à jour des événements : ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const [imageSelected, setImageSelected] = useState("");

    const uploadImage = () => { 
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "tl6hgyho");
        
        Axios.post(
            "http://api.cloudinary.com/v1_1/dbswf4zf2/image/upload", 
            formData
        ).then((response) => {
            console.log(response);
        });
    };

    const cloudName = "dbswf4zf2";
    const publicId = "jvfg1624id5vxhifvt5c";
    const format = "png";

  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.${format}`;
  

  // Rendu du composant
  return (
    <>
      <h2>{critere ? "Modifier le restaurant" : "Ajouter un restaurant"}</h2>


      <form onSubmit={handleSubmit} className="formRestaurant">
        <p>{utilisateur_id} </p>

        <div>
            <input 
                type="file" 
                onChange={(event) => {
                    setImageSelected(event.target.files[0]);
                }} 
            />
            <button onClick={uploadImage}>Upload Image</button>
            <p>{menu}</p>
            <p>qsdfudshyfgsdyf</p>
            <p>terry </p>
            <img src={imageUrl} alt="Image depuis Cloudinary" />
            <img src={menu} alt="Image depuis Cloudinary" />
        </div>

        <div>
          <label htmlFor="nom">Nom du restaurant</label>
      <uploadImage/>

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
        <div className="eventSelect">
          <h2>Événements :</h2>
          {eventsData.map((event) => (
            <div key={event.event_id}>
              <input
                className="event-checkbox"
                type="checkbox"
                id={`event-${event.event_id}`}
                checked={selectedEvents.includes(event.event_id)}
                onChange={() => handleCheckboxChange(event.event_id)}
              />
              <label htmlFor={`event-${event.event_id}`}>
                <p>{event.team1_nom} vs {event.team2_nom}</p>
                <p>{event.typeEvent_nom}</p>
                <p>{event.event_id} </p>
              </label>
            </div>
          ))}
        </div>

        {/* Bouton pour mettre à jour les événements */}
        <button type="button" onClick={handleUpdateEvents}>
          Mettre à jour les événements
        </button>

        {/* Bouton pour soumettre le formulaire du restaurant */}
        <button type="submit">
          {critere ? "Modifier le restaurant" : "Ajouter le restaurant"}
        </button>

      </form>
      <ToastContainer />
    </>
  );
}

export default Connexion_user;
