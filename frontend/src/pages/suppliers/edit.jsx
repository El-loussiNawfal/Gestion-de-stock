import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import { deleteSupplier, getSupplier, updateSupplier } from "./data";
import Select from "../../components/form/Select";
import { getProducts } from "../products/data";

function SuppliersEdit() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: products, isLoading, error } = useQuery("products", getProducts);
	const options = products
		? products.map((product) => ({
				value: product.idproduct,
				label: product.name,
		  }))
		: [];

	const { mutate } = useMutation(updateSupplier, {
		onSuccess: () => {
			navigate("/suppliers");
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
		mutate({ id, name: data.name, products_supplied: data.products.map((p) => p.value) });
	};

	const OnDelete = () => {
		if (confirm("Are you sure you want to delete this supplier?")) {
			deleteSupplier(id).then(() => {
				navigate("/suppliers");
			});
		}
	};

	useEffect(() => {
		getSupplier(id).then((data) => {
			reset({
				name: data.name,
				products: data.products_supplied.map((id, i) => ({
					value: id,
					label: data.NameOfTheproductsSupplied[i],
				})),
			});
		});
	}, [id]);

	return (
		<Layout mid>
			<Header
				preTitle="update supplier"
				title="Update supplier"
				action={() => (
					<button className="btn btn-danger lift" onClick={OnDelete}>
						delete supplier
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
					Modify supplier
				</button>
				<Link to="/suppliers" className="btn btn-block btn-link text-muted">
					Cancel
				</Link>
			</form>
		</Layout>
	);
}

export default SuppliersEdit;
