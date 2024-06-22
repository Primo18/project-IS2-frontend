const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function fetchMaquinas() {
    const url = new URL(`${backendUrl}/api/maquinas`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchMaquinas", error);
    }
}