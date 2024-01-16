import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

export default function Select({ label, name, error, control, options, multiple, rules }) {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<Controller
				rules={rules}
				id={name}
				name={name}
				control={control}
				render={({ field }) => (
					<ReactSelect isMulti={multiple} {...field} options={options} />
				)}
			/>
			{error && <div className="text-sm-left text-danger">{error.message}</div>}
		</div>
	);
}
