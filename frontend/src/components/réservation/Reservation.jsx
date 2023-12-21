// import React, { useRef, useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Réservation.css';


// const Reservation = ({ email }) => {
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       await axios.post('http://localhost:3000/send-email', {
//         name: formData.name,
//         email: formData.email, // Utiliser l'adresse e-mail du formulaire
//         message: formData.message,
//       });
//       alert('Email envoyé avec succès!');
//     } catch (error) {
//       console.error(error);
//       alert("Une erreur s'est produite lors de l'envoi de l'e-mail.");
//     }
//   };
  

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <p>{email}</p>
//       </div>
//       <div>
//         <label>Nom:</label>
//         <input type="text" name="name" onChange={handleChange} />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" onChange={handleChange} />
//       </div>
//       <div>
//         <label>Message:</label>
//         <textarea name="message" onChange={handleChange} />
//       </div>
//       <button type="submit">Envoyer</button>
//     </form>
//   );
//   };

// export default Reservation;


import React, { useState } from 'react';
import axios from 'axios';

const Reservation = ({ email }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: email || '', // Utiliser l'e-mail passé en tant que prop, ou une chaîne vide
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/send-email', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      alert('Email envoyé avec succès!');
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'envoi de l'e-mail.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>{email}</p>
      </div>
      <div>
        <label>Nom:</label>
        <input type="text" name="name" onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" onChange={handleChange} />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default Reservation;
