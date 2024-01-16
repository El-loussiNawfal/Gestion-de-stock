import { useContext } from "react";
import { authContext } from "../context/auth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
	const { user } = useContext(authContext);

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
}
