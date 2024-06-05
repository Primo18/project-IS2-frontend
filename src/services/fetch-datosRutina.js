const BASE_URL = "https://project-is2-backend-production.up.railway.app/rutina";

export async function fetchDatosRutina() {
    const url = new URL(`${BASE_URL}/api`)

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchDatosRutina", error);
    }
}