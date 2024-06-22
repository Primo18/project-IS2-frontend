const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function UpdateMaquina(jsonFormData) {
    try {
        const url = new URL(`${backendUrl}/api/maquinas`);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonFormData
        });
    } catch (error) {
        console.error("UpdateMaquina", error);
    }
}