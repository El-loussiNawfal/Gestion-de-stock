import { Link } from "react-router-dom";
import TableWithSearch from "../../components/TableWithSearch";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import { getClients } from "./data";

const columns = [
	{ name: "First Name", accessor: "first_name" },
	{ name: "Last Name", accessor: "last_name" },
	{ name: "Email", accessor: "email" },
	{ name: "Phone", accessor: "phone_number" },
];

function ClientsList() {
	const { data, isLoading, error } = useQuery("clients", getClients);

	if (isLoading) {
		return "Loading...";
	}

	if (error) {
		return "An error has occurred: " + error.message;
	}

	return (
		<Layout>
			<Header
				preTitle="overview"
				title="Clients"
				action={() => (
					<Link to="/clients/create" className="btn btn-primary lift">
						New Client
					</Link>
				)}
			/>

			<TableWithSearch
				data={data}
				columns={columns}
				editURL={(row) => "/clients/" + row.idclient + "/edit"}
			/>
		</Layout>
	);
}

export default ClientsList;
