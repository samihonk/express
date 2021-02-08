import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	register as registerUser,
	clearErrors,
} from "../../redux/actions/authActions";
import "./auth.css";

const Register = () => {
	const emailRegex = /\S+@\S+$/;
	const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/i;
	const history = useHistory();
	const auth = useSelector((state) => state.auth);
	const location = useLocation();
	const dispatch = useDispatch();
	const { handleSubmit, register, errors } = useForm();

	useEffect(() => {
		if (auth.isAuthenticated) history.push("/todos");
	}, [auth.isAuthenticated, history]);

	useEffect(() => {
		dispatch(clearErrors());
	}, [dispatch, location]);

	const onSubmit = (e) => {
		dispatch(registerUser(e));
	};

	return (
		<div className="row justify-content-center login">
			<h2>Register</h2>
			<form className="form-group" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group form-spacing">
					<label htmlFor="name">Name:</label>
					<input
						className={`form-control ${
							errors.name ? "is-invalid" : ""
						}`}
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
						className={`form-control ${
							errors.email ? "is-invalid" : ""
						}`}
						type="email"
						name="email"
						placeholder="Enter email"
						ref={register({
							required: "Email required",
							pattern: {
								value: emailRegex,
								message: "Invalid email",
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
						className={`form-control ${
							errors.password ? "is-invalid" : ""
						}`}
						type="password"
						name="password"
						placeholder="Enter password"
						ref={register({
							required: "Password is required.",
							pattern: {
								value: passwordRegex,
								message:
									"Please enter password that is atleast 8 characters long and include a number, letter, capital letter and special character",
							},
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
				{auth.error && (
					<div className="alert alert-danger">{auth.error}</div>
				)}
			</form>
		</div>
	);
};

export default Register;
