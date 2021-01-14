import axios from "axios";
import * as Actions from "./actionTypes";
import { setHeaders, setAuth } from "../helpers/AxiosHelper";

//Add loginform
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
		const res = await axios.get("/api/users/single");
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
