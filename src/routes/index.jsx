import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import HomeEntrenador from "../pages/HomeEntrenador";
import HomeAdmin from "../pages/HomeAdmin";
import Clientes from "../pages/Clientes"
import Maquinas from "../pages/Maquinas"
import Rutinas from "../pages/Rutinas"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,

        children: [{
            path: "/",
            element: <HomeAdmin />
        },
        {
            path: "/HomeEntrenador",
            element: <HomeEntrenador />
        },
        {
            path: "/Clientes",
            element: <Clientes />
        },
        {
            path: "/Maquinas",
            element: <Maquinas />
        },
        {
            path: "/Rutinas",
            element: <Rutinas />
        },
        ]
    }
]);
