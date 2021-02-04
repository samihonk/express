import axios from "axios";

export const setAuth = (token) => {
	if (token) {
		axios.defaults.headers.common["x-auth-token"] = token;
	} else {
		delete axios.defaults.headers.common["x-auth-token"];
	}
};

//Change basurl to environment variable
export const setHeaders = () => {
	axios.defaults.baseURL =
		process.env.REACT_APP_BASE_URL || "http://localhost:8080";
	axios.defaults.headers.post["Content-Type"] = "application/json";
};
