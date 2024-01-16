import PrivateRoute from "../PrivateRoute";
import Main from "./Main";
import Navbar from "./Navbar";

function Layout({ children, mid }) {
	return (
		<PrivateRoute>
			<Navbar />
			<Main mid={mid}>{children}</Main>
		</PrivateRoute>
	);
}

export default Layout;
