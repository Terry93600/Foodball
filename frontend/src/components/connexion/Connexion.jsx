import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignIn } from 'react-auth-kit'
import './log.css'; 
import Validation from "./ConnexionValidation";

function Login() {
    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.targetname]: [event.target.values]}))
    }

    const handleSubmit =(event) => {
        event.preventDefault();
        setErrors(Validation(values))
    }
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
                    <button type="submit">Log in</button>
                    <p>You are agree to aour terms and police</p>
                    <Link to="/inscription">Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login