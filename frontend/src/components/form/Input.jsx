import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, name, error, ...props }, ref) {
	return (
		<div className="form-group">
			<label className="form-label" htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				name={name}
				{...props}
				ref={ref}
				className={`form-control ${error && "is-invalid"}`}
			/>
			{error && <div className="invalid-feedback">{error.message}</div>}
		</div>
	);
});

export default Input;
