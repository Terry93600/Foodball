import ListePlat from "./Listeplats";
import "./restaurant.css";

const Plat = ({ titreMenu, description  }) => {
    return <>

    <main id="restaurant">
        <figure>
            <img src="" alt="" />
        </figure>

        <h2>Le Nom du resto</h2>

        <section>
            <h3>{titreMenu}</h3>
            <article>
                <figure>
                    <img src="" alt="" />
                </figure>
                <h4></h4>
                <p>{description}</p>
                <p>$10,95</p>
            </article>   
        </section>
        <a href="/restaurants/restaurant/réservation">
            Reserver
        </a>
        
    </main>
    </>
}

export default Plat;