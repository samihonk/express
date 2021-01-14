import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ auth: { isAuthenticated }, children, ...rest }) => {
	return <Route {...rest}>{isAuthenticated ? children : null}</Route>;
};

PrivateRoute.propTypes = {
	children: PropTypes.object,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
