import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea({ label, name, error, ...props }, ref) {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<textarea
				name={name}
				id={name}
				{...props}
				rows={4}
				ref={ref}
				className={`form-control ${error && "is-invalid"}`}
			/>
			{error && <div className="invalid-feedback">{error.message}</div>}
		</div>
	);
});

export default Textarea;
