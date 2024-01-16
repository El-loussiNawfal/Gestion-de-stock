import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation } from "react-query";
import { createNote } from "./data"; // You would need to create a suitable createNote function

function NotesCreate() {
	const navigate = useNavigate();
	const { mutate } = useMutation(createNote, {
		onSuccess: () => {
			navigate("/notes");
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
			<Header preTitle="New Note" title="Create a new note" />

			<form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="row">
					<div className="col-12">
						<Input
							label="Note Body"
							name="body"
							type="textarea" // Use textarea for the note body
							{...register("body", {
								required: "Note Body is required",
							})}
							error={errors.body}
						/>
					</div>
				</div>

				<hr className="mt-5 mb-5" />
				<button type="submit" className="btn btn-block btn-primary">
					Create Note
				</button>
				<Link to="/notes" className="btn btn-block btn-link text-muted">
					Cancel this note
				</Link>
			</form>
		</Layout>
	);
}

export default NotesCreate;
