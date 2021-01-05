import React from "react";
import "./header.css";

const Header = () => {
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
					<a className="nav-link" href="/">
						Todo
					</a>
				</li>
			</ul>
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<a className="nav-link" href="/">
						Login
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Header;
