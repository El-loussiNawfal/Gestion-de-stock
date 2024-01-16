import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation, useQuery } from "react-query";
import { createSupplier } from "./data";
import { getProducts } from "../products/data";

function SuppliersCreate() {
	const navigate = useNavigate();
	const { data: products, isLoading, error } = useQuery("products", getProducts);
	const options = products
		? products.map((product) => ({
				value: product.idproduct,
				label: product.name,
		  }))
		: [];

	const { mutate } = useMutation(createSupplier, {
		onSuccess: () => {
			navigate("/suppliers");
		},
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutate({ name: data.name, products_supplied: data.products.map((p) => p.value) });
	};

	if (isLoading) {
		return "Loading...";
	}

	if (error) {
		return "An error has occurred: " + error.message;
	}

	return (
		<Layout mid>
			<Header preTitle="new supplier" title="Create a new supplier" />

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
							multiple
							label="Products"
							name="products"
							control={control}
							error={errors.products}
							options={options}
							rules={{ required: "Products are required" }}
						/>
					</div>
				</div>

				<hr className="mt-5 mb-5" />
				<button type="submit" className="btn btn-block btn-primary">
					Create supplier
				</button>
				<Link to="/suppliers" className="btn btn-block btn-link text-muted">
					Cancel this supplier
				</Link>
			</form>
		</Layout>
	);
}

export default SuppliersCreate;
