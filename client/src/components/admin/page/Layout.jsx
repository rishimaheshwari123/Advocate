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

      <div className=" lg:mt-[250px] lg:ml-24  mt-3 ml-[100px] max-w-[85vw] mx-auto ">
        <Outlet />
      </div>

      <div className="hidden lg:block bg-[#b1d7e0] rounded-b-lg overflow-hidden shadow-lg">
        <div className="flex justify-between items-center">
          {/* Wishes Section */}
          <div className="flex items-center">
            <button className="bg-[#85b6d3] text-black font-bold py-2 px-4 border-[1px] border-black rounded-md">
              Wishes
            </button>
            <div className="text-red-600 text-2xl font-bold ml-1">»»</div>
          </div>

          {/* Client Grievance Alerts Section */}
          <div className="flex items-center">
            <button className="bg-[#85b6d3] text-black font-bold py-2 px-4 border-[1px] border-black rounded-md">
              Client Grievance Alerts
            </button>
            <div className="text-red-600 text-2xl font-bold ml-1">»»</div>
          </div>

          {/* Notification Alerts Section */}
          <div className="flex items-center">
            <button className="bg-[#85b6d3] text-black font-bold py-2 px-4 border-[1px] border-black rounded-md">
              Notification Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
