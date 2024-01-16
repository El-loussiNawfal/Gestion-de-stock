import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation, useQuery } from "react-query";
import { createOrder } from "./data";
import { getClients } from "../clients/data";

function OrdersCreate() {
	const navigate = useNavigate();
	const { data: clients, isLoading, error } = useQuery("clients", getClients);

	const options = clients
		? clients.map((client) => ({
				value: client.idclient,
				label: client.first_name + " " + client.last_name,
		  }))
		: [];

	const { mutate } = useMutation(createOrder, {
		onSuccess: () => {
			navigate("/orders");
		},
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutate({ name: data.name, client: data.client.value });
	};

	if (isLoading) {
		return "Loading...";
	}

	if (error) {
		return "An error has occurred: " + error.message;
	}

	return (
		<Layout mid>
			<Header preTitle="new order" title="Create a new order" />

			<form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-12">
						<Input
							label="Name"
							name="name"
							{...register("name", {
								required: "Name is required",
							})}
							error={errors.name}
						/>
					</div>
					<div className="col-12">
						<Select
							label="Clients"
							name="client"
							control={control}
							error={errors.client}
							options={options}
							rules={{ required: "Client is required" }}
						/>
					</div>
				</div>

				<hr className="mt-5 mb-5" />
				<button type="submit" className="btn btn-block btn-primary">
					Create order
				</button>
				<Link to="/orders" className="btn btn-block btn-link text-muted">
					Cancel this order
				</Link>
			</form>
		</Layout>
	);
}

export default OrdersCreate;
