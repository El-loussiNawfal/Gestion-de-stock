import { Link } from "react-router-dom";
import TableWithSearch from "../../components/TableWithSearch";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import { getSuppliers } from "./data";

const columns = [
	{ name: "Name", accessor: "name" },
	{ name: "Products", accessor: "products" },
];

function SuppliersList() {
	const { data, isLoading, error } = useQuery("suppliers", getSuppliers);

	const suppliers = data
		? data.map((supplier) => ({
				...supplier,
				products: supplier.NameOfTheproductsSupplied.join(", "),
		  }))
		: [];

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
				title="Suppliers"
				action={() => (
					<Link to="/suppliers/create" className="btn btn-primary lift">
						New Supplier
					</Link>
				)}
			/>

			<TableWithSearch
				data={suppliers}
				columns={columns}
				editURL={(row) => "/suppliers/" + row.id + "/edit"}
			/>
		</Layout>
	);
}

export default SuppliersList;
