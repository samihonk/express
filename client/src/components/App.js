import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Header from "./layout/Header";
import Home from "./layout/Home";
import Login from "./auth/Login";
import Layout from "./layout/Layout";
import "./app.css";

/**
 * Refs to single file!
 */

const App = () => {
	return (
		<Router>
			<Header />
			<Layout>
				<Switch className="container">
					<Route exact path="/">
						<Home />
					</Route>
					{/* <PrivateRoute exact path="/messages">
							<Contacts />
						</PrivateRoute> */}
					<Route exact path="/login">
						<Login />
					</Route>
					<Redirect to="/" />
				</Switch>
			</Layout>
		</Router>
	);
};

export default App;
