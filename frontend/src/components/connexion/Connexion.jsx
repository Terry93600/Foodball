import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./log.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../context/UserProvider"
import connexion from "../../assets/resto/connexion.jpg"

function Login() {
  const Url = import.meta.env.VITE_API_URL;
  
  const { user, setUser } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  
//   const handleSubmit = async (event) => {
//   event.preventDefault();

//   if (!values.email || !values.password) {
//     toast.error('Veuillez remplir l\'email et le mot de passe.', {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: 3000,
//     });
//     return;
//   }

//   setErrors({});

//   try {
//     console.log('🔄 Tentative de connexion...');
//     const response = await axios.post(`${Url}connexion`, values);
    
//     console.log('📡 Réponse du serveur:', response.data);
//     console.log('📡 Réponse COMPLÈTE:', JSON.stringify(response.data, null, 2));
    
//     const userData = response.data.data;

//     if (!userData) {
//       throw new Error('Données utilisateur non reçues');
//     }

//     console.log('👤 Données utilisateur:', userData);

//     // ✅ CORRECTION : Utiliser _id au lieu de id
//     setUser({
//       utilisateur_id: userData._id,  // ← Changé de userData.id à userData._id
//       email: userData.email,
//       name: `${userData.prenom} ${userData.nom}`,  // ← Combinaison prénom + nom
//       role_id: userData.role_id,
//       role_nom: userData.role_id?.nom,  // ← Récupérer le nom du rôle depuis role_id.nom
//       token: 'connected'
//     });

//     console.log('💾 Utilisateur stocké dans le contexte');
//     console.log('🎭 Rôle utilisateur:', userData.role_id?.nom);

//     // Redirection basée sur le rôle
//     if (userData.role_id?.nom === 'admin') {
//       console.log('🔀 Redirection vers /admin');
//       navigate('/admin');
//     } else {
//       console.log(`🔀 Redirection vers /info-restaurant/${userData._id}`);
//       navigate(`/info-restaurant/${userData._id}`);  // ← Changé aussi ici
//     }

//     toast.success('Connexion réussie !', {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: 2000,
//     });

//   } catch (error) {
//     console.error('❌ Erreur de connexion:', error);

//     toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.', {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: 3000,
//     });
//   }
// };
  
  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!values.email || !values.password) {
    toast.error('Veuillez remplir l\'email et le mot de passe.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
    return;
  }

  setErrors({});

  try {
    console.log('🔄 Tentative de connexion...');
    const response = await axios.post(`${Url}connexion`, values);
    
    console.log('📡 Réponse du serveur:', response.data);
    
    // 🆕 VÉRIFIER SI LA CONNEXION A RÉUSSI
    if (response.data.state !== "success") {
      toast.error(response.data.message || 'Échec de la connexion', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }

    const userData = response.data.data;
    const token = response.data.token; // 👈 RÉCUPÉRER LE TOKEN

    if (!userData || !token) {
      throw new Error('Données utilisateur ou token non reçus');
    }

    console.log('👤 Données utilisateur:', userData);
    console.log('🔑 Token reçu:', token.substring(0, 20) + '...');

    // 🆕 STOCKER LE TOKEN DANS LOCALSTORAGE
    localStorage.setItem('token', token);

    // ✅ Stocker les infos utilisateur dans le contexte
    const userToStore = {
      utilisateur_id: userData._id,
      email: userData.email,
      name: `${userData.prenom} ${userData.nom}`,
      role_id: userData.role_id,
      role_nom: userData.role_id?.nom,
      token: token // 👈 STOCKER LE TOKEN DANS LE CONTEXTE AUSSI
    };

    setUser(userToStore);

    console.log('💾 Utilisateur stocké dans le contexte');
    console.log('🎭 Rôle utilisateur:', userData.role_id?.nom);

    // Redirection basée sur le rôle
    if (userData.role_id?.nom === 'admin') {
      console.log('🔀 Redirection vers /admin');
      navigate('/admin');
    } else {
      console.log(`🔀 Redirection vers /info-restaurant/${userData._id}`);
      navigate(`/info-restaurant/${userData._id}`);
    }

    toast.success('Connexion réussie !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

  } catch (error) {
    console.error('❌ Erreur de connexion:', error);

    toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }
};
  
  return (
    <div id="connexion">
      <div>
        <h2>Connexion</h2>
        <img src={connexion} alt="" />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password" 
              name="password"
              onChange={handleInput}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          
          <button type="submit">Connexion</button>
          <ToastContainer />
          <div className="forgot-password-link">
    <a href="/forgot-password">Mot de passe oublié ?</a>
</div>
          <a href="/inscription">Inscription</a>
        </form>
      </div>
    </div>
  );
}

export default Login;