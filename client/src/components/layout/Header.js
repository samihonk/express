import React, { useEffect } from "react";
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
		if (!auth.isAuthenticated ? dispatch(loadUser()) : null);
	}, [dispatch, auth.isAuthenticated]);

	const onLogout = () => {
		dispatch(logout());
		dispatch(clearTodos());
		history.push("/");
	};

	const guestLogin = (
		<Link className="nav-link" to="/login">
			Login
		</Link>
	);

	const authLogin = (
		<Link to="/" onClick={onLogout} className="nav-link">
			Logout
		</Link>
	);

	const authLinks = (
		<li className="nav-item">
			<Link className="nav-link" to="/todos">
				Todos
			</Link>
		</li>
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
