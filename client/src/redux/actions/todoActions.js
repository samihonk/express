import * as Actions from "./actionTypes";
import axios from "axios";
import { setHeaders } from "../helpers/AxiosHelper";

export const getTodos = () => async (dispatch) => {
	try {
		setLoading();
		setHeaders();
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

//Set loading
export const setLoading = () => {
	return {
		type: Actions.LOADING,
	};
};
