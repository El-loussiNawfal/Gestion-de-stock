import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation } from "react-query";
import { deleteClient, getClient, updateClient } from "./data";
import { useEffect } from "react";

function ClientsEdit() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { mutate } = useMutation(updateClient, {
		onSuccess: () => {
			navigate("/clients");
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutate({ idclient: id, ...data });
	};

	const OnDelete = () => {
		if (confirm("Are you sure you want to delete this client?")) {
			deleteClient(id).then(() => {
				navigate("/clients");
			});
		}
	};

	useEffect(() => {
		getClient(id).then((data) => {
			reset(data);
		});
	}, [id]);

	return (
		<Layout mid>
			<Header
				preTitle="update client"
				title="Update client"
				action={() => (
					<button className="btn btn-danger lift" onClick={OnDelete}>
						delete client
					</button>
				)}
			/>

			<form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-12 col-md-6">
						<Input
							label="First name"
							name="first_name"
							{...register("first_name", {
								required: "First Name is required",
							})}
							error={errors.first_name}
						/>
					</div>
					<div className="col-12 col-md-6">
						<Input
							label="Last name"
							name="last_name"
							{...register("last_name", { required: "Last Name is required" })}
							error={errors.last_name}
						/>
					</div>
					<div className="col-12 col-md-6">
						<Input
							label="Email"
							name="email"
							{...register("email", { required: "Email is required" })}
							error={errors.email}
						/>
					</div>
					<div className="col-12 col-md-6">
						<Input
							label="Phone Number"
							name="phone_number"
							{...register("phone_number", {
								required: "Phone Number is required",
							})}
							error={errors.phone_number}
						/>
					</div>
				</div>

				<hr className="mt-5 mb-5" />
				<button type="submit" className="btn btn-block btn-primary">
					Modify client
				</button>
				<Link to="/clients" className="btn btn-block btn-link text-muted">
					Cancel
				</Link>
			</form>
		</Layout>
	);
}

export default ClientsEdit;
