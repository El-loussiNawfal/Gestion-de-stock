import axios from "../../axios";

export async function getClients() {
	try {
		const response = await axios.get("/api/Clients");
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function getClient(id) {
	try {
		const response = await axios.get(`/api/Client/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function createClient(client) {
	try {
		const response = await axios.post("/api/Client/create", client);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function updateClient(client) {
	try {
		const response = await axios.put(`/api/Client/${client.idclient}/update/`, client);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteClient(id) {
	try {
		const response = await axios.delete(`/api/Client/${id}/delete/`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
