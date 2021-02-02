import * as Actions from "../actions/actionTypes";

const initialState = {
	user: null,
	token: localStorage.getItem("authToken"),
	isAuthenticated: false,
	error: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.REGISTER_SUCCESS:
		case Actions.LOGIN_SUCCESS:
			localStorage.setItem("authToken", action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
			};
		case Actions.REGISTER_FAIL:
		case Actions.LOGIN_FAIL:
		case Actions.AUTH_ERROR:
			localStorage.removeItem("authToken");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		case Actions.USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		case Actions.LOGOUT:
			localStorage.removeItem("authToken");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
			};
		default:
			return state;
	}
};

export default authReducer;
