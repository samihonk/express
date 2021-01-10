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
import { Provider } from "react-redux";
import store from "../redux/store";

import "./app.css";

/**
 * Refs to single file!
 */

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<Layout>
					<Switch className="container">
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Redirect to="/" />
					</Switch>
				</Layout>
			</Router>
		</Provider>
	);
};

export default App;
