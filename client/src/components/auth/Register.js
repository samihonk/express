import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../../redux/actions/authActions";
import "./auth.css";

const Register = () => {
	const emailRegex = /\S+@\S+$/;
	const history = useHistory();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { handleSubmit, register, errors } = useForm();

	useEffect(() => {
		if (auth.isAuthenticated) history.push("/todos");
	}, [auth.isAuthenticated, history]);

	const onSubmit = (e) => {
		dispatch(registerUser(e));
	};

	return (
		<div className="row justify-content-center login">
			<h2>Register</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group form-spacing">
					<label htmlFor="name">Name:</label>
					<input
						className="form-control"
						id="name"
						type="text"
						name="name"
						placeholder="Enter name"
						ref={register({
							required: "Name required",
						})}
					/>
					{errors.name && (
						<div className="invalid-feedback">
							{errors.name.message}
						</div>
					)}
				</div>
				<div className="form-group form-spacing">
					<label htmlFor="email">Email:</label>
					<input
						className="form-control"
						id="email"
						type="email"
						name="email"
						placeholder="Enter email"
						ref={register({
							required: "Email required",
							pattern: {
								value: emailRegex,
								message: "invalid email",
							},
						})}
					/>
					{errors.email && (
						<div className="invalid-feedback">
							{errors.email.message}
						</div>
					)}
				</div>
				<div className="form-group form-spacing">
					<label htmlFor="pwd">Password:</label>
					<input
						className="form-control"
						id="password"
						type="password"
						name="password"
						placeholder="Enter password"
						ref={register({
							required: "Password is required.",
						})}
					/>
					{errors.password && (
						<div className="invalid-feedback">
							{errors.password.message}
						</div>
					)}
				</div>
				<button type="submit" className="btn btn-primary form-spacing">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
