const BASE_URL =
    "https://project-is2-backend-production.up.railway.app";

export const login = async (email, password) => {
    const url = new URL(`${BASE_URL}/auth/login`);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Asegúrate de incluir las credenciales en la solicitud
    });

    if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.token}`;
        return { success: true, data };
    } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
    }
};
