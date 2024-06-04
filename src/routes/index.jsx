import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import HomeEntrenador from "../pages/HomeEntrenador";
import HomeAdmin from "../pages/HomeAdmin";
import Clientes from "../pages/Clientes"
import Maquinas from "../pages/Maquinas"
import Rutinas from "../pages/Rutinas"
import ClientesAdmin from "../pages/ClientesAdmin"
import MaquinasAdmin from "../pages/MaquinasAdmin"
import RutinasAdmin from "../pages/RutinasAdmin"
import EntrenadoresAdmin from "../pages/EntrenadoresAdmin"
import LoginPage from "../pages/LoginPage";
import { ProtectedRoute } from '../components/ProtectedRoute'; // Importa el componente

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,

        children: [
            {
                path: "login",
                element: <LoginPage /> // Ruta de login sin protección
            },
            {
                path: "/home",
                element: (
                    <ProtectedRoute>
                        <HomeAdmin />
                    </ProtectedRoute>
                )
            },
            {
                path: "/HomeEntrenador",
                element: (
                    <ProtectedRoute>
                        <HomeEntrenador />
                    </ProtectedRoute>
                )
            },
            {
                path: "/Clientes",
                element: (
                    <ProtectedRoute>
                        <Clientes />
                    </ProtectedRoute>
                )
            },
            {
                path: "/Maquinas",
                element: (
                    <ProtectedRoute>
                        <Maquinas />
                    </ProtectedRoute>
                )
            },
            {
                path: "/Rutinas",
                element: (
                    <ProtectedRoute>
                        <Rutinas />
                    </ProtectedRoute>
                )
            },
            {
                path: "/ClientesAdmin",
                element: (
                    <ProtectedRoute>
                        <ClientesAdmin />
                    </ProtectedRoute>
                )
            },
            {
                path: "/MaquinasAdmin",
                element: (
                    <ProtectedRoute>
                        <MaquinasAdmin />
                    </ProtectedRoute>
                )
            },
            {
                path: "/RutinasAdmin",
                element: (
                    <ProtectedRoute>
                        <RutinasAdmin />
                    </ProtectedRoute>
                )
            },
            {
                path: "/EntrenadoresAdmin",
                element: (
                    <ProtectedRoute>
                        <EntrenadoresAdmin />
                    </ProtectedRoute>
                )
            },
        ]
    }
]);
