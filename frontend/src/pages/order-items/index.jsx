import { Link } from "react-router-dom";
import TableWithSearch from "../../components/TableWithSearch";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import { getOrdersItems } from "./data";

const columns = [
	{ name: "Order Name", accessor: "NameOfTheOrder" },
	{ name: "Product", accessor: "FullNameofTheProduct" },
	{ name: "Quantity", accessor: "quantity" },
	{ name: "Total Price", accessor: "total_price" },
];

function OrdersItemsList() {
	const { data, isLoading, error } = useQuery("items", getOrdersItems);

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
				title="Orders Items"
				action={() => (
					<Link to="/orders-items/create" className="btn btn-primary lift">
						New Order Item
					</Link>
				)}
			/>

			<TableWithSearch
				data={data}
				columns={columns}
				editURL={(row) => "/orders-items/" + row.id + "/edit"}
			/>
		</Layout>
	);
}

export default OrdersItemsList;
