import { useEffect, useState } from "react";

const Restaurant = ({titre, desc, logo}) => {
  const [data, setData] = useState([]);
  
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
            <figure>
            </figure>
            <p>VS</p>
            <figure>
            </figure>
            <h3></h3>
          </div>
          <a href="/restaurants/restaurant">En savoir plus</a>
          </article>
    )
}

export default Restaurant
