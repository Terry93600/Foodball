import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./log.css";

function Login({ idRestau }) {
  const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});

	const handleInput = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
		console.log(values);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(values);
		axios
			.post("http://localhost:3000/api/utilisateur", values) 
			.then((res) => {
				navigate("/");
			})
			.catch((err) => console.log(err));
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
					<Link to="/inscription">Inscription</Link>
				</form>
			</div>
		</div>
	);
}

export default Login;
