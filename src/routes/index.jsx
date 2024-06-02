import { createBrowserRouter } from 'react-router-dom';
import { ClientRoutines } from "../pages";
import { fetchCliente } from "../services/fetch-clientes";
import { Layout, ProtectedRoute } from "../components";
import { Home, Calendario, Horas, Add, Usuarios, LoginPage, DashboardCliente, RegistroRutinas } from "../pages";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/calendario", element: <Calendario /> },
            { path: "/horas", element: <Horas /> },
            { path: "/add", element: <Add /> },
            { path: "/usuarios", element: <Usuarios /> },
        ],
    },
    {
        path: "/cliente/:id/",
        element: <ClientRoutines />,
        loader: async ({ params }) => {
            const { id } = params;
            try {
                const cliente = await fetchCliente(id);
                return cliente;
            } catch (error) {
                console.error("Error loading data:", error);
                return { cliente: null, rutinas: [] };
            }
        },
        fallback: () => <h1>Cargando...</h1>,
        ErrorBoundary: () => <h1>Ocurrió un error al cargar las rutinas del cliente</h1>,
    },
    {
        element: <ProtectedRoute />, // Anida las rutas protegidas bajo ProtectedRoute
        children: [
            { path: "/dashboard", element: <DashboardCliente /> },
            { path: "/registro-rutinas", element: <RegistroRutinas /> },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />
    }
]);
