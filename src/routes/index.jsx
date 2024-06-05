import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import Home from '../pages/HomeAdmin';
import Clientes from '../pages/Clientes';
import Maquinas from '../pages/Maquinas';
import Rutinas from '../pages/Rutinas';
import RegistroRutinas from '../pages/RegistroRutinas';
import Entrenadores from '../pages/EntrenadoresAdmin';
import LoginPage from '../pages/LoginPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import ClientRoutines from '../pages/ClientRoutines';
import { fetchCliente } from '../services/fetch-clientes';
import { fetchDatosRutina } from "../services/fetch-datosRutina";


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
                        path: "/registro-rutina",
                        element: <RegistroRutinas />,
                        loader: async () => {
                            try {
                                const datosRutina = await fetchDatosRutina();
                                return datosRutina;
                            } catch (error) {
                                console.error("Error loading data:", error);
                                return { rutina: [] }; // Datos predeterminados si hay error
                            }
                        },
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