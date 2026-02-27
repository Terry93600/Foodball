import React from "react";
import "./carroussel.css"
// import "../../js/carrou.js"

const Carroussel = () => {
    return <>
        
        <section className="slider">
        <figure>
            <img
          src="https://medias.paris2024.org/uploads/2022/09/Opera-ephemere-au-Trocadero-2-Avec-mention.jpg?x-oss-process=image/resize,w_1200,h_675,m_lfit/format,jpeg"
          alt="img1"
          className="img__slider active"
        />
        </figure>

        <figure>
            <img src="https://medias.paris2024.org/uploads/2022/09/Opera-ephemere-au-Trocadero-2-Avec-mention.jpg?x-oss-process=image/resize,w_1200,h_675,m_lfit/format,jpeg" alt="img2" className="img__slider" />
        </figure>
        <figure>
            <img src="https://medias.paris2024.org/uploads/2022/09/Opera-ephemere-au-Trocadero-2-Avec-mention.jpg?x-oss-process=image/resize,w_1200,h_675,m_lfit/format,jpeg" alt="img3" className="img__slider" />
        </figure>
        
        
  
        <button className="suivant">
          <i className="fa-solid fa-circle-arrow-right"></i>
        </button>
  
        <button className="precedent">
          <i className="fa-solid fa-circle-arrow-left"></i>
        </button>
        </section>
        
    </>
}

export default Carroussel;