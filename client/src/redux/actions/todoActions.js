import axios from "axios";
import * as Actions from "./actionTypes";

export const getTodos = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/todo");

		dispatch({
			type: Actions.GET_TODOS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: Actions.ERROR,
			payload: error,
		});
	}
};

export const getUserTodos = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/todo/user/");

		dispatch({
			type: Actions.GET_USER_TODOS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: Actions.ERROR,
			payload: error,
		});
	}
};

export const clearTodos = () => {
	return {
		type: Actions.CLEAR_TODOS,
	};
};

//Set loading
export const setLoading = () => {
	return {
		type: Actions.LOADING,
	};
};
