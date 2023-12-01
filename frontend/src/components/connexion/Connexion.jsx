import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./log.css";

function Login({utilisateur_id}) {
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
  
    if (validateForm()) {
      // Si la validation côté client réussit, effectuez la requête Axios
      axios
        .post("http://localhost:3000/api/utilisateur/login", values)
        .then((res) => {
          const utilisateur_id = res.data.utilisateur_id;
          console.log(utilisateur_id); // Log utilisateur_id to check if it's defined
          navigate(`/info-restaurant/${utilisateur_id}`);
        })
        
        .catch((err) => console.log(err));
    }
  };
  

  return (
    <div>
      <div>
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
        </form>
      </div>
    </div>
  );
}

export default Login;
