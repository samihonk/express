import React from "react";
import "./layout.css";

const Layout = ({ children }) => {
	return (
		<div className="row root-layout">
			<div className="content col-sm main-content">{children}</div>
		</div>
	);
};

export default Layout;
