import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHome, FaRegNewspaper, FaUsers, FaUsersCog } from "react-icons/fa";
import { FcBullish } from "react-icons/fc";
import { MdLogout, MdOutlineFeedback } from "react-icons/md";
import { logout } from "../../../services/operations/auth";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      setCurrentDate(date.toLocaleDateString());

      setCurrentTime(
        date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }) // For 12-hour format
        // date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) // For 24-hour format
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    // { to: "/", icon: <FaHome />, label: "Home" },
    ...(user?.role === "SuperAdmin"
      ? [
          // { to: "/admin/dashboard", icon: <FcBullish />, label: "Dashboard" },
          {
            icon: <FaRegNewspaper />,
            label: "Company",
            sublinks: [
              { to: "/admin/addCompany", label: "Create Establishment" },
              { to: "/companies-login", label: "Company Login" },
              { to: "#", label: "Licience" },
              { to: "#", label: "Backup Data" },
              { to: "#", label: "Google Meet" },
              { to: "#", label: "Close Establishment" },
            ],
          },
          // {
          //   to: "/admin/getGallery",
          //   icon: <MdOutlineFeedback />,
          //   label: "Get Gallery",
          // },

          {
            icon: <FaRegNewspaper />,
            label: "CRM",
            sublinks: [
              { to: "/admin/create-leads", label: "Leads" },
              { to: "#", label: "Deals" },
              { to: "#", label: "Clients" },
              { to: "#", label: "Contacts" },
              { to: "#", label: "Piplines" },
              { to: "#", label: "Custom Fields" },
            ],
          },
          {
            icon: <FaRegNewspaper />,
            label: "ERP",
            sublinks: [
              { to: "#", label: "Master" },
              { to: "#", label: "Data Export" },
              { to: "#", label: "Transactions" },
              { to: "#", label: "Display" },
              { to: "#", label: "Outtanding" },
            ],
          },

          {
            icon: <FaRegNewspaper />,
            label: "HRM",
            sublinks: [],
          },
          {
            icon: <FaRegNewspaper />,
            label: "Payroll",
            sublinks: [],
          },
          {
            icon: <FaRegNewspaper />,
            label: "Report",
            sublinks: [],
          },
          {
            icon: <FaRegNewspaper />,
            label: "Setting",
            sublinks: [],
          },
          {
            icon: <FaRegNewspaper />,
            label: "Help",
            sublinks: [],
          },
          {
            icon: <FaRegNewspaper />,
            label: "Change F.Y.",
            sublinks: [],
          },
        ]
      : []),
  ];

  const handleLogout = async () => {
    dispatch(logout(navigate));
  };
  return (
    <div className="fixed top-0 left-0 w-full z-50  flex h-[140px]">
      <nav className="flex items-center justify-between py-3 w-[85%] ">
        <div className="flex-1">
          <div className="min-w-full flex text-2xl mt-5 justify-center py-3 items-center bg-[#b1d7e0] shadow-inner shadow-gray-500">
            <p
              className="p-2 font-bold text-2xl"
              style={{
                textShadow: "2px 2px 4px yellow",
              }}
            >
              {company ? company?.companyName : "S.D. Taxation Associate"}
            </p>
          </div>

          <div className="h-[40px] my-[6px]">
            <div className="p  flex justify-between items-center h-full font-bold text-[17px]">
              <div className="bg-[#fcd5b5] shadow-lg shadow-gray-500 px-3 py-1">
                Client Grievance Alert{" "}
                <span className="text-red-600">{">>>"}</span>
              </div>
              <div className="bg-[#fcd5b5] px-3 py-1 shadow-lg shadow-gray-500 border min-w-[62%] m text-center ">
                Alerts--!
              </div>
              <div className="flex gap-4">
                <span className="border p-1 shadow-lg  shadow-gray-500 bg-[#fcd5b5] px-3 ">
                  {currentDate}
                </span>
                <span className="border p-1 shadow-lg  shadow-gray-500 bg-[#fcd5b5] px-3 ">
                  {currentTime}
                </span>
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-9  space-x-2 relative mt- justify-between">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="bg-white p-[2px] shadow-lg shadow-gray-600">
                  <NavLink
                    to={"#"}
                    className={({ isActive }) =>
                      `flex  justify-center font-semibold items-center gap-2 px-3 py-2 text-lg bg-[#b1d7e0] shadow-inner shadow-gray-500 border ${
                        isActive
                          ? "border-b-2 border-white"
                          : "hover:border-b-2 hover:border-gray-400"
                      }`
                    }
                  >
                    {/* <span>{item.icon}</span> */}
                    <span className="font-bold">{item.label}</span>
                  </NavLink>
                </div>
                {item.sublinks.length > 0 && hoveredItem === index && (
                  <ul className="absolute top-full left-0 bg-white b shadow-md border rounded w-48 z-50">
                    {item.sublinks.map((sublink, subIndex) => (
                      <li
                        key={subIndex}
                        className=" bg-gray-200 hover:bg-gray-100  mx-1 "
                      >
                        <NavLink
                          to={sublink.to}
                          className="block px-4 font-bold py-2 my-2 shadow-inner shadow-black text-sm text-black "
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
        <div className="fixed bottom-[4px]    w-[85%]">
          <button className="bg-[#b1d7e0]   shadow-inner  shadow-gray-500 text-black font-semibold px-4 py-4   w-full ">
            Wish
          </button>
        </div>
      </nav>
      <div className="w-[15%] min-h-screen  pt-1 px-2 text-center">
        <div className=" flex flex-col gap-3 font-semibold">
          <p className=" bg-red-900 text-white border border-white p-2 ">
            {company ? company.companyName : "S.D. Taxation Ass."}
          </p>
          <button
            onClick={handleLogout}
            className=" bg-red-900 text-white border border-white p-2  flex items-center justify-center gap-2"
          >
            <MdLogout /> Logout
          </button>
        </div>

        <div className="bg-[#fcd5b5] min-w-full min-h-full mt-3 border rounded shadow-2xl">
          <p className=" text-red-700 my-2 font-bold underline"> Wishes</p>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
