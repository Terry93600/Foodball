// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./log.css";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { UserContext } from "../../context/UserProvider"
// import connexion from "../../assets/resto/connexion.jpg"

// function Login() {
//   // const { setUser } = useContext(UserContext);
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   const handleInput = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (!values.email) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     }

//     if (!values.password) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
  
//     if (validateForm()) {
//       // Si la validation côté client réussit, effectuez la requête Axios
//       axios
//         .post("http://localhost:3000/api/utilisateur/login", values)
//         .then((res) => {
//           const utilisateur_id = res.data.utilisateur_id;
//           console.log(utilisateur_id); // Log utilisateur_id to check if it's defined
//           navigate(`/info-restaurant/${utilisateur_id}`);
//         })
//         // .then((res) => {
//         //   const utilisateur_id = res.data.utilisateur_id;
//         //   console.log("utilisateur_id:", utilisateur_id);
        
//         //   if (utilisateur_id) {
//         //     setUser({ id: utilisateur_id });
//         //     navigate(`/info-restaurant/${utilisateur_id}`);
//         //   } else {
//         //     console.error("User ID is undefined in the API response");
//         //   }
//         // })
        
//         .catch((err) => console.log(err));
//     }
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
  // const { setUser } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!values.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérifier si les champs sont remplis
    if (!values.email || !values.password) {
      // setErrors({
      //   email: values.email ? "" : "Email is required",
      //   password: values.password ? "" : "Password is required",
      // });
  
      // Afficher les messages d'erreur avec React Toastify
      toast.error('Veuillez remplir tous les champs du formulaire.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
  
      return;
    }
  
    // Réinitialiser les erreurs si les champs sont remplis
    setErrors({});
  
    // Si la validation côté client réussit, effectuez la requête Axios
    axios
      .post("http://localhost:3000/api/utilisateur/login", values)
      .then((res) => {
        const utilisateur_id = res.data.utilisateur_id;
        console.log(utilisateur_id);
        navigate(`/info-restaurant/${utilisateur_id}`);
      })
      .catch((err) => {
        console.error(err);
  
        // Afficher un toast d'erreur
        toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
  };
  

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


