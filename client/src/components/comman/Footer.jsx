import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom"; // Import Link and useLocation

const Footer = () => {
  const location = useLocation(); // Get the current URL path chats

  // Check if the current path includes "/admin"
  if (
    location.pathname.includes("/admin") ||
    location.pathname.includes("/profile") ||
    location.pathname.includes("/subscription") ||
    location.pathname.includes("/chats")
  ) {
    return null; // Do not render the footer if the URL contains "/admin" or "/profile/subscription"
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm sm:text-base">
            S.D Taxation Associate is a trusted investment advisory firm
            dedicated to helping clients diversify their portfolios and maximize
            returns. With deep industry expertise and a sharp focus on market
            trends, S.D Taxation Associate provides valuable insights that
            empower clients to make informed decisions and achieve financial
            growth.
          </p>
          <div className="mt-4 flex items-center">
            <FaPhone className="mr-2" />
            <span>+91 90391 50897 || +91 99935 56791</span>
          </div>
          <p className="text-sm mt-1 sm:text-base">sdtaxation@gmail.com</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Our Services
          </h3>
          <ul className="text-sm sm:text-base space-y-2">
            <li>
              <Link to="/eps-registration" className="hover:text-yellow-400">
                EPS Registration
              </Link>
            </li>
            <li>
              <Link to="/esic-registration" className="hover:text-yellow-400">
                ESIC Registration
              </Link>
            </li>
            <li>
              <Link to="/gst-registration" className="hover:text-yellow-400">
                GST Registration
              </Link>
            </li>
            <li>
              <Link
                to="/epf-esic-monthly-compliance"
                className="hover:text-yellow-400"
              >
                EPF & ESIC Monthly Compliance
              </Link>
            </li>
            <li>
              <Link to="/epf-withdrawal" className="hover:text-yellow-400">
                EPF Withdrawal
              </Link>
            </li>
            <li>
              <Link to="/gst-return" className="hover:text-yellow-400">
                GST Return
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Zone */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Client Zone</h3>
          <ul className="text-sm sm:text-base space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-400">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-yellow-400">
                About
              </Link>
            </li>
            {/* <li>
              <Link to="/support-grievance" className="hover:text-yellow-400">
                Support & Grievance
              </Link>
            </li> */}
            <li>
              <Link to="/inquiry" className="hover:text-yellow-400">
                Inquiry
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-yellow-400">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-3 justify-center gap-4">
              <Link
                to="/"
                className="text-2xl text-blue-600 bg-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-300 transition-colors"
              >
                <FaFacebook />
              </Link>
              <Link
                to="/"
                className="text-2xl text-pink-600 bg-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-300 transition-colors"
              >
                <FaInstagram />
              </Link>
              <Link
                to="/" // WhatsApp link
                className="text-2xl text-green-500 bg-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-300 transition-colors"
              >
                <FaWhatsapp />
              </Link>
              <Link
                to="#"
                className="text-2xl text-blue-400 bg-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-300 transition-colors"
              >
                <FaTwitter />
              </Link>
              <Link
                to="#"
                className="text-2xl text-blue-700 bg-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-300 transition-colors"
              >
                <FaLinkedin />
              </Link>

              <Link
                to="tel:919039150897" // Call link
                className="text-2xl text-green-600 bg-white rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-300 transition-colors"
              >
                <FaPhone />
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-center bg-green-500 rounded-full p-2 space-x-2 text-white hover:bg-green-600 transition w-fit px-5 mt-5 duration-300">
              <FaWhatsapp size={34} />
              <a
                href="https://wa.me/+919039150897"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sm"
              >
                WhatsApp
                <span className="block text-sm font-normal">Click to Chat</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 p-4">
        <p className="text-center">Made By I-NEXT ETS Team❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
