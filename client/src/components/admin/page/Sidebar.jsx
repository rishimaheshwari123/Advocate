import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { FaHome, FaRegNewspaper, FaUsers, FaUsersCog } from "react-icons/fa";
import { FcBullish } from "react-icons/fc";
import { MdOutlineFeedback } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/auth";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    dispatch(logout(navigate));
  };

  // Function to toggle sidebar collapse
  const handleToggle = () => {
    const collapsed = !isCollapsed;
    setIsCollapsed(collapsed);
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  };

  // Effect to close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsCollapsed(true);
        localStorage.setItem("sidebarCollapsed", "true");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Back To Home" },

    ...(user?.role === "SuperAdmin"
      ? [
          { to: "/admin/dashboard", icon: <FcBullish />, label: "Dashboard" },
          {
            to: "/admin/addGallery",
            icon: <FaRegNewspaper />,
            label: "Add Gallery",
          },
          {
            to: "/admin/getGallery",
            icon: <MdOutlineFeedback />,
            label: "Get Gallery",
          },
          {
            to: "/admin/addCompany",
            icon: <FaRegNewspaper />,
            label: "Add Company",
          },
          {
            to: "/admin/getCompany",
            icon: <MdOutlineFeedback />,
            label: "Get Company",
          },
        ]
      : []),

    ...(company?.role === "Company" && company.permissions?.hrm
      ? [
          {
            to: "/company/add-employee",
            icon: <FaUsers />,
            label: "Add Employee",
          },
          {
            to: "/company/get-employee",
            icon: <FaUsersCog />,
            label: "Get Employees",
          },
          {
            to: "/company/get-attendance",
            icon: <FaUsersCog />,
            label: "Attendance",
          },
        ]
      : []),
  ];

  return (
    <div
      ref={sidebarRef}
      className={`fixed h-screen top-0 ${
        isCollapsed ? "w-20" : "w-64"
      } bg-gray-900 transition-all duration-300 z-50`}
    >
      <div className="flex items-center justify-between p-4">
        {/* Logo section */}
        <div
          className={`${
            isCollapsed ? "hidden" : "block"
          } text-white font-bold text-xl`}
        >
          <h2>S.D Taxation Associate</h2>
        </div>
        {/* Toggle button */}
        <button
          onClick={handleToggle}
          className="bg-transparent border-none w-8 h-8 flex justify-center items-center cursor-pointer text-white"
        >
          {isCollapsed ? <CiMenuFries size={22} /> : <RxCross1 size={22} />}
        </button>
      </div>

      {/* Navigation links */}
      <ul className="text-white list-none flex flex-col gap-2 p-4 mb-14 max-h-[70vh] overflow-y-scroll sidebar">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `text-white py-4 flex items-center hover:border-r-4 hover:border-black ${
                isActive ? "border-r-4 border-white" : ""
              }`
            }
          >
            <div className="text-2xl">{item.icon}</div>
            <span
              className={`ml-4 text-xl ${isCollapsed ? "hidden" : "block"}`}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </ul>

      {/* User and logout section */}
      <div className="absolute bottom-2 left-2 right-2 overflow-hidden mt-10">
        <div
          className={`flex items-center justify-center w-full ${
            isCollapsed
              ? "w-11 h-11 rounded-full bg-slate-400"
              : "bg-slate-400 py-2 px-4 rounded-lg"
          }`}
        >
          <div
            className={`cursor-pointer flex items-center justify-center text-black ${
              isCollapsed ? "w-10 h-10 rounded-full" : ""
            }`}
          >
            {isCollapsed ? (
              <AiOutlineUser size={20} />
            ) : (
              <span className="text-xl">
                {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={`bg-red-600 text-white text-xl flex items-center justify-center mt-2 ${
            isCollapsed
              ? "w-12 h-12 rounded-full"
              : "py-2 px-4 w-full rounded-lg"
          }`}
        >
          {isCollapsed ? (
            <MdLogout />
          ) : (
            <span className="flex gap-1 items-center text-xl">
              <MdLogout /> Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
