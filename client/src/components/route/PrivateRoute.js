import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
	const auth = useSelector((state) => state.auth);

	return auth.isAuthenticated ? (
		<Route {...rest}>{children}</Route>
	) : (
		<Redirect to="/login" />
	);
};

export default PrivateRoute;
