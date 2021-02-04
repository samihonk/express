import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import Header from "./layout/Header";
import Home from "./layout/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from "./layout/Layout";
import Todos from "./todos/Todos";
import PrivateRoute from "./route/PrivateRoute";
import Filler from "./layout/Filler";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./app.css";

/**
 * Refs to single file!
 */

const App = () => {
	config.autoAddCss = false;
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<Layout>
					<Switch className="container">
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/filler">
							<Filler />
						</Route>
						<PrivateRoute exact path="/todos">
							<Todos />
						</PrivateRoute>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Redirect to="/" />
					</Switch>
				</Layout>
			</Router>
		</Provider>
	);
};

export default App;
