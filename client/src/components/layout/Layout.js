import React from "react";

const Layout = ({ children }) => {
	return (
		<div className="row">
			<div className="col-sm-2 d-sm-none d-md-block" />
			<div className="content col-sm">{children}</div>
			<div className="col-sm-2 d-none d-xl-block" />
		</div>
	);
};

export default Layout;
