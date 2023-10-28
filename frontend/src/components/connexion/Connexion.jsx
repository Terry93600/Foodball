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
        setErrors(Validation(values));
        if(errors.email === "" && errors.password === "")
        {
        axios.post('http://localhost:3000/api/inscription', values)
        .then(res => {
            if(res.data === "succes"){
                navigate('/');
            } else {
                alert("No record existed")
            }
        })
        .catch(err => console.log(err));
    }
    }

  const url = `/connexion/${nom}`;


    return (
        <div>
            <div>
            <h2>Sing in</h2>
                <form action="" onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter email" name="email"
                        onChange={handleInput} />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" name="password"
                        onChange={handleInput} />
                        {errors.password && <span>{errors.password}</span>}
                    </div>
                    <button type="submit" >Log in</button>
                    <a href={url}>terry</a>
                    <p>You are agree to aour terms and police</p>
                    <Link to="/inscription">Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login