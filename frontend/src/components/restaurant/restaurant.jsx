import ListePlat from "./Listeplats";
import "./restaurant.css";
import { GoogleApiWrapper } from "google-maps-react";

const Plat = ({ titre, description  }) => {
    return <>

    <main id="restaurant">
        <figure>
            <img src="" alt="" />
        </figure>

        <h2>Le Nom du resto</h2>

        <GoogleApiWrapper/>

        <section>
            <h3>{titre}</h3>
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