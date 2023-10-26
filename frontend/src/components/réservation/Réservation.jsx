import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Réservation.css'
const Réservation = () => {

<script src="https://smtpjs.com/v3/smtp.js">
</script>

  return (

    <main>
        <form action="/ma-page-de-traitement" method="post" id='réservation'>

            <hgroup>
                <h2>Formualire d'inscription</h2>
                <h3>Nom du restaurant</h3>
            </hgroup>
            <ul>
                <li>
                    <label for="name">Nom :</label>
                    <input type="text" id="name" name="user_name" required/>
                </li>
                <li>
                    <label for="name">Prénom :</label>
                    <input type="text" id="name" name="user_name" required/>
                </li>
                <li>
                    <label for="mail">E-mail :</label>
                    <input type="email" id="email" size="30" required />
                </li>
                {/* <li>
                    <label for="name">Numéro de téléphone :</label>
                    <input type="tel" placeholder="0123456789" required />
                </li>
                <li>
                    <label for="name">Nombre de personnes :</label>
                    <input type="number" id="name" min="1" max="10" required/>
                </li>
                <li>
                    <label for="msg">Match :</label>
                    <input type="email" id="mail" name="user_mail" required/>
                </li> */}
            </ul>

            <button type="submit">Envoyer le message</button>
        
        </form>
    </main>

  );
};

export default Réservation;
