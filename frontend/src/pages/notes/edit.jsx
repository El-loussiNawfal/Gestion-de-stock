import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import Header from "../../components/layout/Header";
import Layout from "../../components/layout/Layout";
import { useMutation } from "react-query";
import { deleteNote, getNoteById, updateNote } from "./data";
import { useEffect } from "react";

function NotesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate } = useMutation(updateNote, {
    onSuccess: () => {
      navigate("/notes");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutate({ id: id, ...data });
  };

  const onDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote(id).then(() => {
        navigate("/notes");
      });
    }
  };

  useEffect(() => {
    getNoteById(id).then((data) => {
      reset(data); // Assuming the data contains fields like "first_name", "last_name", "email", "phone_number" for notes
    });
  }, [id, reset]);

  return (
    <Layout mid>
      <Header
        preTitle="Update Note"
        title="Update Note"
        action={() => (
          <button className="btn btn-danger lift" onClick={onDelete}>
            Delete Note
          </button>
        )}
      />

      <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Adjust the form fields as needed for editing notes */}
        <div className="row">
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

        <hr className="mt-5 mb-5" />
        <button type="submit" className="btn btn-block btn-primary">
          Modify Note
        </button>
        <Link to="/notes" className="btn btn-block btn-link text-muted">
          Cancel
        </Link>
      </form>
    </Layout>
  );
}

export default NotesEdit;
