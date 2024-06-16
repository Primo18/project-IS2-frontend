const backendUrl = import.meta.env.VITE_BACKEND_URL;

// const BASE_URL_LOCAL = "http://localhost:8080/api";

//  FETCH ENTRENADORES

// Permite obtener todos los entrenadores
export async function fetchEntrenadores() {
    const url = new URL(`${backendUrl}/api/usuarios`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchEntrenadores", error);
    }

}

// Obtener todos los datos de un entrenador
export async function fetchEntrenador(id) {
    const url = new URL(`${backendUrl}/api/usuarios/${id}`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchEntrenador", error);
    }
}
