import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout, loadUser } from "../../redux/actions/authActions";
import "./header.css";

const Header = ({ auth: { isAuthenticated }, logout, loadUser }) => {
	const history = useHistory();

	useEffect(() => {
		loadUser();
	}, [loadUser]);

	const onLogout = () => {
		logout();
		history.push("/");
	};

	const guestLogin = (
		<Link className="nav-link" to="/login">
			Login
		</Link>
	);

	const authLogin = (
		<a href="#!" onClick={onLogout} className="nav-link">
			Logout
		</a>
	);

	const authLinks = (
		<li className="nav-item">
			<a className="nav-link" href="/todos">
				Todos
			</a>
		</li>
	);

	return (
		<nav className="navbar navbar-expand-sm bg-dark">
			<h1 className="navbar-text header-nav-title" href="/">
				NavBar
			</h1>
			<ul className="nav nav-tabs links-left">
				<li className="nav-item">
					<a className="nav-link" href="/">
						Home
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="/filler">
						Filler
					</a>
				</li>
				{isAuthenticated ? authLinks : null}
			</ul>
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<div className="navbar-nav">
						{isAuthenticated ? authLogin : guestLogin}
					</div>
				</li>
			</ul>
		</nav>
	);
};

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout, loadUser })(Header);
