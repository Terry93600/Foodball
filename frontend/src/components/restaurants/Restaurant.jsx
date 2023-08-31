const Restaurant = () => {
    return (
        <article className="resto">
          <figure>
            {/* <img src={resto1} alt="" /> */}
          </figure>
          <h3>{Restaurant.nom}</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro similique sed neque, fuga laudantium in assumenda numquam hic sunt qui, esse itaque necessitatibus mollitia id illo, eum eligendi soluta vitae.</p>
          <div>
            <figure>
                {/* <img src={bayern} alt="" /> */}
            </figure>

            <p>VS</p>

            <figure>
                {/* <img src={city} alt="" /> */}
            </figure>
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
