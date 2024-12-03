import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import NavbarAdmin from "./NavbarAdmin";

function Layout() {
  return (
    <div className="">
  <div className="lg:hidden ">
  <Sidebar />
  </div>
  <div className="hidden lg:block">
    <NavbarAdmin />
  </div>

      <div className="lg:ml-0 mx-5 mt-3 ml-[100px] lg:mt-[80px] ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
