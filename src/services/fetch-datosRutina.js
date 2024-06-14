const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function fetchDatosRutina() {
    const url = new URL(`${backendUrl}/api/rutina`)

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchDatosRutina", error);
    }
}