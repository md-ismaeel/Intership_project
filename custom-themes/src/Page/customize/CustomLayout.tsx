import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import { Outlet } from "react-router-dom";

export default function CustomLayout() {
  return (
    <>
      <Header />
      <div className="w-full h-auto flex justify-between items-start px-5 pt-5 bg-gray-100">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
