import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../redux/actions/authActions";
import "./login.css";

const Login = () => {
	const emailRegex = /\S+@\S+$/;
	const history = useHistory();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { handleSubmit, register, errors } = useForm();

	useEffect(() => {
		if (auth.isAuthenticated) history.push("/todos");
	}, [auth.isAuthenticated, history]);

	const onSubmit = (e) => {
		dispatch(login(e));
	};

	return (
		<div className="row justify-content-center login">
			<h2>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
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
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
