import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const [currentDay, setCurrentDay] = useState(""); // New state for the current day
  const [hoveredItem, setHoveredItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [hoveredSubItem, setHoveredSubItem] = useState(null); // Track nested submenu hover

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();

      setCurrentDate(
        date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );

      setCurrentTime(
        date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );

      setCurrentDay(date.toLocaleDateString("en-US", { weekday: "long" })); // Extract current day
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const locationName = () => location.pathname;

  const navItems = [
    // { to: "/", icon: <FaHome />, label: "Home" },
    ...(user?.role === "SuperAdmin"
      ? [
          // { to: "/admin/dashboard", icon: <FcBullish />, label: "Dashboard" },
          {
            icon: <FaRegNewspaper />,
            label: "Establishment",
            sublinks: [
              {
                to: "/admin/establishment/addCompany",
                label: "Create Establishment",
              },
              { to: "/admin/establishment/getCompany", label: "Open Company" },
              // { to: "/companies-login", label: "Company Login" },
              { to: "#", label: "Licence" },
              { to: "#", label: "Backup Data" },
              { to: "#", label: "Google Meet" },
              { to: "#", label: "Zoom" },
              { to: "#", label: "Any Desk" },
            ],
          },

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
              {
                to: "#",
                label: "Master",
                link: [{ to: "/admin/erp/add-group", label: "Create Group" }],
              },
              { to: "#", label: "Transactions" },
              { to: "#", label: "Display" },
              { to: "#", label: "OutSanding" },
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
            label: "From",
            sublinks: [],
          },
          {
            icon: <FaRegNewspaper />,
            label: "E-Return",
            sublinks: [],
          },
          {
            icon: <FaRegNewspaper />,
            label: "Change F.Y.",
            sublinks: [],
          },
        ]
      : []),
    ...(company?.role === "Company" && company.permissions?.hrm
      ? [
          {
            icon: <FaRegNewspaper />,
            label: "Employee",
            sublinks: [
              { to: "/company/add-employee", label: "Add Employee" },
              { to: "/company/get-employee", label: "Get Employees" },
              { to: "/company/get-attendance", label: "Attendance" },
            ],
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
        ]
      : []),
  ];

  const handleLogout = async () => {
    dispatch(logout(navigate));
  };
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50   h-[140px]">
        <div className="flex ">
          <nav className="flex items-center justify-between  w-[102vw] ">
            <div className="flex-1">
              <div
                className={`min-w-full flex justify-center items-center text-2xl  py-6 ${
                  locationName() === "/admin/dashboard"
                    ? "bg-[#b1d7e0] shadow-inner"
                    : ""
                }   shadow-gray-500 relative`}
              >
                <div className="absolute left-2 flex flex-col gap-1 font-semibold text-5xl p-1">
                  <Link to={"/admin/dashboard"}>
                    <FaHome />
                  </Link>
                </div>
                {locationName() === "/admin/dashboard" && (
                  <p
                    className="p-2 font-bold  text-[28px] text-center absolute left-1/2 transform -translate-x-1/2"
                    style={{
                      textShadow: "2px 2px 4px yellow",
                    }}
                  >
                    {company ? company?.companyName : "S.D. Taxation Associate"}
                  </p>
                )}
              </div>

              <div className="h-[43.5px] w-full">
                <div className="flex items-center justify-between h-full font-bold text-[14px] w-full">
                  {/* Dashboard Link */}
                  <Link
                    to={"/admin/dashboard"}
                    className="bg-[#fcd5b5] rounded-sm s w-[10%] py-[10px] border border-black text-center"
                  >
                    Dashboard
                  </Link>

                  {/* Conditional Location Block for Company Name */}
                  {locationName() === "/admin/dashboard" && (
                    <div className="bg-[#e1eeda] border border-black rounded-sm s w-[70%] py-[10px] text-center -mr-[1.8px]">
                      {user ? (
                        <div>
                          <p className="font-semibold">
                            S.D. Taxation Associate ( F.Y.2024-25 )
                          </p>
                        </div>
                      ) : company ? (
                        <>
                          <p className="font-semibold">
                            {company?.companyName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {company?.from} - {company?.to}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-500">No data available</p>
                      )}
                    </div>
                  )}

                  {/* Date, Day, Time Sections */}
                  {locationName() === "/admin/dashboard" && (
                    <div className="flex items-center justify-center w-[20%]">
                      <span className="border border-black shadow-lg rounded-sm s bg-[#fcd5b5] w-[33%] py-[10px] text-center">
                        {currentDate}
                      </span>
                      <span className="border border-black shadow-lg rounded-sm s bg-[#fcd5b5] w-[33%] py-[10px] text-center">
                        {currentDay}
                      </span>
                      <span className="border border-black shadow-lg rounded-sm s bg-[#fcd5b5] w-[33%] py-[10px] text-center">
                        {currentTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="grid grid-cols-11  relative ">
                {navItems.map((item, index) => {
                  const currentPath = window.location.pathname.toLowerCase();

                  // Check if the current path is '/admin/dashboard' or if the label matches the path
                  const isPathMatch =
                    currentPath.includes(item.label.toLowerCase()) ||
                    currentPath === "/admin/dashboard";

                  if (!isPathMatch) return null;

                  return (
                    <li
                      key={index}
                      className="relative group"
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className=" ">
                        <NavLink
                          to={"#"}
                          className={({ isActive }) =>
                            `flex  justify-center bg-[#b1d7e0] ml-[1px]  rounded-[4px] font-semibold items-center gap-2 px-3 py-[6px] text-lg s ${
                              isActive
                                ? "border-2 border-black"
                                : "hover:border-b-2 hover:border-gray-400"
                            }`
                          }
                        >
                          {/* <span>{item.icon}</span> */}
                          <span className="font-bold text-[12px]  ">
                            {item.label}
                          </span>
                        </NavLink>
                      </div>
                      {item.sublinks.length > 0 && hoveredItem === index && (
                        <ul className="absolute top-full left-0 bg-white rounded-sm shadow-md border  w-48 z-50">
                          {item.sublinks.map((sublink, subIndex) => (
                            <li
                              key={subIndex}
                              onMouseEnter={() => setHoveredSubItem(subIndex)}
                              onMouseLeave={() => setHoveredSubItem(null)}
                              className="relative group bg-gray-200 hover:bg-gray-100  mx-1 "
                            >
                              <NavLink
                                to={sublink.to}
                                className="block px-4  py-2 my-[2px] shadow-inner   text-sm s rounded-md"
                              >
                                {sublink.label}
                              </NavLink>

                              {sublink.link && hoveredSubItem === subIndex && (
                                <ul className="absolute top-0 left-[103%] bg-white rounded-sm shadow-md border w-48 z-50">
                                  {sublink.link.map(
                                    (nestedLink, nestedIndex) => (
                                      <li
                                        key={nestedIndex}
                                        className="bg-gray-100 hover:bg-gray-50 mx-1"
                                      >
                                        <NavLink
                                          to={nestedLink.to}
                                          className="block px-4  py-2 my-1 shadow-inner   text-sm s rounded-md"
                                        >
                                          {nestedLink.label}
                                        </NavLink>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {locationName() === "/admin/dashboard" && (
            <div className="w-[9.8vw] max-h-screen">
              <div className="absolute h-screen overflow-hidden -right-1 grid grid-rows-[repeat(20,1fr)]  font-semibold px-1">
                <p className="bg-[#853e10] rounded-md text-xl text-white border border-white py-2 px-5 text-center">
                  My Profile
                </p>
                <button
                  onClick={handleLogout}
                  className="bg-[#853e10] rounded-md text-xl text-white border border-white py-2 flex items-center justify-center gap-2 border border-black"
                >
                  <MdLogout /> Logout
                </button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black border border-black "></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
                <button className="bg-[#c6de97] s py-[22.3px] rounded-lg flex items-center justify-center gap-2 border border-black"></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {locationName() === "/admin/dashboard" && (
        <div className="hidden z-50 lg:block bg-[#b1d7e0]  overflow-hidden shadow-lg fixed bottom-[1px] w-[91.2vw]">
          <div className="flex justify-between items-center px-1 border-black border-2">
            {/* Wishes Section */}
            <div className="flex items-center">
              <button className="bg-[#85b6d3] text-black font-bold text-[12px] py-3 px-4 border-[1px] border-black rounded-md">
                Wishes
              </button>
              <div className="text-red-600 text-4xl font-bold ml-1 mb-2">
                »»
              </div>
            </div>

            {/* Client Grievance Alerts Section */}
            <div className="flex items-center">
              <button className="bg-[#85b6d3] text-black font-bold text-[12px]  py-3 px-4 border-[1px] border-black rounded-md">
                Client Grievance Alerts
              </button>
              <div className="text-red-600 text-4xl font-bold mb-2 ml-1">
                »»
              </div>
            </div>

            {/* Notification Alerts Section */}
            <div className="flex items-center">
              <button className="bg-[#85b6d3] text-black text-[12px] font-bold py-[12px] px-4 border-[1px] border-black rounded-md">
                Notification Alerts
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
