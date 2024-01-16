import axios from "../../axios";

export async function getProducts() {
	try {
		const response = await axios.get("/api/products");
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function getProduct(id) {
	try {
		const response = await axios.get(`/api/products/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function createProduct(product) {
	try {
		const response = await axios.post("/api/product/create/", product);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function updateProduct(product) {
	try {
		const response = await axios.put(`/api/product/${product.idproduct}/update/`, product);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteProduct(id) {
	try {
		const response = await axios.delete(`/api/product/${id}/delete/`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
