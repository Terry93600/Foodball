import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Restaurant = ({ titre, desc, team1, team2, event, localisation, menu, restauId, utilisateur_id, onEdit, onDelete }) => {
  const Url = import.meta.env.VITE_API_URL;

  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(localisation)}`;
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const handleDelete = async () => {
  //   if (!confirm("Êtes-vous sûr de vouloir supprimer ce restaurant ?")) {
  //     return;
  //   }

  //   // 👇 CORRECTION DE L'URL
  //   const apiUrl = `${Url}restaurant/${restauId}`;
    
  //   console.log('Suppression du restaurant:', restauId); // 👈 DEBUG
  //   console.log('URL:', apiUrl); // 👈 DEBUG

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const data = await response.json();
  //     console.log('Réponse suppression:', data); // 👈 DEBUG

  //     if (data.data) {
  //       alert('Restaurant supprimé avec succès !');
  //       // 👇 Appeler la fonction de callback pour recharger la liste
  //       if (onDelete) {
  //         onDelete();
  //       } else {
  //         window.location.reload(); // Fallback si pas de callback
  //       }
  //     } else {
  //       alert('Erreur lors de la suppression');
  //     }
  //   } catch (error) {
  //     console.error('Erreur:', error);
  //     alert('Erreur lors de la suppression');
  //   }
  // };

const handleDelete = async (restaurantId) => {
  try {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce restaurant ?")) {
      return;
    }

    console.log('🗑️ Tentative de suppression du restaurant:', restaurantId);
    
    const token = localStorage.getItem('token');
    console.log('🔑 Token présent:', token ? 'OUI' : 'NON');
    
    // 🔍 DÉCODER LE TOKEN POUR VOIR SON CONTENU
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          console.log('📦 Payload du token:', payload);
          console.log('🎭 Rôle dans le token:', payload.role_nom);
          console.log('🆔 Role ID dans le token:', payload.role_id);
        }
      } catch (e) {
        console.error('❌ Impossible de décoder le token:', e);
      }
    }
    
    if (!token) {
      toast.error('Vous devez être connecté');
      return;
    }

    // ... reste du code

    // Envoyer la requête DELETE
    const response = await axios.delete(
      `${Url}restaurant/${restaurantId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Réponse suppression:', response.data);

    if (response.data.state === 'success' || response.status === 200) {
      toast.success('Restaurant supprimé avec succès !');
      
      // Recharger la liste
      if (onDelete) {
        onDelete();
      }
    }

  } catch (error) {
    console.error('💥 Erreur suppression:', error);
    
    if (error.response) {
      console.error('📡 Réponse erreur:', error.response.status, error.response.data);
      
      if (error.response.status === 403) {
        toast.error('Accès refusé. Vous devez être administrateur.');
      } else if (error.response.status === 401) {
        toast.error('Session expirée. Veuillez vous reconnecter.');
      } else {
        toast.error(error.response.data.message || 'Erreur lors de la suppression');
      }
    } else {
      toast.error('Erreur réseau');
    }
  }
};

  return (
    <article className="resto">
      <h3>{titre}</h3>
      <p>{desc}</p>

      <div className="team">
        <h3>{team1?.nom || team1}</h3>
        <p>VS</p>
        <h3>{team2?.nom || team2}</h3>
      </div>

      <p>{event?.nom || event}</p>
      <div className="googleMap">
        <p>adresse :</p>
        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
          {localisation}
        </a>
      </div>
      <figure>
        <img src={menu} alt="" />
      </figure>
      
      <div className="actions">
        {onEdit && <button onClick={() => onEdit(restauId)} className="btn-edit">✏️ Modifier</button>}
        {/* <button onClick={handleDelete} className="btn-delete">🗑️ Supprimer</button> */}
        {/* ✅ BON */}
        {/* ✅ BON */}
<button 
  className="btn-delete"
  onClick={() => handleDelete(restauId)}
>
  🗑️ Supprimer
</button>
      </div>
    </article>
  );
};

export default Restaurant;