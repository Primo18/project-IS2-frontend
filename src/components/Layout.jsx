import { Outlet } from "react-router-dom";
import { SideBar } from '../components/'

export const Layout = () => {
  return (
    <div>
      <div className="w-full h-screen bg-gray-200 object-cover flex items-center">
        <SideBar />
      </div>
      <Outlet />
    </div>
  );
};
