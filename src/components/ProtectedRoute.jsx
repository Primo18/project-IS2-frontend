import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Cargando...</div>; // Puedes mostrar un spinner o una pantalla de carga aquí
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};


