import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import { deleteOrder, getOrder, updateOrder } from "./data";
import Select from "../../components/form/Select";
import { getClients } from "../clients/data";

function OrdersEdit() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: clients } = useQuery("clients", getClients);

	const options = clients
		? clients.map((client) => ({
				value: client.idclient,
				label: client.first_name + " " + client.last_name,
		  }))
		: [];

	const { mutate } = useMutation(updateOrder, {
		onSuccess: () => {
			navigate("/orders");
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
		mutate({ id, name: data.name, client: data.client.value });
	};

	const OnDelete = () => {
		if (confirm("Are you sure you want to delete this order?")) {
			deleteOrder(id).then(() => {
				navigate("/orders");
			});
		}
	};

	useEffect(() => {
		getOrder(id).then((data) => {
			reset({
				name: data.name,
				client: { value: data.client, label: data.FullNameofTheClient },
			});
		});
	}, [id]);

	return (
		<Layout mid>
			<Header
				preTitle="update order"
				title="Update order"
				action={() => (
					<button className="btn btn-danger lift" onClick={OnDelete}>
						delete order
					</button>
				)}
			/>

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
					Modify order
				</button>
				<Link to="/orders" className="btn btn-block btn-link text-muted">
					Cancel
				</Link>
			</form>
		</Layout>
	);
}

export default OrdersEdit;
