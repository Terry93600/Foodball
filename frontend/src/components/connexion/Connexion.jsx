import "./connexion.css";
import React from "react";

const Connexion = () => {
    return <>
        <main>
        <form action="/ma-page-de-traitement" method="post" id='connexion'>

            <hgroup>
                <h2>Formualire d'inscription des restaurateurs</h2>
            </hgroup>
            <ul>
                <li>
                    <label for="Login">E-mail :</label>
                    <input type="text" name="login" required/>
                </li>
                <li>
                    <label for="password">Mot de passe :</label>
                    <input type="text" name="password" required/>
                </li>
            </ul>

            <a href="/connexion/restaurant_name">Connexion</a>
        
        </form>
    </main>
    </>
}

export default Connexion;