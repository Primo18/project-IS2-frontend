const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const login = async (email, password) => {
    const url = new URL(`${backendUrl}/auth/login`);
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
        return { success: true, data };
    } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
    }
};

export async function fetchProfile(token) {
    const url = new URL(`${backendUrl}/auth/profile`);

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Error fetching profile');
        }
    } catch (error) {
        console.error("fetchProfile", error);
    }
}
