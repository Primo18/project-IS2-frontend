import { createBrowserRouter } from 'react-router-dom';
import Presentacion from '../pages/Presentacion';
import Home from '../pages/Home';
import Clientes from '../pages/Clientes';
import Maquinas from '../pages/Maquinas';
import RegistroRutinas from '../pages/RegistroRutinas';
import Entrenadores from '../pages/Entrenadores';
import LoginPage from '../pages/LoginPage';
import { ProtectedRoute } from '../components/Login/ProtectedRoute';
import Cliente from '../pages/Cliente';
import { fetchCliente } from '../services/fetch-clientes';
import { fetchDatosRutina } from "../services/fetch-datosRutina";
import Layout from '../components/Layout/Layout';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <Presentacion />
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                element: <ProtectedRoute />, // Protege todas las rutas a continuación
                children: [
                    {
                        path: 'home',
                        element: <Home />
                    },
                    {
                        path: 'clientes',
                        element: <Clientes />
                    },
                    {
                        path: 'maquinas',
                        element: <Maquinas />
                    },
                    {
                        path: "rutinas",
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
                        path: 'entrenadores',
                        element: <Entrenadores />
                    },
                    {
                        path: 'clientes/:clienteId/rutinas',
                        element: <Cliente />,
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
