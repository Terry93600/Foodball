import { useEffect, useState } from "react";

const Restaurant = ({titre, desc}) => {
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
                {/* <img src={bayern} alt="" /> */}
            </figure>

            <p>VS</p>

            <figure>
                {/* <img src={city} alt="" /> */}
            </figure>
            <h3></h3>
          </div>
          <a href="/restaurants/restaurant">En savoir plus</a>
          </article>
    )
}

export default Restaurant


// const Restaurant = ({ data }) => {
//   return (
//     <div className="restaurant">
//       <img src={data.imageUrl} alt={data.name} />
//       <h3>{data.name}</h3>
//       <p>{data.description}</p>
//     </div>
//   );
// };

// export default Restaurant;
