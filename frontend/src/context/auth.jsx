import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "../axios";
import { useNavigate } from "react-router-dom";


 const getAuthTokens = () => {
	const tokens = localStorage.getItem("AuthTokens");
	return tokens ? JSON.parse(tokens) : null;  //covert from json to js object
};

const getUser = () => {
	const tokens = localStorage.getItem("AuthTokens");
	return tokens ? jwt_decode(tokens) : null; //decode the token
};
export const authContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [authTokens, setAuthTokens] = useState(getAuthTokens());
	const [user, setUser] = useState(getUser());

	const login = async ({ username, password }) => {
		try {
			const { data } = await axios.post("/api/token", { username, password });
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("AuthTokens", JSON.stringify(data));
			navigate("/");
		} catch (error) {
			alert("something went wrong");
		}
	};

	const logout = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("AuthTokens");
		navigate("/login");
	};

	const UpdateToken = async () => {
		if (user === null || authTokens === null) return;
		try {
			const { data } = await axios.post("/api/token/refresh", {
				refresh: authTokens?.refresh,
			});
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("AuthTokens", JSON.stringify(data));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const interval = setInterval(UpdateToken, 60000); //every 60 seconds
		return () => clearInterval(interval);
	}, []);

	return (
		<authContext.Provider value={{ user, authTokens, login, logout }}>
			{children}
		</authContext.Provider>
	);
};
