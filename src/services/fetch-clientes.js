const backendUrl = import.meta.env.VITE_BACKEND_URL;

// const BASE_URL_LOCAL = "http://localhost:8080/api";

// Permite obtener todos los clientes
export async function fetchClientes() {
    const url = new URL(`${backendUrl}/api/clientes`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchClientes", error);
    }
}

// Obtener todos los datos de un cliente
export async function fetchCliente(id) {
    const url = new URL(`${backendUrl}/api/clientes/${id}`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchCliente", error);
    }
}

// Permite obtener todos los datos de una rutina dado un cliente 
export async function fetchRutinasByClienteId(clienteId) {
    const url = new URL(`${backendUrl}/api/clientes/${clienteId}/rutinas`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchRutinasByClienteId", error);
    }
}
