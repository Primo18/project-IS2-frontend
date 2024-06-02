import { createContext, useState, useEffect } from 'react';
import { login as loginService } from '../services/authService';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Aquí puedes verificar si el usuario ya tiene una sesión activa al cargar la aplicación
        const fetchProfile = async () => {
            // Lógica para obtener el perfil del usuario
            // Si el usuario está autenticado, actualiza el estado del usuario
            setIsLoading(false);
        };

        fetchProfile();
    }, []);

    const login = async (email, password) => {
        const result = await loginService(email, password);
        if (result.success) {
            setUser(result.data);
        }
        return result;
    };

    const logout = () => {
        // Lógica para cerrar sesión
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};