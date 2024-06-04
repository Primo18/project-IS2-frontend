import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import Home from '../pages/HomeAdmin';
import Clientes from '../pages/Clientes';
import Maquinas from '../pages/Maquinas';
import Rutinas from '../pages/Rutinas';
import Entrenadores from '../pages/EntrenadoresAdmin';
import LoginPage from '../pages/LoginPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import ClientRoutines from '../pages/ClientRoutines';
import { fetchCliente } from '../services/fetch-clientes';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                element: <ProtectedRoute />, // Protege todas las rutas a continuación
                children: [
                    {
                        path: '/home',
                        element: <Home />
                    },
                    {
                        path: '/clientes',
                        element: <Clientes />
                    },
                    {
                        path: '/maquinas',
                        element: <Maquinas />
                    },
                    {
                        path: '/rutinas',
                        element: <Rutinas />
                    },
                    {
                        path: '/entrenadores',
                        element: <Entrenadores />
                    },
                    {
                        path: '/clientes/:clienteId/rutinas',
                        element: <ClientRoutines />,
                        loader: async ({ params }) => {
                            const cliente = await fetchCliente(params.clienteId);
                            return cliente;
                        }
                    }
                ]
            }
        ]
    }
]);
