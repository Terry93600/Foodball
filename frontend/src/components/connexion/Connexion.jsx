// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./log.css";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { UserContext } from "../../context/UserProvider"
// import connexion from "../../assets/resto/connexion.jpg"

// function Login() {
//   const { user, setUser } = useContext(UserContext);
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   const handleInput = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };


//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Vérifier si les champs sont remplis
//     if (!values.email || !values.password) {
  
//       // Afficher les messages d'erreur avec React Toastify
//       if (!values.email && !values.password) {
//         toast.error('Veuillez remplir l\'email et le mot de passe.', {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 3000,
//         });
//       } else if (!values.email) {
//         toast.error('Veuillez remplir l\'email.', {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 3000,
//         });
//       } else {
//         toast.error('Veuillez remplir le mot de passe.', {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 3000,
//         });
//       }
  
//       return;
//     }

//   setErrors({});

//   axios
//     .post("http://localhost:3000/api/utilisateur/login", values)
//     .then((res) => {
//       const utilisateur_id = res.data.data.id;
//       // setUser(res.data.data);
//       const token = res.data.data.token; // Ajout de cette ligne pour récupérer le token
//         setUser({ ...res.data.data, token }); // Stocker le token dans le contexte global
//         console.log(token);
//       navigate(`/info-restaurant/${utilisateur_id}`);
//     })
//     .catch((err) => {
//       console.error(err);

//       // Afficher un toast d'erreur
//       toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//       });
//     });
//   };
  

//   return (
//     <div id="connexion">
//       <div>
//         <img src={connexion} alt="" />
//         <form action="" onSubmit={handleSubmit}>
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
  const { user, setUser } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null); // Ajoutez cette ligne pour définir le state de l'ID utilisateur
  

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

 // ...

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

// ...

try {
  const response = await axios.post("http://localhost:3000/api/utilisateur/login", values);
  const { userData } = response.data;

  if (!userData || !userData.token) {
    throw new Error('Token not received');
  }

  // Exemple de stockage du token et de l'ID utilisateur dans le contexte utilisateur
  const { utilisateur_id, token } = userData;
  setUser({ utilisateur_id, token });

  // Console log de l'ID côté client
  console.log('Utilisateur ID côté client:', utilisateur_id);

  // Utilisation du hook navigate pour rediriger vers la page appropriée
  navigate(`/info-restaurant/${utilisateur_id}`);

} catch (error) {
  console.error(error);

  toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
}

// ...

};

// ...


  return (
    <div id="connexion">
      <div>
        <img src={connexion} alt="" />
        <form action="" onSubmit={handleSubmit}>
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
          <a href="/inscription">Inscription</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
