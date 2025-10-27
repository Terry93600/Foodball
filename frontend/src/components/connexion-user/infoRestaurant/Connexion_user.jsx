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
  
  // 🆕 ÉTATS POUR LA GESTION DU MENU CLOUDINARY
  const [imageSelected, setImageSelected] = useState("");
  const [selectedMenuImage, setSelectedMenuImage] = useState(null); // 👈 DÉPLACÉ ICI
  const [isUploadingMenu, setIsUploadingMenu] = useState(false);

  // ... reste de ton code (values, useEffect, etc.)

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
  });  useEffect(() => {
  const token = localStorage.getItem('token');
  console.log('🔍 === VÉRIFICATION TOKEN ===');
  console.log('Token présent:', token ? 'OUI' : 'NON');
  if (token) {
    console.log('Token (20 premiers caractères):', token.substring(0, 20));
    
    // Décoder le token pour voir son contenu
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log('📦 Payload du token:', payload);
        console.log('🔑 Role ID:', payload.role_id);
      }
    } catch (e) {
      console.error('❌ Impossible de décoder le token:', e);
    }
  }
}, []);

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

const handleMenuImageSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log('📁 Fichier sélectionné:', file.name, file.type);
    setSelectedMenuImage(file);
  }
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('🚀 Début de handleSubmit');

    try {
      const apiUrl = `${Url}restaurant/${restauId}`;
      console.log('📡 URL API:', apiUrl);
      console.log('📦 Données envoyées:', values);

      const response = await axios({
        method: "put",
        url: apiUrl,
        data: values,
      });

      console.log('📨 Réponse complète:', response);
      console.log('📨 Réponse data:', response.data);
      console.log('📨 Status:', response.status);

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
        console.log('❌ Condition non remplie:', response.data);
      }
    } catch (error) {
      console.error('💥 Erreur complète:', error);
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

  // 🆕 FONCTION POUR GÉRER LE CHANGEMENT D'IMAGE
  const handleImageChange = (event) => {
    setImageSelected(event.target.files[0]);
    const fileExtension = event.target.files[0].name.split('.').pop();
    console.log('Format de l\'image :', fileExtension);
  };

const uploadMenuImage = async () => {
  try {
    if (!selectedMenuImage) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    setIsUploadingMenu(true);

    console.log('📤 Début upload image menu');
    console.log('✅ Fichier valide:', selectedMenuImage.name, selectedMenuImage.type);
    
    const CLOUD_NAME = 'dbswf4zf2';
    const UPLOAD_PRESET = 'foodball_menu';
    
    const formData = new FormData();
    formData.append('file', selectedMenuImage);
    formData.append('upload_preset', UPLOAD_PRESET);
    
    console.log('☁️ Upload vers Cloudinary...');

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    const imageUrl = cloudinaryResponse.data.secure_url;
    console.log('✅ Image uploadée:', imageUrl);

    // Mettre à jour le restaurant
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Vous devez être connecté');
      return;
    }

    console.log('🎯 Mise à jour du restaurant:', restauId);

    const response = await axios.put(
      `${Url}restaurant/${restauId}`,
      { menu: imageUrl }, // 👈 Utilise "menu" pas "menu_image"
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('📨 Réponse API:', response.data);

    if (response.data.state === 'success') {
      setValues(prev => ({ ...prev, menu: imageUrl }));
      setSelectedMenuImage(null);
      
      // Réinitialiser l'input
      const fileInput = document.getElementById('menu-image-input');
      if (fileInput) fileInput.value = '';
      
      toast.success('Image du menu mise à jour !');
      
      if (onDataUpdated) {
        onDataUpdated();
      }
    }

  } catch (error) {
    console.error('💥 Erreur:', error);
    if (error.response?.data) {
      console.error('🔴 DÉTAIL:', JSON.stringify(error.response.data, null, 2));
    }
    toast.error('Erreur lors de l\'upload');
  } finally {
    setIsUploadingMenu(false);
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
          <label htmlFor="nom">Nom du restaurant </label>
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
          <label htmlFor="description">Description de votre restaurant </label>
          <textarea
            className="description-restaurant"
            placeholder="Description du restaurant"
            name="description"
            value={values.description}
            onChange={(e) => setValues({ ...values, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="localisation">Adresse </label>
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
          <label htmlFor="codePostal">Code Postal </label>
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
          <label htmlFor="ville">Ville </label>
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
          <label htmlFor="telephone">Téléphone </label>
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
          <label htmlFor="email">Email </label>
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
          <label htmlFor="capacite">Capacité </label>
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
          <label htmlFor="prixMoyen">Prix moyen (€) </label>
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
        
        {/* 🆕 SECTION MENU AVEC BOUTON CLOUDINARY VISIBLE */}
{/* 🆕 SECTION MENU AVEC BOUTON CLOUDINARY */}
<div id="up" className="menu-section">
  <h3>🍽️ Gestion du Menu</h3>
  
  {/* Affichage du menu image actuel */}
  {values.menu && values.menu.includes('cloudinary') && (
    <div className="current-menu-image">
      <label>Menu actuel (image)</label>
      <img 
        src={values.menu} 
        alt="Menu actuel" 
        style={{ 
          maxWidth: '300px', 
          maxHeight: '200px', 
          objectFit: 'cover',
          borderRadius: '8px',
          border: '2px solid #61914a'
        }} 
      />
    </div>
  )}

  {/* 🎯 SECTION UPLOAD NOUVEAU MENU */}
  <div className="upload-menu-section" style={{ 
    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', 
    padding: '1.5rem', 
    borderRadius: '12px',
    border: '2px dashed #61914a',
    marginTop: '1rem'
  }}>
    <label style={{ 
      fontSize: '1.1rem', 
      fontWeight: '600', 
      color: '#61914a',
      marginBottom: '1rem',
      display: 'block'
    }}>
      📸 Nouveau menu (image)
    </label>
    
    <input
      id="menu-image-input"
      type="file"
      accept="image/*"
      onChange={handleMenuImageSelect}
      style={{ marginBottom: '1rem' }}
    />
    
    {selectedMenuImage && (
      <p style={{ 
        color: '#38761d', 
        fontSize: '0.9rem',
        marginBottom: '1rem'
      }}>
        ✅ Image sélectionnée: {selectedMenuImage.name}
      </p>
    )}

    {/* 🎯 BOUTON PRINCIPAL POUR UPLOADER LE MENU */}
    <button 
      type="button" 
      onClick={uploadMenuImage}
      disabled={!selectedMenuImage || isUploadingMenu}
      style={{
        background: selectedMenuImage ? 'linear-gradient(135deg, #61914a, #38761d)' : '#ccc',
        color: 'white',
        border: 'none',
        padding: '0.8rem 1.5rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: selectedMenuImage ? 'pointer' : 'not-allowed',
        transition: 'all 0.3s ease',
        width: '100%'
      }}
    >
      {isUploadingMenu ? '📤 Upload en cours...' : '🍽️ Mettre à jour le menu'}
    </button>
  </div>
</div>

        <div>
  {/* <input 
    type="file" 
    accept="image/*"
    onChange={handleMenuImageSelect}
    id="menu-image-input"
  /> */}
  
  {/* <button 
    onClick={uploadMenuImage}
    disabled={!selectedMenuImage}
  >
    {selectedMenuImage ? `Uploader ${selectedMenuImage.name}` : 'Sélectionner une image'}
  </button> */}
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
          
          
          {selectedEvents.length > 0 && (
            <button 
              type="button" 
              onClick={handleUpdateEvents}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                color: 'white',
                border: 'none',
                padding: '0.6rem 1.2rem',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              ⚽ Mettre à jour les événements
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default Connexion_user;