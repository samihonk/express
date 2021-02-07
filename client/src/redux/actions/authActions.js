import axios from "axios";
import * as Actions from "./actionTypes";
import { setHeaders, setAuth } from "../helpers/AxiosHelper";

export const register = (user) => async (dispatch) => {
	try {
		setHeaders();
		const res = await axios.post("/api/auth/register", user);

		dispatch({
			type: Actions.REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: Actions.REGISTER_FAIL,
			payload: error,
		});
	}
};

export const login = (user) => async (dispatch) => {
	try {
		setHeaders();
		const res = await axios.post("/api/auth", user);

		dispatch({
			type: Actions.LOGIN_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: Actions.LOGIN_FAIL,
			payload: error,
		});
	}
};

export const loadUser = () => async (dispatch) => {
	try {
		setAuth(localStorage.authToken);
		setHeaders();
		const res = await axios.get("/api/auth");
		dispatch({ type: Actions.USER_LOADED, payload: res.data });
	} catch (error) {
		dispatch({ type: Actions.AUTH_ERROR, payload: error.data });
	}
};

export const logout = () => async (dispatch) => {
	try {
		dispatch({
			type: Actions.LOGOUT,
		});
	} catch (error) {
		dispatch({
			type: Actions.AUTH_ERROR,
			payload: error.data,
		});
	}
};
