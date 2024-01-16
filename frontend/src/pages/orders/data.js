import axios from "../../axios";

export async function getOrders() {
	try {
		const response = await axios.get("/api/orders");
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function getOrder(id) {
	try {
		const response = await axios.get(`/api/order/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function getOrderDetails(id) {
	try {
		const response = await axios.get(`/api/orderdetails/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function createOrder(order) {
	try {
		const response = await axios.post("/api/order/create", order);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function updateOrder(order) {
	try {
		const response = await axios.put(`/api/order/${order.id}/update/`, order);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteOrder(id) {
	try {
		const response = await axios.delete(`/api/order/${id}/delete/`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
