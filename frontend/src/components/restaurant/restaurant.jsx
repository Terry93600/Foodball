import ListePlat from "./Listeplats";
import "./restaurant.css";

const Plat = ({ titreMenu, description, composition, menuNom  }) => {
    return <>
            <article>
                <h3>{titreMenu}</h3>
                <p>{description}</p>
                <h4>Ingrédients :</h4>
                <p>{composition}</p>
            </article>
    </>
}

export default Plat;