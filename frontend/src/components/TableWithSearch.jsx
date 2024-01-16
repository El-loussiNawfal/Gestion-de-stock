import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

function TableWithSearch({ data, columns, editURL, viewURL }) {
	const [search, setSearch] = useState("");
	const filteredData = useMemo(
		() =>
			data.filter((row) =>
				Object.values(row).some((cell) =>
					cell.toString().toLowerCase().includes(search.toLowerCase())
				)
			),
		[data, search]
	);

	return (
		<div className="card">
			<div className="card-header">
				{/* Search */}
				<form>
					<div className="input-group input-group-flush">
						<div className="input-group-prepend">
							<span className="input-group-text">
								<i className="fe fe-search" />
							</span>
						</div>
						<input
							className="form-control search"
							type="search"
							placeholder="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</form>
			</div>
			<div className="table-responsive">
				<table className="table table-sm table-nowrap card-table">
					<thead>
						<tr>
							{columns.map(({ name }) => (
								<th key={name}>
									<span className="text-muted">{name} </span>
								</th>
							))}
							<th></th>
							{viewURL && <th></th>}
						</tr>
					</thead>
					<tbody className="list">
						{filteredData.map((row, i) => (
							<tr key={`row-${i}`}>
								{columns.map(({ accessor }) => (
									<td key={`${accessor}-${i}`}>{row[accessor]}</td>
								))}
								{viewURL && (
									<td>
										{/* Dropdown */}
										<Link to={viewURL(row)} className="text-indo">
											<span className="fe fe-eye" />
											View
										</Link>
									</td>
								)}
								<td>
									<Link to={editURL(row)} className="text-warning">
										<span className="fe fe-edit-2" />
										Edit
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default TableWithSearch;
