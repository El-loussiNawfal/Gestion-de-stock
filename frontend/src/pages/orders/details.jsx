import { Link, useParams } from "react-router-dom";
import TableWithSearch from "../../components/TableWithSearch";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useQuery } from "react-query";
import { getOrder, getOrderDetails } from "./data";

const columns = [
	{ name: "Order Name", accessor: "NameOfTheOrder" },
	{ name: "Product", accessor: "FullNameofTheProduct" },
	{ name: "Quantity", accessor: "quantity" },
	{ name: "Total Price", accessor: "total_price" },
];

function OrdersDetails() {
	const { id } = useParams();
	const { data: order } = useQuery("order", () => getOrder(id));
	const { data, isLoading, error } = useQuery("order-details", () => getOrderDetails(id));

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
				title={"Order Details for " + order?.name}
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

export default OrdersDetails;
