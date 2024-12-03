import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaRegNewspaper, FaUsers, FaUsersCog } from "react-icons/fa";
import { FcBullish } from "react-icons/fc";
import { MdOutlineFeedback } from "react-icons/md";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    ...(user?.role === "SuperAdmin"
      ? [
          { to: "/admin/dashboard", icon: <FcBullish />, label: "Dashboard" },
          { to: "/admin/addGallery", icon: <FaRegNewspaper />, label: "Add Gallery" },
          { to: "/admin/getGallery", icon: <MdOutlineFeedback />, label: "Get Gallery" },
          { to: "/admin/addCompany", icon: <FaRegNewspaper />, label: "Add Company" },
          { to: "/admin/addCompany", icon: <FaRegNewspaper />, label: "Add Company" },
          { to: "/admin/addCompany", icon: <FaRegNewspaper />, label: "Add Company" },
          { to: "/admin/addCompany", icon: <FaRegNewspaper />, label: "Add Company" },
          { to: "/admin/addCompany", icon: <FaRegNewspaper />, label: "Add Company" },
          { to: "/admin/addCompany", icon: <FaRegNewspaper />, label: "Add Company" },
          { to: "/admin/addCompany", icon: <FaRegNewspaper />, label: "Add Company" },
          { to: "/admin/addCompany", icon: <FaRegNewspaper />, label: "Add Company" },
          { to: "/admin/getCompany", icon: <MdOutlineFeedback />, label: "Get Company" },

        ]
        
      : []),
    ...(company?.role === "Company" && company.permissions?.hrm
      ? [
          { to: "/company/add-employee", icon: <FaUsers />, label: "Add Employee" },
          { to: "/company/get-employee", icon: <FaUsersCog />, label: "Get Employees" },
          { to: "/company/get-attendance", icon: <FaUsersCog />, label: "Attendance" },
        ]
      : []),
  ];

  return (
    <div className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 h-[80px]">
      <nav className="flex items-center justify-between px-4 py-3">
        <div className="text-2xl font-bold">S.D Taxation Associate</div>

        <div className="flex-1 overflow-x-auto scrollbar-thin custom-scrollbar ml-4 h-[60px]"> {/* Added margin-left */}
          <ul className="flex space-x-6 w-max">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 text-lg ${
                      isActive
                        ? "border-b-2 border-white"
                        : "hover:border-b-2 hover:border-gray-400"
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
