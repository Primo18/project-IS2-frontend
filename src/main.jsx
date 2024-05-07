import ReactDOM from 'react-dom/client'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Calendario from './pages/Calendario.jsx'
import Horas from './pages/Horas.jsx'
import Add from './pages/Add.jsx'
import SideBar from './components/SideBar.jsx'
import Home from './pages/Home.jsx'
import Usuarios from './pages/Usuarios.jsx'
import Info from './pages/Info.jsx'


const Layout = () => {
  return (
    <div>
      <div className="w-full h-screen bg-gray-200 object-cover flex items-center">
        <SideBar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;

const router = createBrowserRouter([{
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
