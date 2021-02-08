import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, clearErrors } from "../../redux/actions/authActions";
import "./auth.css";

const Login = () => {
	const emailRegex = /\S+@\S+$/;
	const history = useHistory();
	const location = useLocation();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { handleSubmit, register, errors } = useForm();

	useEffect(() => {
		if (auth.isAuthenticated) history.push("/todos");
	}, [auth.isAuthenticated, history]);

	useEffect(() => {
		dispatch(clearErrors());
	}, [dispatch, location]);

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
						className={`form-control ${
							errors.email ? "is-invalid" : ""
						}`}
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
						className={`form-control ${
							errors.password ? "is-invalid" : ""
						}`}
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
				{auth.error && (
					<div className="alert alert-danger">{auth.error}</div>
				)}
			</form>
		</div>
	);
};

export default Login;
