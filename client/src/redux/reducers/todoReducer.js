import * as Actions from "../actions/actionTypes";

const initialState = {
	todos: null,
	loading: true,
};

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_USER_TODOS:
		case Actions.GET_TODOS:
			return {
				...state,
				todos: action.payload,
				loading: false,
			};
		case Actions.LOADING:
			return {
				...state,
				loading: true,
			};
		case Actions.ERROR:
			console.error(action.payload);
			return {
				...state,
				todos: [],
				loading: false,
			};
		case Actions.CLEAR_TODOS:
			return {
				...state,
				todos: [],
				loading: true,
			};
		default:
			return state;
	}
};

export default todoReducer;
