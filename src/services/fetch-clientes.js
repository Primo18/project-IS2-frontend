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

// Permite obtener un cliente por su id
export async function fetchCliente(id) {
    const url = new URL(`${BASE_URL}/clientes/${id}`);

    try {
        const response = await fetch(url);
        console.log(response);
        return await response.json();
    } catch (error) {
        console.error("fetchCliente", error);
    }
}

// Permite obtener las rutinas de un cliente
export async function fetchRutinasCliente(id) {
    const url = new URL(`${BASE_URL}/clientes/${id}/rutinas`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchRutinasCliente", error);
    }
}

