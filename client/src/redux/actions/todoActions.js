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

export const addTodo = (todo) => async (dispatch) => {
	try {
		setLoading();
		const res = await axios.post("/api/todo", todo);

		dispatch({
			type: Actions.ADD_TODO,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: Actions.ERROR,
			payload: error,
		});
	}
};

export const removeTodo = (todo) => async (dispatch) => {
	try {
		setLoading();
		await axios.delete("/api/todo/" + todo);

		dispatch({
			type: Actions.REMOVE_TODO,
			payload: todo,
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
