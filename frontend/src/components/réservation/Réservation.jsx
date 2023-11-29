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
            </ul>

            <button type="submit">Envoyer le message</button>
        
        </form>
    </main>

  );
};

export default Réservation;
