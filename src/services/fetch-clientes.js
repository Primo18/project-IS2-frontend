const BASE_URL =
    "https://project-is2-backend-production.up.railway.app/api";

// Permite obtener todos los clientes
export async function fetchClientes() {
    const url = new URL(`${BASE_URL}/clientes`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchClientes", error);
    }
}

// Obtener todos los datos de un cliente
export async function fetchCliente(id) {
    const url = new URL(`${BASE_URL}/clientes/${id}`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchCliente", error);
    }
}