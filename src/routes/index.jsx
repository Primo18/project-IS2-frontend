import { createBrowserRouter } from "react-router-dom";
import { ClientRoutines } from "../pages";
import { fetchCliente } from "../services/fetch-clientes";
import { Layout } from "../components/Layout";
import { Home, Calendario, Horas, Add, Usuarios, Info } from "../pages";
import { DashboardCliente, RegistroRutinas } from "../pages";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [{
            path: "/",
            element: <Home />
        },
        {
            path: "/Calendario",
            element: <Calendario />
        },
        {
            path: "/Horas",
            element: <Horas />
        },
        {
            path: "/Add",
            element: <Add />
        },
        {
            path: "/Usuarios",
            element: <Usuarios />
        },
        {
            path: "/Info",
            element: <Info />
        },

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
                return { cliente: null, rutinas: [] };  // Retorna valores predeterminados en caso de error
            }
        },
        fallback: () => <h1>Cargando...</h1>,
        ErrorBoundary: () => <h1>Ocurrió un error al cargar las rutinas del cliente</h1>,
    },
    {
        path: "/DashboardCliente",
        element: <DashboardCliente />
    },
    {
        path: "/RegistroRutinas",
        element: <RegistroRutinas />
    }
]);
