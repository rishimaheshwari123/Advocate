import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaRegNewspaper, FaUsers, FaUsersCog } from "react-icons/fa";
import { FcBullish } from "react-icons/fc";
import { MdOutlineFeedback } from "react-icons/md";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      setCurrentDate(date.toLocaleDateString());
      setCurrentTime(date.toLocaleTimeString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    ...(user?.role === "SuperAdmin"
      ? [
          { to: "/admin/dashboard", icon: <FcBullish />, label: "Dashboard" },
          {
            icon: <FaRegNewspaper />,
            label: "Company",
            sublinks: [
              { to: "/admin/addCompany", label: "Company Establishment" },
              { to: "/admin/companyLogin", label: "Company Login" },
            ],
          },
          {
            to: "/admin/getGallery",
            icon: <MdOutlineFeedback />,
            label: "Get Gallery",
          },
        ]
      : []),
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-blue-400 flex h-[140px]">
      <nav className="flex items-center justify-between py-3 w-[85%]">
        <div className="flex-1">
          <div className="min-w-full flex text-2xl justify-center items-center">
            <p className="bg-[#6ba332] p-2 font-bold">
              {company ? company?.companyName : "S.D. Taxation Associate"}
            </p>
          </div>
          <div className="h-[40px] bg-yellow-600 p-2">
            <div className="px-5 flex justify-between items-center h-full font-bold text-[17px]">
              <div>Client Grievance Alert</div>
              <div className="border-2 bg-yellow-300 min-w-[60%] ml-3 min-h-[90%]"></div>
              <div className="flex gap-4">
                <span>{currentDate}</span>
                <span>{currentTime}</span>
              </div>
            </div>
          </div>

          <ul className="flex space-x-6 relative">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
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
                {item.sublinks && hoveredItem === index && (
                  <ul className="absolute top-full left-0 bg-white shadow-md border rounded w-48 z-50">
                    {item.sublinks.map((sublink, subIndex) => (
                      <li key={subIndex} className="hover:bg-gray-100">
                        <NavLink
                          to={sublink.to}
                          className="block px-4 py-2 text-sm text-black"
                        >
                          {sublink.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="w-[15%] min-h-screen bg-yellow-700"></div>

    </div>
  );
};

export default Navbar;
