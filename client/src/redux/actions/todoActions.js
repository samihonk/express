import * as Actions from "./actionTypes";
import axios from "axios";

export const getTodos = () => async (dispatch) => {
	try {
		setLoading();

		const res = await axios.get(":8080/api/todo");
		const data = await res.json();

		dispatch({});
	} catch (error) {
		console.log(error);
	}
};

//Set loading
export const setLoading = () => {
	return {
		type: Actions.LOADING,
	};
};
