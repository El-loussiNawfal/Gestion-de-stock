import axios from "../../axios";

export async function getOrdersItems() {
	try {
		const response = await axios.get("/api/orderitems");
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function getOrderItem(id) {
	try {
		const response = await axios.get(`/api/orderitem/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function createOrderItem(order) {
	try {
		const response = await axios.post("/api/orderitem/create", order);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function updateOrderItem(order) {
	try {
		const response = await axios.put(`/api/orderitem/${order.id}/update/`, order);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteOrderItem(id) {
	try {
		const response = await axios.delete(`/api/orderitem/${id}/delete/`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
