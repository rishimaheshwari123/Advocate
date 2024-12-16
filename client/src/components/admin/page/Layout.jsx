import { Outlet } from "react-router-dom";
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

      <div className=" lg:mt-[250px] lg:ml-24 mx-1 mt-3 ml-[100px] ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
