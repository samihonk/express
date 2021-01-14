import { combineReducers } from "redux";
import authReducer from "./authReducer";
import todoReducer from "./todoReducer";

export default combineReducers({
	todo: todoReducer,
	auth: authReducer,
});
