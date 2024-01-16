import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/auth";

function Navbar() {
	const { logout } = useContext(authContext);
	return (
		<nav
			className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light"
			id="sidebar"
		>
			<div className="container-fluid">
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#sidebarCollapse"
					aria-controls="sidebarCollapse"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<Link className="navbar-brand" to="/">
					<img
						src="/assets/img/logo.svg"
						className="navbar-brand-img mx-auto"
						alt="..."
					/>
				</Link>

				<div className="navbar-user d-md-none">
					<button className="btn btn-sm btn-primary" onClick={logout}>
						logout
					</button>
				</div>

				<div className="collapse navbar-collapse" id="sidebarCollapse">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/clients">
								<i className="fe fe-users"></i> Clients
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/products">
								<i className="fe fe-archive"></i> Products
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/suppliers">
								<i className="fe fe-users"></i> Suppliers
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/orders">
								<i className="fe fe-truck"></i> Orders
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/orders-items">
								<i className="fe fe-box"></i> Orders Items
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/notes">
								<i className="fe fe-alert-circle"></i> My notes
							</Link>
						</li>
					</ul>

					<div className="mt-auto"></div>

					<div className="navbar-user d-none d-md-flex" id="sidebarUser">
						<button className="btn btn-primary w-100" onClick={logout}>
							<span className="fe fe-log-out me-2"></span>
							Logout
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
