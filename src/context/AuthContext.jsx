import { createContext, useState, useEffect } from 'react';
import { login as loginService } from '../services/authService';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
        };

        fetchProfile();
    }, []);

    const login = async (email, password) => {
        const result = await loginService(email, password);
        if (result.success) {
            setUser(result.data.user);
            localStorage.setItem('user', JSON.stringify(result.data.user));
        }
        return result;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
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
