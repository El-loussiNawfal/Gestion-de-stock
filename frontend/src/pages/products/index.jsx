import { Link } from "react-router-dom";
import TableWithSearch from "../../components/TableWithSearch";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import { getProducts } from "./data";

const columns = [
	{ name: "Name", accessor: "name" },
	{ name: "Description", accessor: "description" },
	{ name: "Price", accessor: "price" },
];

function ProductsList() {
	const { data, isLoading, error } = useQuery("products", getProducts);

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
				title="Products"
				action={() => (
					<Link to="/products/create" className="btn btn-primary lift">
						New Product
					</Link>
				)}
			/>

			<TableWithSearch
				data={data}
				columns={columns}
				editURL={(row) => "/products/" + row.idproduct + "/edit"}
			/>
		</Layout>
	);
}

export default ProductsList;
