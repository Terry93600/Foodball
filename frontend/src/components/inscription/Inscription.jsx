import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./inscription.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Inscription() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérifier si les champs sont remplis
    if (!values.name || !values.email || !values.password) {

      // Afficher les messages d'erreur avec React Toastify
      if (!values.name && !values.email && !values.password) {
        toast.error('Veuillez remplir tous les champs.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else if (!values.name) {
        toast.error('Veuillez remplir le champ "Name".', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else if (!values.email) {
        toast.error('Veuillez remplir le champ "Email".', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else {
        toast.error('Veuillez remplir le champ "Password".', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }

      return;
    }

    setErrors({});

    axios
      .post(`${apiUrl}utilisateur`, values)
      .then((res) => {
        navigate("/connexion");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div id="inscription">
      <div>
        <form action="" onSubmit={handleSubmit}>
          <h2>Inscription</h2>
          <div>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              placeholder="Entrez votre nom"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Entrez votre email"
              name="email"
              onChange={handleInput}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              name="password"
              onChange={handleInput}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
      <ToastContainer />
          <button type="submit">Inscription</button>
        </form>
      </div>
    </div>
  );
}

export default Inscription;
