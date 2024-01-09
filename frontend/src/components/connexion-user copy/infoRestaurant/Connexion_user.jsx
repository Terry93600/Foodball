import { useState, useEffect } from "react";
import axios from "axios";
import "./connexion_user.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from "../../restaurant/UploadImage";
import connexionUser from "../../../assets/resto/connexionUser.jpg"

// Définition du composant Connexion_user
const Connexion_user = ({ titre, desc, team1, team2, event, localisation, idRestau, menu, team1_id, eventsData, utilisateur_id, email, emailresto }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/send-email", formData);
      alert("Email sent successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />

        <label>Message:</label>
        <textarea name="message" onChange={handleChange}></textarea>

        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default Connexion_user;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./connexion_user.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import UploadImage from "../../restaurant/UploadImage";
// import connexionUser from "../../../assets/resto/connexionUser.jpg"

// // Définition du composant Connexion_user
// const Connexion_user = ({ titre, desc, team1, team2, event, localisation, idRestau, menu, team1_id, eventsData, utilisateur_id, email }) => {

//   const [formData, setFormData] = useState({
//     name: '',
//     email: email , // Utiliser l'e-mail passé en tant que prop, ou une chaîne vide
//     message: '',
//     team1: team1,
//     team2: team2,
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post('http://localhost:3000/api/send-email', {
//         name: formData.name,
//         email: formData.email,
//         message: formData.message,
//         team1: formData.team1,
//         team2: formData.team2,
//       });
//       alert('Email envoyé avec succès!');
//     } catch (error) {
//       console.error(error);
//       alert("Une erreur s'est produite lors de l'envoi de l'e-mail.");
//     }
//   };
//   return (
//     <>
//       <section className="formReservation">
//       <form onSubmit={handleSubmit}>
//   <div>
//     <label>Votre nom et prénom pour la reservation :</label>
//     <input type="text" name="name" onChange={handleChange} />
//   </div>
//   <div>
//     <label>Votre email:</label>
//     <input
//       type="email"
//       name="email"
//       value={formData.email}
//       onChange={handleChange}
//       required
//     />
//   </div>
//   <article>
//     <h2>{team1}</h2>
//     <p>-</p>
//     <h2>{team2}</h2>
//   </article>
//   <button type="submit">Envoyer</button>
// </form>
//       </section>
//       <p>{email} </p>
      
//       <ToastContainer />
      
//     </>
//   );
// }

// export default Connexion_user;