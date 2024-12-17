import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavbarAdmin from "./NavbarAdmin";

function Layout() {
  return (
    <div className="">
      <div className="lg:hidden ">
        <Sidebar />
      </div>
      <div className="hidden lg:block ">
        <NavbarAdmin />
      </div>

      <div className=" lg:mt-[250px] lg:mb-[150px] lg:ml-24  mt-3 ml-[100px] max-w-[85vw] mx-auto ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
