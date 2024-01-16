import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import Select from "../../components/form/Select";
import { getProducts } from "../products/data";
import { getOrders } from "../orders/data";
import { deleteOrderItem, getOrderItem, updateOrderItem } from "./data";

function OrdersItemsEdit() {
	const { id } = useParams();
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

	const { mutate } = useMutation(updateOrderItem, {
		onSuccess: () => {
			navigate("/orders-items");
		},
	});

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutate({
			id,
			order: data.order.value,
			product: data.product.value,
			quantity: data.quantity,
		});
	};

	const OnDelete = () => {
		if (confirm("Are you sure you want to delete this order item?")) {
			deleteOrderItem(id).then(() => {
				navigate("/orders-items");
			});
		}
	};

	useEffect(() => {
		getOrderItem(id).then((data) => {
			reset({
				order: { value: data.order, label: data.NameOfTheOrder },
				product: { value: data.product, label: data.FullNameofTheProduct },
				quantity: data.quantity,
			});
		});
	}, [id]);

	return (
		<Layout mid>
			<Header
				preTitle="update order item"
				title="Update order item"
				action={() => (
					<button className="btn btn-danger lift" onClick={OnDelete}>
						delete order item
					</button>
				)}
			/>

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
					Modify order items
				</button>
				<Link to="/orders-items" className="btn btn-block btn-link text-muted">
					Cancel
				</Link>
			</form>
		</Layout>
	);
}

export default OrdersItemsEdit;
