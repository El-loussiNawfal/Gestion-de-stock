import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation, useQuery } from "react-query";
import { createOrderItem } from "./data";
import { getProducts } from "../products/data";
import { getOrders } from "../orders/data";

function OrderItemsCreate() {
	const navigate = useNavigate();
	const products = useQuery("products", getProducts);
	const orders = useQuery("orders", getOrders);

	const productsOptions = products.data
		? products.data.map((product) => ({
				value: product.idproduct,
				label: product.name,
		  }))
		: [];

	const ordersOptions = orders.data
		? orders.data.map((order) => ({
				value: order.id,
				label: order.name,
		  }))
		: [];

	const { mutate } = useMutation(createOrderItem, {
		onSuccess: () => {
			navigate("/orders-items");
		},
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutate({ order: data.order.value, product: data.product.value, quantity: data.quantity });
	};

	if (products.isLoading || orders.isLoading) {
		return "Loading...";
	}

	if (products.error || orders.error) {
		return "An error has occurred: " + products.error.message + orders.error.message;
	}

	return (
		<Layout mid>
			<Header preTitle="new order item" title="Create a new order item" />

			<form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-12">
						<Select
							label="Order Name"
							name="order"
							control={control}
							error={errors.order}
							options={ordersOptions}
							rules={{ required: "Order is required" }}
						/>
					</div>
					<div className="col-12">
						<Select
							label="Product Name"
							name="product"
							control={control}
							error={errors.product}
							options={productsOptions}
							rules={{ required: "Product is required" }}
						/>
					</div>
					<div className="col-12">
						<Input
							label="Quantity"
							name="quantity"
							type="number"
							{...register("quantity", {
								required: "Quantity is required",
							})}
							error={errors.quantity}
						/>
					</div>
				</div>

				<hr className="mt-5 mb-5" />
				<button type="submit" className="btn btn-block btn-primary">
					Create order item
				</button>
				<Link to="/orders-items" className="btn btn-block btn-link text-muted">
					Cancel this order item
				</Link>
			</form>
		</Layout>
	);
}

export default OrderItemsCreate;
