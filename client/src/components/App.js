import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./layout/Header";

const App = () => {
	return (
		<Router>
			<Header />
			<div className="content">
				<p>Just some text</p>
			</div>
		</Router>
	);
};

export default App;
