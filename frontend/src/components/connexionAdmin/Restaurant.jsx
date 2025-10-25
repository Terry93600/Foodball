// import React, { useEffect, useState } from "react";

// const Restaurant = ({ titre, desc, team1, team2, event, localisation, menu, restauId, utilisateur_id }) => {
//   const Url = import.meta.env.VITE_API_URL;

//   const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(localisation)}`;
//   const [isModalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const handleDelete = () => {
//     const apiUrl = `${Url}restaurantevent/${restauId}`;

//     const requestOptions = {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     fetch(apiUrl, requestOptions)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Erreur lors de la suppression des données');
//         }
//         console.log('Données supprimées avec succès');
//       })
//       .catch(error => {
//         console.error('Erreur:', error.message);
//       });
//   };

//   return (
//     <article className="resto">
//       <h3>{titre}</h3>
//       <p>{desc}</p>

//       <div className="team">
//         <h3>{team1?.nom || team1}</h3>
//         <p>VS</p>
//         <h3>{team2?.nom || team2}</h3>
//       </div>

//       <p>{event?.nom || event}</p>
//       <div className="googleMap">
//         <p>adresse :</p>
//         <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
//           {localisation}
//         </a>
//       </div>
//       <figure>
//         <img src={menu} alt="" />
//       </figure>
//       <button onClick={handleDelete}>Supprimer</button>
//       <button onClick={() => onEdit(restauId)}>Modifier</button>
//     </article>
//   );
// };

// export default Restaurant;


import React, { useEffect, useState } from "react";

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

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce restaurant ?")) {
      return;
    }

    // 👇 CORRECTION DE L'URL
    const apiUrl = `${Url}restaurant/${restauId}`;
    
    console.log('Suppression du restaurant:', restauId); // 👈 DEBUG
    console.log('URL:', apiUrl); // 👈 DEBUG

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Réponse suppression:', data); // 👈 DEBUG

      if (data.data) {
        alert('Restaurant supprimé avec succès !');
        // 👇 Appeler la fonction de callback pour recharger la liste
        if (onDelete) {
          onDelete();
        } else {
          window.location.reload(); // Fallback si pas de callback
        }
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
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
        <button onClick={handleDelete} className="btn-delete">🗑️ Supprimer</button>
      </div>
    </article>
  );
};

export default Restaurant;