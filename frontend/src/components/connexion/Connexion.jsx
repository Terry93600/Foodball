// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./log.css";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { UserContext } from "../../context/UserProvider"
// import connexion from "../../assets/resto/connexion.jpg"

// function Login() {
//   const Url = import.meta.env.VITE_API_URL;
  
//   const { user, setUser } = useContext(UserContext);
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});
//   const [userId, setUserId] = useState(null); // Ajoutez cette ligne pour définir le state de l'ID utilisateur
  

//   const handleInput = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

// // const handleSubmit = async (event) => {
// //   event.preventDefault();

// //   if (!values.email || !values.password) {
// //     toast.error('Veuillez remplir l\'email et le mot de passe.', {
// //       position: toast.POSITION.TOP_CENTER,
// //       autoClose: 3000,
// //     });
// //     return;
// //   }

// //   setErrors({});

// // try {
// //   const response = await axios.post(`${Url}utilisateur/login`, values);
// //   const { userData } = response.data;

// //   if (!userData || !userData.token) {
// //     throw new Error('Token not received');
// //   }

// //   // Exemple de stockage du token et de l'ID utilisateur dans le contexte utilisateur
// //   const { utilisateur_id, token, role } = userData;
// //   setUser({ utilisateur_id, token, role });

// //   // Console log de l'ID côté client
// //   console.log('Utilisateur ID côté client:', utilisateur_id);

// //   // Utilisation du hook navigate pour rediriger vers la page appropriée
// //   if (role === 'admin') {
// //     navigate('/admin');
// //   } else {
// //     navigate(`/info-restaurant/${utilisateur_id}`);
// //   }

// // } catch (error) {
// //   console.error(error);

// //   toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.', {
// //     position: toast.POSITION.TOP_CENTER,
// //     autoClose: 3000,
// //   });
// // }

// // };

// //   const handleSubmit = async (event) => {
// //   event.preventDefault();

// //   if (!values.email || !values.password) {
// //     toast.error('Veuillez remplir l\'email et le mot de passe.', {
// //       position: toast.POSITION.TOP_CENTER,
// //       autoClose: 3000,
// //     });
// //     return;
// //   }

// //   setErrors({});

// //   try {
// //     // CORRECTION : Utiliser la bonne URL
// //     const response = await axios.post(`${Url}connexion`, values);
    
// //     // CORRECTION : Adapter à la structure de réponse du backend
// //     const userData = response.data.data;

// //     if (!userData) {
// //       throw new Error('Données utilisateur non reçues');
// //     }

// //     // Stocker les données utilisateur
// //     setUser({
// //       utilisateur_id: userData.id,
// //       email: userData.email,
// //       name: userData.name,
// //       role_id: userData.role_id,
// //       role_nom: userData.role_nom
// //     });

// //     console.log('Utilisateur connecté:', userData);

// //     // Redirection basée sur le rôle
// //     if (userData.role_nom === 'admin') {
// //       navigate('/admin');
// //     } else {
// //       navigate(`/info-restaurant/${userData.id}`);
// //     }

// //     toast.success('Connexion réussie !', {
// //       position: toast.POSITION.TOP_CENTER,
// //       autoClose: 2000,
// //     });

// //   } catch (error) {
// //     console.error('Erreur de connexion:', error);

// //     toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.', {
// //       position: toast.POSITION.TOP_CENTER,
// //       autoClose: 3000,
// //     });
// //   }
// // };
  
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
    
//     const userData = response.data.data;

//     if (!userData) {
//       throw new Error('Données utilisateur non reçues');
//     }

//     console.log('👤 Données utilisateur:', userData);

//     // Stocker les données utilisateur
//     setUser({
//       utilisateur_id: userData.id,
//       email: userData.email,
//       name: userData.name,
//       role_id: userData.role_id,
//       role_nom: userData.role_nom
//     });

//     console.log('💾 Utilisateur stocké dans le contexte');
//     console.log('🎭 Rôle utilisateur:', userData.role_nom);

//     // Redirection basée sur le rôle
//     if (userData.role_nom === 'admin') {
//       console.log('🔀 Redirection vers /admin');
//       navigate('/admin');
//     } else {
//       console.log(`🔀 Redirection vers /info-restaurant/${userData.id}`);
//       navigate(`/info-restaurant/${userData.id}`);
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
  
//   return (
//     <div id="connexion">
//       <div>
//         <h2>Connexion</h2>
//         <img src={connexion} alt="" />
//         {/* <form action="" onSubmit={handleSubmit}> */}
//         <form onSubmit={handleSubmit} noValidate>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               placeholder="Enter email"
//               name="email"
//               onChange={handleInput}
//             />
//             {errors.email && <span>{errors.email}</span>}
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               name="password"
//               onChange={handleInput}
//             />
//             {errors.password && <span>{errors.password}</span>}
//           </div>
          
//           <button type="submit">Connexion</button>
//           <ToastContainer />
//           <a href="/inscription">Inscription</a>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


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

  // const handleSubmit = async (event) => {
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

  //     // Stocker les données utilisateur avec un token fictif pour la compatibilité
  //     setUser({ 
  //       utilisateur_id: userData.id, 
  //       email: userData.email,
  //       name: userData.name,
  //       role_id: userData.role_id,
  //       role_nom: userData.role_nom,
  //       token: 'connected' // Token fictif pour la vérification
  //     });

  //     console.log('💾 Utilisateur stocké dans le contexte');
  //     console.log('🎭 Rôle utilisateur:', userData.role_nom);

  //     // Redirection basée sur le rôle
  //     if (userData.role_nom === 'admin') {
  //       console.log('🔀 Redirection vers /admin');
  //       navigate('/admin');
  //     } else {
  //       console.log(`🔀 Redirection vers /info-restaurant/${userData.id}`);
  //       navigate(`/info-restaurant/${userData.id}`);
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
    console.log('📡 Réponse COMPLÈTE:', JSON.stringify(response.data, null, 2));
    
    const userData = response.data.data;

    if (!userData) {
      throw new Error('Données utilisateur non reçues');
    }

    console.log('👤 Données utilisateur:', userData);

    // ✅ CORRECTION : Utiliser _id au lieu de id
    setUser({ 
      utilisateur_id: userData._id,  // ← Changé de userData.id à userData._id
      email: userData.email,
      name: `${userData.prenom} ${userData.nom}`,  // ← Combinaison prénom + nom
      role_id: userData.role_id,
      role_nom: userData.role_id?.nom,  // ← Récupérer le nom du rôle depuis role_id.nom
      token: 'connected'
    });

    console.log('💾 Utilisateur stocké dans le contexte');
    console.log('🎭 Rôle utilisateur:', userData.role_id?.nom);

    // Redirection basée sur le rôle
    if (userData.role_id?.nom === 'admin') {
      console.log('🔀 Redirection vers /admin');
      navigate('/admin');
    } else {
      console.log(`🔀 Redirection vers /info-restaurant/${userData._id}`);
      navigate(`/info-restaurant/${userData._id}`);  // ← Changé aussi ici
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