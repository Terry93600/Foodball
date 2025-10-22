import { useEffect, useState } from "react";

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

//       <div className="team">
//         <h3>{team1?.nom || team1}</h3> {/* 👈 CORRECTION */}
//         <p>VS</p>
//         <h3>{team2?.nom || team2}</h3> {/* 👈 CORRECTION */}
//       </div>

//       <p>{event?.nom || event}</p> {/* 👈 CORRECTION */}
      
//       <div className="googleMap">
//         <p>adresse : </p>
//         <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
//         {localisation}
//         </a>
//       </div>
      
//       <a href={`réservation/${utilisateur_id?._id || utilisateur_id}`}>Réservation</a> {/* 👈 CORRECTION */}

//       <button onClick={openModal} className="PopUpMenu">Menu</button>

//       {isModalOpen && (
//         <div className="pop-up">
//             <div>
//               <span onClick={closeModal} className="croix">
//                 &times;
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

const Restaurant = ( {titre, desc, team1, team2, event, localisation, menu, restauId, utilisateur_id} ) => {
  useEffect(() => {}, []);

  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(localisation)}`;
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <article className="resto">
      <h3>{titre}</h3>

      <div className="team">
        <h3>{team1?.nom || 'Équipe 1'}</h3> {/* 👈 CORRECTION */}
        <p>VS</p>
        <h3>{team2?.nom || 'Équipe 2'}</h3> {/* 👈 CORRECTION */}
      </div>

      <p>{event?.nom || 'Championnat'}</p> {/* 👈 CORRECTION */}
      
      <div className="googleMap">
        <p>adresse : </p>
        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
        {localisation}
        </a>
      </div>
      
      <a href={`réservation/${utilisateur_id?._id || utilisateur_id}`}>Réservation</a> {/* 👈 CORRECTION */}

      <button onClick={openModal} className="PopUpMenu">Menu</button>

      {isModalOpen && (
        <div className="pop-up">
            <div>
              <span onClick={closeModal} className="croix">
                ×
              </span>
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

Restaurant;

export default Restaurant;
