import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Réservation.css";
import { useForm } from 'react-hook-form';
import connexion from "../../assets/resto/connexion.jpg"

const Reservation = ({ email, team1, team2, localisation, event, nom, desc, menu }) => {
  const Url = import.meta.env.VITE_API_URL;
  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(localisation)}`;

  // 👇 AJOUTER CES LOGS
  console.log('🔍 Props reçues:', {
    email,
    team1,
    team2,
    localisation,
    event,
    nom,
    desc,
    menu
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm({
    defaultValues: {
      name: '',
      email: email || '',
      localisation: localisation || '',
      team1: team1 || '',
      team2: team2 || '',
      event: event || '',
      additionalEmail: '',
      message: '',
    }
  });

  const onSubmit = async (data) => {
    console.log('📤 Envoi réservation:', data);
    
    // 👇 AJOUTER CE LOG
    console.log('📦 Données envoyées au backend:', {
      name: data.name,
      email: email,
      team1: team1,
      team2: team2,
      event: event,
      localisation: localisation
    });
    
    try {
      const response = await axios.post(
        `http://localhost:3000/send-email?additionalEmail=${data.additionalEmail}`, 
        {
          name: data.name,
          email: email,
          team1: team1 || 'Non spécifié',
          team2: team2 || 'Non spécifié',
          event: event || 'Non spécifié',
          localisation: localisation || 'Non spécifiée'
        }
      );
      
      console.log('✅ Réponse:', response.data);
      toast.success("Votre réservation a bien été transmise et un mail a été envoyé !");
      reset();
      
    } catch (error) {
      console.error('❌ Erreur:', error);
      console.error('Détails:', error.response?.data);
      
      const errorMessage = error.response?.data?.error || error.message;
      toast.error(`Erreur lors de l'envoi : ${errorMessage}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='formReservation'>
        <img src={connexion} alt="" />
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Formulaire de réservation</h2>
          <h2>{nom}</h2>
          <p>{desc}</p>
          <p>Adresse : <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="map">
            {localisation}
          </a></p>
          <p>{team1} - {team2}</p>
          <h2>Menu du restaurant</h2>
          <figure>
            <img src={menu} alt="Menu du restaurant" />
          </figure>

          <div>
            <label>Nom et prénom :</label>
            <input 
              type="text" 
              placeholder='Nom et Prénom'
              {...register("name", { 
                required: "Le nom et prénom sont requis", 
                maxLength: { 
                  value: 50, 
                  message: "Le nom ne peut pas dépasser 50 caractères" 
                },
                pattern: {
                  value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/,
                  message: "Le nom ne doit contenir que des lettres, espaces et tirets"
                }
              })}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          
          <div>
            <label>Votre email :</label>
            <input 
              type="email" 
              placeholder='Votre email'
              {...register("additionalEmail", { 
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email invalide"
                }
              })}
            />
            {errors.additionalEmail && <p className="error-message">{errors.additionalEmail.message}</p>}
          </div>
          
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </>
  );
};

export default Reservation;