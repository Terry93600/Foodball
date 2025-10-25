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
//       <h3 className="titre">{titre}</h3>

//       <div className="team">
//         <h3>{team1?.nom || 'Équipe 1'}</h3>
//         <p>VS</p>
//         <h3>{team2?.nom || 'Équipe 2'}</h3>
//       </div>

//       <p>Championnat : {event?.nom || 'Championnat'}</p>
      
//       <div className="googleMap">
//         <p>adresse : </p>
//         <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
//         {localisation}
//         </a>
//       </div>

//       <div className="reservation-menu">
//         <button onClick={openModal} className="PopUpMenu">Menu</button>

//         <a href={`réservation/${restauId?._id || restauId}`}>Réservation</a>
//       </div>
      


//       {isModalOpen && (
//         <div className="pop-up">
//             <div>
//               <span onClick={closeModal} className="croix">
//                 ×
//               </span>
//               <h3>Menu {titre}</h3>
//               <figure>
//                 <img src={menu} alt="" />
//               </figure>
//             </div>
//           </div>
//       )}
//     </article>
//   );
// };

// Restaurant;

// export default Restaurant;


import { useEffect, useState } from "react";

const Restaurant = ({ titre, desc, team1, team2, event, localisation, menu, restauId, utilisateur_id }) => {
  useEffect(() => {}, []);

  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(localisation)}`;
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 👇 AJOUTER CE LOG
  console.log('🔍 Restaurant ID pour réservation:', restauId);

  return (
    <article className="resto">
      <h3 className="titre">{titre}</h3>

      <div className="team">
        <h3>{team1?.nom || 'Équipe 1'}</h3> 
        <p>VS</p>
        <h3>{team2?.nom || 'Équipe 2'}</h3> 
      </div>

      <p>Championnat : {event?.nom || 'Championnat'}</p> 
      
      <div className="googleMap">
        <p>adresse : </p>
        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
          {localisation}
        </a>
      </div>

      <div className="reservation-menu">
        <button onClick={openModal} className="PopUpMenu">Menu</button>
        {/* 👇 SIMPLIFIER L'URL */}
        <a href={`/réservation/${restauId}`}>Réservation</a> 
      </div>

      {isModalOpen && (
        <div className="pop-up">
          <div>
            <span onClick={closeModal} className="croix">×</span>
            <h3>Menu {titre}</h3>
            <figure>
              <img src={menu} alt="" />
            </figure>
          </div>
        </div>
      )}
    </article>
  );
};

export default Restaurant;