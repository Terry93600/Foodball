
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Connexion_user.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImageWrapper from "../../restaurant/UploadImageListe";
import connexionUser from "../../../assets/resto/connexionUser.jpg";
import { UserContext } from "../../../context/UserProvider";

const Connexion_user = ({ 
  nom, desc, team1, team2, event, localisation, idRestau, menu, 
  eventsData, utilisateur_id, email, restauId, codePostal, ville, 
  telephone, capacite, prixMoyen,
  onDataUpdated
}) => {
  const Url = import.meta.env.VITE_API_URL;
  const { critere } = useParams();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleCheckboxChange = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents([eventId]);
    }
  };

  const [values, setValues] = useState({
    nom: "",
    description: "",
    localisation: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",
    capacite: "",
    prixMoyen: "",
    menu: "",
    utilisateur_id: utilisateur_id,
  });

// 👇 useEffect : DÉCONNEXION AVEC AVERTISSEMENT
// 👇 useEffect : DÉCONNEXION AVEC POPUP PERSONNALISÉ
useEffect(() => {
  const handleBeforeUnload = (event) => {
    // Empêcher la fermeture immédiate
    event.preventDefault();
    event.returnValue = '';
    
    // Créer notre propre confirmation
    const shouldDisconnect = window.confirm(
      '🚪 Attention !\n\nVous allez quitter la page et être déconnecté automatiquement.\n\nÊtes-vous sûr de vouloir continuer ?'
    );
    
    if (shouldDisconnect) {
      console.log('🚪 Déconnexion confirmée par l\'utilisateur');
      setUser(null);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      return null; // Permet la fermeture
    } else {
      // Annuler la fermeture
      return false;
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // Déconnexion silencieuse quand l'onglet devient invisible
      console.log('🚪 Déconnexion automatique (onglet caché)');
      setUser(null);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [setUser, utilisateur_id]);

  // 👇 DEUXIÈME useEffect : TON CODE EXISTANT
  useEffect(() => {
    if (critere) {
      axios
        .get(`${Url}restaurant/${restauId}`)
        .then((res) => {
          const existingData = res.data.data || res.data;
          setValues({
            nom: existingData.nom || "",
            description: existingData.description || "",
            localisation: existingData.localisation || "",
            codePostal: existingData.codePostal || "",
            ville: existingData.ville || "",
            telephone: existingData.telephone || "",
            email: existingData.email || "",
            capacite: existingData.capacite || "",
            prixMoyen: existingData.prixMoyen || "",
            menu: existingData.menu || "",
            utilisateur_id: existingData.utilisateur_id || utilisateur_id,
          });
        })
        .catch((err) => console.log(err));
    } else {
      setValues({
        nom: nom || "",
        description: desc || "",
        localisation: localisation || "",
        codePostal: codePostal || "",
        ville: ville || "",
        telephone: telephone || "",
        email: email || "",
        capacite: capacite || "",
        prixMoyen: prixMoyen || "",
        menu: menu || "",
        utilisateur_id: utilisateur_id,
      });
    }
  }, [critere, nom, desc, localisation, codePostal, ville, telephone, email, capacite, prixMoyen, menu, utilisateur_id]);


  const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('🚀 Début de handleSubmit'); // 👈 AJOUTE

  try {
    const apiUrl = `${Url}restaurant/${restauId}`;
    console.log('📡 URL API:', apiUrl); // 👈 AJOUTE
    console.log('📦 Données envoyées:', values); // 👈 AJOUTE

    const response = await axios({
      method: "put",
      url: apiUrl,
      data: values,
    });

    console.log('📨 Réponse complète:', response); // 👈 AJOUTE
    console.log('📨 Réponse data:', response.data); // 👈 AJOUTE
    console.log('📨 Status:', response.status); // 👈 AJOUTE

    if (response.data.state === "success" || response.data.Status === "Success") {
      console.log('✅ Données mises à jour à l\'API restaurant');
      
      toast.success('Donnée mise à jour avec succès !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      if (onDataUpdated) {
        console.log('🔄 Demande de rechargement des données au parent...');
        onDataUpdated();
      }
    } else {
      console.log('❌ Condition non remplie:', response.data); // 👈 AJOUTE
    }
  } catch (error) {
    console.error('💥 Erreur complète:', error); // 👈 AJOUTE
    toast.error('Erreur lors de la mise à jour');
  }
};


  const handleUpdateEvents = async () => {
    try {
      if (selectedEvents.length === 0) {
        toast.warning("Veuillez sélectionner un événement.");
        return;
      }
  
      const selectedEventId = selectedEvents[0];
  
      const response = await axios.put(
        `${Url}restaurantevent/${idRestau}`,
        { restaurant_id: idRestau, event_id: selectedEventId }
      );
  
      if (response.data.Status === "Success") {
        toast.success('Événements mis à jour avec succès !');
        
        // 🔄 RECHARGER LES DONNÉES APRÈS MISE À JOUR DES ÉVÉNEMENTS AUSSI
        if (onDataUpdated) {
          onDataUpdated();
        }
      } else {
        console.error(`Erreur lors de la mise à jour des événements: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Erreur lors de la mise à jour des événements: ${error.message}`);
      toast.error('Erreur lors de la mise à jour des événements');
    }
  };

  return (
    <>
      <figure className="imgConnexionUser">
        <img src={connexionUser} alt="" />
      </figure>

      <form onSubmit={handleSubmit} className="formRestaurant">
        <h2>Information : {nom} </h2>
        <p>Veuillez remplir ou modifier ce formulaire selon vos informations</p>
  
        <div>
          <label htmlFor="nom">Nom du restaurant *</label>
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
          <label htmlFor="description">Description de votre restaurant *</label>
          <textarea
            placeholder="Description du restaurant"
            name="description"
            value={values.description}
            onChange={(e) => setValues({ ...values, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="localisation">Adresse *</label>
          <input
            type="text"
            placeholder="Adresse complète du restaurant"
            name="localisation"
            value={values.localisation}
            onChange={(e) => setValues({ ...values, localisation: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="codePostal">Code Postal *</label>
          <input
            type="text"
            placeholder="Code postal"
            name="codePostal"
            value={values.codePostal}
            onChange={(e) => setValues({ ...values, codePostal: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="ville">Ville *</label>
          <input
            type="text"
            placeholder="Ville"
            name="ville"
            value={values.ville}
            onChange={(e) => setValues({ ...values, ville: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="telephone">Téléphone *</label>
          <input
            type="tel"
            placeholder="Numéro de téléphone"
            name="telephone"
            value={values.telephone}
            onChange={(e) => setValues({ ...values, telephone: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            placeholder="Email du restaurant"
            name="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="capacite">Capacité *</label>
          <input
            type="number"
            placeholder="Nombre de places"
            name="capacite"
            value={values.capacite}
            onChange={(e) => setValues({ ...values, capacite: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="prixMoyen">Prix moyen (€) *</label>
          <input
            type="number"
            placeholder="Prix moyen par personne"
            name="prixMoyen"
            value={values.prixMoyen}
            onChange={(e) => setValues({ ...values, prixMoyen: e.target.value })}
            required
          />
        </div>

        <button type="submit">
          {critere ? "Enregistrer les informations du restaurant" : "Ajouter le restaurant"}
        </button>
        
        <div id="up">
          <label>Menu actuel</label>
          <textarea
            placeholder="Décrivez votre menu"
            name="menu"
            value={values.menu}
            onChange={(e) => setValues({ ...values, menu: e.target.value })}
            rows="5"
          />
          <p>Nouveau menu</p>
          <UploadImageWrapper/>
        </div>
        
        <div className="eventSelect">
          <h2>Événements :</h2>
          {eventsData && eventsData.length > 0 ? (
            eventsData.map((event) => (
              <div key={event._id || event.event_id}>
                <input
                  className="event-checkbox"
                  type="checkbox"
                  id={`event-${event._id || event.event_id}`}
                  checked={selectedEvents.includes(event._id || event.event_id)}
                  onChange={() => handleCheckboxChange(event._id || event.event_id)}
                />
                <label htmlFor={`event-${event._id || event.event_id}`}>
                  <p>{event.team1_nom || event.team1?.nom || 'Équipe 1'} vs {event.team2_nom || event.team2?.nom || 'Équipe 2'}</p>
                  <p>{event.typeEvent_nom || event.typeEvent?.nom || 'Type d\'événement'}</p>
                </label>
              </div>
            ))
          ) : (
            <p>Aucun événement disponible</p>
          )}
        </div>

        <button type="button" onClick={() => {
  console.log('🧪 Test bouton cliqué !');
  handleSubmit({ preventDefault: () => {} });
}}>
  TEST DIRECT
</button>
      </form>
      <ToastContainer />
    </>
  );
}

export default Connexion_user;