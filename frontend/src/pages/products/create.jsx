import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Textarea from "../../components/form/Textarea";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation } from "react-query";
import { createProduct } from "./data";

function ProductsCreate() {
	const navigate = useNavigate();
	const { mutate } = useMutation(createProduct, {
		onSuccess: () => {
			navigate("/products");
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
			<Header preTitle="new product" title="Create a new product" />

			<form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-12 col-md-6">
						<Input
							label="Name"
							name="name"
							{...register("name", {
								required: "Name is required",
							})}
							error={errors.name}
						/>
					</div>
					<div className="col-12 col-md-6">
						<Input
							label="Price"
							name="price"
							type="number"
							{...register("price", { required: "Price is required" })}
							error={errors.price}
						/>
					</div>
					<div className="col-12">
						<Textarea
							label="Description"
							name="description"
							{...register("description", {
								required: "Description is required",
							})}
							error={errors.description}
						/>
					</div>
				</div>

				<hr className="mt-5 mb-5" />
				<button type="submit" className="btn btn-block btn-primary">
					Create product
				</button>
				<Link to="/products" className="btn btn-block btn-link text-muted">
					Cancel this product
				</Link>
			</form>
		</Layout>
	);
}

export default ProductsCreate;
