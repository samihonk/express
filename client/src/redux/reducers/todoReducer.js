import * as Actions from "../actions/actionTypes";

const initialState = {
	todos: [],
	loading: false,
};

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
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
				loading: true,
			};
		default:
			return state;
	}
};

export default todoReducer;
