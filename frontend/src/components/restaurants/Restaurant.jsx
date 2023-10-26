import { useEffect, useState } from "react";

const Restaurant = ({ titre, desc, team1, team2, event, localisation, menu_id }) => {
  const [data, setData] = useState([]);

  const url = `/restaurants/${menu_id}`;
  useEffect(() => {}, []);

  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(localisation)}`;

  return (
    <article className="resto">
      <h3>{titre}</h3>
      <p> {desc} </p>
      <div>
        <h3>{team1}</h3>
        <p>VS</p>
        <h3>{team2}</h3>
      </div>
      <p>{event}</p>
      <p>
        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
          {localisation}
        </a>
      </p>
      <a href={url}>En savoir plus</a>
    </article>
  );
};

export default Restaurant;
