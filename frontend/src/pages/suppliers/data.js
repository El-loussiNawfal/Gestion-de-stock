import axios from "../../axios";

export async function getSuppliers() {
	try {
		const response = await axios.get("/api/suppliers");
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function getSupplier(id) {
	try {
		const response = await axios.get(`/api/supplier/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function createSupplier(supplier) {
	try {
		const response = await axios.post("/api/supplier/create", supplier);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function updateSupplier(supplier) {
	try {
		const response = await axios.put(`/api/supplier/${supplier.id}/update/`, supplier);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteSupplier(id) {
	try {
		const response = await axios.delete(`/api/supplier/${id}/delete/`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
