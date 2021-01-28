import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
	const auth = useSelector((state) => state.auth);
	return <Route {...rest}>{auth.isAuthenticated ? children : null}</Route>;
};

export default PrivateRoute;
