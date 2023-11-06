import { useEffect, useState } from "react";

const Restaurant = ( {titre, desc, team1, team2, event, localisation, menu} ) => {
  // const [data, setData] = useState([]);

  // const url = `/restaurants/${titre}`;
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
      <p> {desc} </p>
      <div className="team">
        <h3>{team1}</h3>
        <p>VS</p>
        <h3>{team2}</h3>
      </div>
      <p>{event}</p>
      <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
          {localisation}
        </a>
        <img src={menu} alt="" className="menuMobile"/>

      <button onClick={openModal}>En savoir plus</button>
        {isModalOpen && (
          <div className="pop-up">
              <div>
                <span onClick={closeModal} className="croix">
                  &times;
                </span>
                <h3>{titre}</h3>
                <section>
                  <article>
                    <h3>{team1}</h3>
                    <p>VS</p>
                    <h3>{team2}</h3>
                  </article>
                  <p>{desc}</p>
                </section>
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
