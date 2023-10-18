import { useEffect, useState } from "react";

const Restaurant = ({titre, desc, team1, team2, event, restauId}) => {
  const [data, setData] = useState([]);
  
  const url = `/restaurants/${titre}`
  useEffect(() => {
    
  }, []);
    

    return (
        <article className="resto">
          <figure>
            {/* <img src={resto1} alt="" /> */}
          </figure>
          <h3>{titre}</h3>
          <p> {desc} </p>
          <div>
            <h3>{team1} </h3>
            <p>VS</p>
            <figure>
            </figure>
            <h3>{team2}</h3>
          </div>
          <p>{event} </p>
          {/* <a href="/restaurants/restaurant">En savoir plus</a> */}
          <a href={url}>En savoir plus</a>
          </article>
    )
}

export default Restaurant
