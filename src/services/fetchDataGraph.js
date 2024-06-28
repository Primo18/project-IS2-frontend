const backendUrl = import.meta.env.VITE_BACKEND_URL;

async function fetchDataGraph(id_cliente) {
    const url = new URL(`${backendUrl}/api/rutina/circuitos/${id_cliente}`);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("fetchDataGraph", error);
    }
}

export default fetchDataGraph;