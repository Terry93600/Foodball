// import { useEffect, useState } from "react";

// const Restaurant = ( {titre, desc, team1, team2, event, localisation, menu, restauId, utilisateur_id} ) => {
//   useEffect(() => {}, []);

//   const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(localisation)}`;
//   const [isModalOpen, setModalOpen] = useState(false);

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
    
//     <article className="resto">

//       <h3>{titre}</h3>
//       <p>{desc} </p>

//       <div className="team">
//         <h3>{team1}</h3>
//         <p>VS</p>
//         <h3>{team2}</h3>
//       </div>

//       <p>{event}</p>
//       <div className="googleMap">
//         <p>adresse :</p>
//         <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
//         {localisation}
//         </a>
//       </div>
//       <figure>
//         <img src={menu} alt="" />
//       </figure>
//       <button>Supprimer</button>
//     </article>
//   );
// };

// export default Restaurant;


import React, { useEffect, useState } from "react";

const Restaurant = ({ titre, desc, team1, team2, event, localisation, menu, restauId, utilisateur_id }) => {
  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(localisation)}`;
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    const apiUrl = `${apiUrl}restaurantevent/${restauId}`;

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez d'autres en-têtes si nécessaire
      },
    };

    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression des données');
        }
        // Si la suppression réussit, vous pouvez effectuer des actions supplémentaires ici si nécessaire
        console.log('Données supprimées avec succès');
      })
      .catch(error => {
        console.error('Erreur:', error.message);
      });
  };

  return (
    <article className="resto">
      <h3>{titre}</h3>
      <p>{desc}</p>

      <div className="team">
        <h3>{team1}</h3>
        <p>VS</p>
        <h3>{team2}</h3>
      </div>

      <p>{event}</p>
      <div className="googleMap">
        <p>adresse :</p>
        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
          {localisation}
        </a>
      </div>
      <figure>
        <img src={menu} alt="" />
      </figure>
      <button onClick={handleDelete}>Supprimer</button>
    </article>
  );
};

export default Restaurant;
