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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,

        children: [{
            path: "/HomeAdmin",
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
        {
            path: "/ClientesAdmin",
            element: <ClientesAdmin />
        },
        {
            path: "/MaquinasAdmin",
            element: <MaquinasAdmin />
        },
        {
            path: "/RutinasAdmin",
            element: <RutinasAdmin />
        },
        {
            path: "/EntrenadoresAdmin",
            element: <EntrenadoresAdmin />
        },
        ]
    }
]);
