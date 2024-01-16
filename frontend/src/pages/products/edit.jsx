import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation } from "react-query";
import { deleteProduct, getProduct, updateProduct } from "./data";
import { useEffect } from "react";
import Textarea from "../../components/form/Textarea";

function ProductsEdit() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { mutate } = useMutation(updateProduct, {
		onSuccess: () => {
			navigate("/products");
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		mutate({ idproduct: id, ...data });
	};

	const OnDelete = () => {
		if (confirm("Are you sure you want to delete this products?")) {
			deleteProduct(id).then(() => {
				navigate("/products");
			});
		}
	};

	useEffect(() => {
		getProduct(id).then((data) => {
			reset(data);
		});
	}, [id]);

	return (
		<Layout mid>
			<Header
				preTitle="update product"
				title="Update product"
				action={() => (
					<button className="btn btn-danger lift" onClick={OnDelete}>
						delete product
					</button>
				)}
			/>

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
					Modify product
				</button>
				<Link to="/products" className="btn btn-block btn-link text-muted">
					Cancel
				</Link>
			</form>
		</Layout>
	);
}

export default ProductsEdit;
