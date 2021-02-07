import React, { useEffect, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, loadUser } from "../../redux/actions/authActions";
import { clearTodos } from "../../redux/actions/todoActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
			<button
				className="btn btn-secondary navbar-toggler dropdown-btn collapsed"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#dropdownLogin"
				aria-controls="dropdownLogin"
				aria-expanded="false"
				aria-label="Toggle login"
			>
				<FontAwesomeIcon
					className="dropdown-icon"
					icon={faBars}
					size="xs"
				/>
			</button>
			<div className="navbar-collapse collapse" id="dropdownLogin">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" to="/login">
							Login
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/register">
							Register
						</Link>
					</li>
				</ul>
			</div>
		</Fragment>
	);

	const authLogin = (
		<Fragment>
			<ul className="navbar-nav">
				{auth.user ? (
					<li className="nav-item header-nav-user-item">
						<div className="header-nav-user">{auth.user.name}</div>
					</li>
				) : null}
				<li className="nav-item">
					<Link to="/" onClick={onLogout} className="nav-link">
						Logout
					</Link>
				</li>
			</ul>
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
		<nav className="navbar fixed-top navbar-expand-md bg-dark navbar-expanded">
			<div className="navbar-text header-nav-title" to="/">
				NavBar
			</div>
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
			<ul className="nav nav-tabs links-right">
				{auth.isAuthenticated ? authLogin : guestLogin}
			</ul>
		</nav>
	);
};

export default Header;
