<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './log.css'; 
import Validation from "./ConnexionValidation";
import axios from "axios";

function Login({nom, email, id}) {
    const [values, setValues] = useState({
        email:'',
        password:''
    })

	const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.values}))
		console.log(values);
    }

    const handleSubmit =(event) => {
        event.preventDefault();
        // setErrors(Validation(values));
//         if(errors.email === "" && errors.password === "")
// <<<<<<< test
//         {
//         axios.post('http://localhost:3000/api/utilisateur', values)
// =======
//         // {
//         axios.post('http://localhost:3000/api/inscription', values)
// >>>>>>> main
        .then(res => {
            if(res.data === "succes"){
                navigate('/');
            } else {
                alert("No record existed")
            }
        })
        .catch(err => console.log(err));
    // }
    }

  const url = `/connexion/${nom}`;
>>>>>>> f1b8a5d74d37611a3458e56475e27b0cca97f2da

function Login({titre, desc, team1, team2, event, localisation, idRestau}) {
    const [data, setData] = useState([]);

    const url = `/connexion/${idRestau}`;
    useEffect(() => {}, []);
  
    const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(localisation)}`;
  
    return (
      <article className="resto">
        <h3>{titre}</h3>
        <p> {desc} </p>
        <div>
          <h3>{team1}</h3>
          <p>VS</p>
          <h3>{team2}</h3>
        </div>
        <p>{event}</p>
        <p>
          <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
            {localisation}
          </a>
        </p>
        <a href={url}>En savoir plus</a>
      </article>
    );
  }

export default Login