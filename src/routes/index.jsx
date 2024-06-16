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
import { fetchCliente, fetchRutinasByClienteId } from '../services/fetch-clientes';
import { fetchEntrenador, fetchEntrenadores } from '../services/fetch-entrenadores';
import Layout from '../components/Layout/Layout';
import { fetchDatosRutina } from '../services/fetch-datosRutina';
import Profile from '../components/Profile';
import Entrenador from '../pages/Entrenador';

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
                        path: 'entrenadores',
                        element: <Entrenadores />,
                        loader: async () => {
                            try {
                                const usuarios = await fetchEntrenadores();
                                return { usuarios };
                            } catch (error) {
                                console.error("Error loading data:", error);
                                return { usuarios: [] };
                            }
                        }
                    },
                    {
                        path: 'usuarios/:userId',
                        element: <Entrenador />,
                        loader: async ({ params }) => {
                            const usuario = await fetchEntrenador(params.userId);
                            return { usuario };
                        }
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
                                return { rutina: [] };
                            }
                        },
                    },
                    {
                        path: 'clientes/:clienteId/rutinas',
                        element: <Cliente />,
                        loader: async ({ params }) => {
                            const cliente = await fetchCliente(params.clienteId);
                            const rutinas = await fetchRutinasByClienteId(params.clienteId);
                            return { cliente, rutinas };
                        }
                    },
                    {
                        path: 'profile',
                        element: <Profile />
                    }
                ]
            }
        ]
    }
]);
