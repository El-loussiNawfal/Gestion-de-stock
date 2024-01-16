import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation } from "react-query";
import { createClient } from "./data";

function ClientsCreate() {
	const navigate = useNavigate();
	const { mutate } = useMutation(createClient, {
		onSuccess: () => {
			navigate("/clients");
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutate(data);
	};

	return (
		<Layout mid>
			<Header preTitle="new client" title="Create a new client" />

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
					Create client
				</button>
				<Link to="/clients" className="btn btn-block btn-link text-muted">
					Cancel this client
				</Link>
			</form>
		</Layout>
	);
}

export default ClientsCreate;
