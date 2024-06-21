import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import PropTypes from 'prop-types';


const AdminRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Cargando...</div>; // Puedes mostrar un spinner o una pantalla de carga aquí
    }

    if (!user || user.role !== 'administrador') {
        return <Navigate to="/home" />;
    }

    return children;
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default AdminRoute;
