import { useEffect, useState } from "react";

const Restaurant = ( {titre, desc, team1, team2, event, localisation, menu, restauId} ) => {
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
      <p>{desc} </p>

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
      

      <a href={`réservation/${titre}`}>Réservation</a>
      

      <button onClick={openModal} className="PopUpMenu">Menu</button>
      <img src={menu} alt="" className="menuMobile" />
      <a href={menu} >Voir le menu en plus</a>
      

      {isModalOpen && (
        <div className="pop-up">
            <div>
              <span onClick={closeModal} className="croix">
                &times;
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

export default Restaurant;
