import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../services/operations/auth";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Our Services",
    sublinks: [
      { name: "EPS Registration", href: "/eps-registration" },
      { name: "ESIC Registration", href: "/esic-registration" },
      { name: "GST Registration", href: "/gst-registration" },
      {
        name: "EPF & ESIC Monthly Compliance",
        href: "/epf-esic-monthly-compliance",
      },
      { name: "EPF Withdrawal", href: "/epf-withdrawal" },
      { name: "GST Return", href: "/gst-return" },
    ],
  },
  {
    name: "Downloads",
    sublinks: [
      { name: "HR" },
      { name: "Payroll" },
      { name: "Attendance" },
      { name: "Complete Software" },
    ],
  },
  { name: "Gallery", href: "/gallery" },
  { name: "Inquiry", href: "/inquiry" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const goToProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white relative">
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#yourTextColor]">
              S.D Taxation Associate
            </Link>

            {/* Desktop Links */}
            <ul className="hidden lg:flex space-x-6 items-center">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className="flex items-center font-bold hover:text-[#highlightColor]"
                  >
                    {link.name}
                    {link.sublinks && (
                      <FaChevronDown className="ml-1 mt-[3px]" />
                    )}
                  </Link>
                  {link.sublinks && activeDropdown === index && (
                    <ul className="absolute left-0 top-full  w-60 bg-gray-700 text-white z-50 shadow-lg rounded">
                      {link.sublinks.map((sublink, subIndex) => (
                        <li
                          key={subIndex}
                          className="py-2 px-4 font-bold hover:bg-gray-600"
                        >
                          <Link to={sublink.href}>{sublink.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {token && user ? (
                <>
                  {user.role === "SuperAdmin" && (
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="px-4 py-2 font-bold bg-yellow-500 text-white rounded"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 font-bold bg-red-500 text-white rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-2 font-bold bg-green-500 text-white rounded"
                  >
                    Client Login
                  </Link>
                </li>
              )}
            </ul>

            {/* Mobile Sidebar Button */}
            <div className="lg:hidden">
              <button onClick={toggleSidebar}>
                {!isOpen ? <FaBars size={24} /> : <FaTimes size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`lg:hidden fixed top-0 left-0 z-50 w-64 h-full bg-gray-800 p-4 border-r transition-transform transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-white">S.D Taxation Associate</p>
              <button onClick={toggleSidebar}>
                <FaTimes size={24} className="text-white" />
              </button>
            </div>

            <ul className="space-y-4 text-white">
              {navLinks.map((link, index) => (
                <li key={index} className="relative">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleDropdown(index)}
                  >
                    <Link
                      to={link.href}
                      className="block font-bold"
                      onClick={toggleSidebar}
                    >
                      {link.name}
                    </Link>
                    {link.sublinks && <FaChevronDown />}
                  </div>
                  {link.sublinks && activeDropdown === index && (
                    <ul className="mt-2 bg-[#dropdownBgColor] space-y-2 rounded">
                      {link.sublinks.map((sublink, subIndex) => (
                        <li key={subIndex} className="py-1 px-4">
                          <Link
                            to={sublink.href}
                            className="text-[#dropdownTextColor]"
                            onClick={toggleSidebar}
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {token && user ? (
                <>
                  {user.role === "SuperAdmin" && (
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="px-4 py-2 font-bold bg-yellow-500 text-white rounded"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 font-bold bg-red-500 text-white rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-2 font-bold bg-green-500 text-white rounded"
                  >
                    Client Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
