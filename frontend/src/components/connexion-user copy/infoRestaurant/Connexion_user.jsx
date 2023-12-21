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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/send-email', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        team1: formData.team1,
        team2: formData.team2,
      });
      alert('Email envoyé avec succès!');
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'envoi de l'e-mail.");
    }
  };
  

  // Rendu du composant
  return (
    <>
       <form onSubmit={handleSubmit}>
      <div>
        <p>{email}</p>
      </div>
      <div>
        <label>Nom:</label>
        <input type="text" name="name" onChange={handleChange} />
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" onChange={handleChange} />
        </div>
        <article>
          <h2>{team1}</h2>
          <p>-</p>
          <h2>{team2}</h2>
        </article>
      <button type="submit">Envoyer</button>
    </form>
      <ToastContainer />
      
    </>
  );
}

export default Connexion_user;
