import { createBrowserRouter } from "react-router-dom";
import { ClientRoutines } from "../pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ClientRoutines />,
    },
    {
        path: "/cliente/rutinas",
        element: <ClientRoutines />,
        // No se necesita loader si no estás cargando datos externos
        // Si necesitas cargar datos, puedes agregar un loader aquí
        ErrorBoundary: () => <h1>Ocurrió un error al cargar las rutinas del cliente</h1>,
    }
]);
