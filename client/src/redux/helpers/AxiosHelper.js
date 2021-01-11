import axios from "axios";

export const setAuth = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = token;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

export const setHeaders = () => {
	axios.defaults.baseURL = "http://localhost:8080";
	axios.defaults.headers.post["Content-Type"] = "application/json";
};
