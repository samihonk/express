import React from "react";
import "./header.css";

const Header = () => {
	return (
		<nav>
			<h1>NavBar</h1>
			<ul>
				<li>Home</li>
				<li>Something</li>
			</ul>
			<div className="login-right">Login</div>
		</nav>
	);
};

export default Header;
