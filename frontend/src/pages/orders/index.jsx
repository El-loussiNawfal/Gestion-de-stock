import { Link } from "react-router-dom";
import TableWithSearch from "../../components/TableWithSearch";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import { getOrders } from "./data";

const columns = [
	{ name: "Name", accessor: "name" },
	{ name: "Client", accessor: "FullNameofTheClient" },
	{ name: "Products", accessor: "products" },
	{ name: "Total Price", accessor: "total_price" },
];

function OrdersList() {
	const { data, isLoading, error } = useQuery("orders", getOrders);

	const orders = data
		? data.map((order) => ({
				...order,
				total_price: order.total_price + " DHs",
				products: order.NameOfTheProducts.join(", "),
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
				title="Orders"
				action={() => (
					<Link to="/orders/create" className="btn btn-primary lift">
						New Order
					</Link>
				)}
			/>

			<TableWithSearch
				data={orders}
				columns={columns}
				editURL={(row) => "/orders/" + row.id + "/edit"}
				viewURL={(row) => "/orders/" + row.id + "/details"}
			/>
		</Layout>
	);
}

export default OrdersList;
