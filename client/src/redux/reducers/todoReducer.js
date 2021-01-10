import * as Actions from "../actions/actionTypes";

const initialState = {
	todos: [],
	loading: false,
};

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};

export default todoReducer;
