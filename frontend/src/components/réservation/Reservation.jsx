// import React, { useState } from 'react';
// import axios from 'axios';

// const Reservation = ({ email  }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: email || '', // Utiliser l'e-mail passé en tant que prop, ou une chaîne vide
//     message: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:3000/send-email", formData);
//       alert("Email sent successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while sending the email: " + error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         {/* <p>{email} terr</p> */}
//       </div>
//       <div>
//         <label>Nom:</label>
//         <input type="text" name="name" onChange={handleChange} />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email"  onChange={handleChange} />
//       </div>
//       <div>
//         <label>Message:</label>
//         <textarea name="message" onChange={handleChange} />
//       </div>
//       <button type="submit">Envoyer</button>
//     </form>
//   );
// };

// export default Reservation;


import React, { useState } from 'react';
import axios from 'axios';
import "./Réservation.css";

const Reservation = ({ email,team1,team2, localisation, event, nom, desc }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: email || '', // Utiliser l'e-mail passé en tant que prop, ou une chaîne vide
    localisation: localisation,
    team1: team1,
    team2: team2,
    event: event,
    additionalEmail: '', // Ajouter un champ pour l'e-mail supplémentaire
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ajouter l'e-mail supplémentaire à la requête
      await axios.post(`http://localhost:3000/send-email?additionalEmail=${formData.additionalEmail}`, formData);
      alert("Email sent successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the email: " + error.message);
    }
  };

  return (
    <div className='formReservation'>
      <h2>Formulaire de réservation</h2>
        <form onSubmit={handleSubmit} >
        <h2>{nom}</h2>
        <p>{desc} </p>
        <p>Adresse: {localisation} </p>
        <p>{team1} - {team2} </p>

          <div>
            <label>Nom et prénom :</label>
            <input type="text" name="name" onChange={handleChange} placeholder='Nom et Prénom' />
          </div>
          {/* <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} />
          </div> */}
          <div>
            <label>Votre email :</label>
            <input type="email" name="additionalEmail" onChange={handleChange} placeholder='Votre email'/>
          </div>
          {/* <div>
            <label>Message:</label>
            <textarea name="message" onChange={handleChange} />
          </div> */}
          <button type="submit">Envoyer</button>
        </form>
      </div>
     
  );
};

export default Reservation;
