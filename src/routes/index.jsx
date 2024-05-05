import { createBrowserRouter } from "react-router-dom";
import { ClientRoutines } from "../pages";
import { fetchCliente } from "../services/fetch-clientes";
import { Home } from "../pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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
    }
]);