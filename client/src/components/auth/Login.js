import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/authActions";
import "./login.css";

const Login = ({ auth: { isAuthenticated }, login }) => {
	const emailRegex = /\S+@\S+$/;
	const history = useHistory();
	const { handleSubmit, register, errors } = useForm();
	useEffect(() => {
		if (isAuthenticated) history.push("/messages");
	}, [isAuthenticated, history]);

	const onSubmit = (e) => {
		login(e);
	};

	return (
		<div className="row justify-content-center login">
			<h2>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
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
				<div className="form-group">
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
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
		</div>
	);
};

Login.propTypes = {
	auth: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool,
	login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
