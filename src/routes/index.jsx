import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import Home from "../pages/Home";
import Clientes from "../pages/Clientes"
import Maquinas from "../pages/Maquinas"
import Rutinas from "../pages/Rutinas"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,

        children: [{
            path: "/Home",
            element: <Home />
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
        }
        ]
    }
]);
