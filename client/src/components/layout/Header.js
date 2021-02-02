import React, { useEffect, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, loadUser } from "../../redux/actions/authActions";
import { clearTodos } from "../../redux/actions/todoActions";
import "./header.css";

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (auth.token !== null ? dispatch(loadUser()) : null);
	}, [dispatch, auth.token]);

	const onLogout = () => {
		dispatch(logout())
			.then(() => {
				dispatch(clearTodos());
			})
			.then(() => {
				history.push("/");
			});
	};

	const guestLogin = (
		<Fragment>
			<Link className="nav-link" to="/login">
				Login
			</Link>
			<Link className="nav-link" to="/register">
				Register
			</Link>
		</Fragment>
	);

	const authLogin = (
		<Fragment>
			{auth.user ? (
				<h4 className="header-nav-user">{auth.user.name}</h4>
			) : null}
			<Link to="/" onClick={onLogout} className="nav-link">
				Logout
			</Link>
		</Fragment>
	);

	const authLinks = (
		<Fragment>
			<li className="nav-item">
				<Link className="nav-link" to="/todos">
					Todos
				</Link>
			</li>
		</Fragment>
	);

	return (
		<nav className="navbar fixed-top navbar-expand-sm bg-dark navbar-expanded">
			<h1 className="navbar-text header-nav-title" to="/">
				NavBar
			</h1>
			<ul className="nav nav-tabs links-left">
				<li className="nav-item">
					<Link className="nav-link" to="/">
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/filler">
						Filler
					</Link>
				</li>
				{auth.isAuthenticated ? authLinks : null}
			</ul>
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<div className="navbar-nav">
						{auth.isAuthenticated ? authLogin : guestLogin}
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Header;
