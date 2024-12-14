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

      <div className=" lg:mt-[250px] lg:ml-0  flex justify-center items-center  mt-3 ml-[100px] mx-auto w-screen ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
