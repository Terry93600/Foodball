import { useState, useEffect } from "react";
import axios from "axios";
import "./connexion_user.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from "../../restaurant/UploadImage";
import connexionUser from "../../../assets/resto/connexionUser.jpg"

// Définition du composant Connexion_user
const Connexion_user = ({ titre, desc, team1, team2, event, localisation, idRestau, menu, team1_id, eventsData, utilisateur_id, email }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: email , // Utiliser l'e-mail passé en tant que prop, ou une chaîne vide
    message: '',
    team1: team1,
    team2: team2,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // // const handleSubmit = async (e) => {
  // //   e.preventDefault();

  // //   try {
  // //     await axios.post('http://localhost:3000/send-email', {
  // //       name: formData.name,
  // //       email: formData.email,
  // //       message: formData.message,
  // //       team1: formData.team1,
  // //       team2: formData.team2,
  // //     });
  // //     alert('Email envoyé avec succès!');
  // //   } catch (error) {
  // //     console.error(error);
  // //     alert("Une erreur s'est produite lors de l'envoi de l'e-mail.");
  // //   }
  // // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('http://localhost:3000/send-email', {
        emails: [
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            team1: formData.team1,
            team2: formData.team2,
          },
          // Ajoutez ici un deuxième objet pour le deuxième e-mail avec des propriétés différentes
          {
            name: 'terrygenly.tg@gmail.com', // Remplacez par le nom pour le deuxième e-mail
            email: email, // Remplacez par l'e-mail pour le deuxième e-mail
            message: 'Message pour le deuxième e-mail',
            team1: 'Team 3', // Remplacez par l'équipe pour le deuxième e-mail
            team2: 'Team 4', // Remplacez par l'équipe pour le deuxième e-mail
          },
        ],
      });
      alert('E-mails envoyés avec succès!');
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'envoi des e-mails.");
    }
  };
  

  // Rendu du composant
  return (
    <>
      <section className="formReservation">
        <form onSubmit={handleSubmit} >
        <div>
          <label>Votre nom et prénom pour la reservation :</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Votre email:</label>
          <input type="email" onChange={handleChange} />
          </div>
          <article>
            <h2>{team1}</h2>
            <p>-</p>
            <h2>{team2}</h2>
          </article>
        <button type="submit">Envoyer</button>
        </form>
      </section>
      <p>terry</p>
      
      <ToastContainer />
      
    </>
  );
}

export default Connexion_user;
