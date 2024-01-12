import React, { useState } from "react";
import Header from "../src/components/header/Header";
import { Link, useNavigate } from "react-router-dom";
import "./inscription.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import inscription from "../src/assets/resto/inscription.jpg";

function Inscription() {
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
      .post("http://localhost:3000/api/utilisateur", values)
      .then((res) => {
        navigate("/connexion");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div id="inscription">
      <Header />
      <div>
        <img src={inscription} alt="" />
        <form action="" onSubmit={handleSubmit}>
          <h2>inscription</h2>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
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
          <button type="submit">Inscription</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Inscription;
