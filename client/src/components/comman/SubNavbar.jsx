import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const SubNavbar = () => {
  return (
    <div className="bg-gray-300 text-gray-700 py-3">
      <div className=" w-11/12 mx-auto px-4 flex justify-between items-center flex-wrap">
        {/* Contact Info Section */}
        <div className="flex flex-col sm:flex-row sm:space-x-8 text-sm space-y-2 sm:space-y-0">
          <span className="flex items-center space-x-2">
            <span className="font-semibold">Email:</span>
            <Link
              to="mailto:sdtaxation@gmail.com"
              className="text-blue-600 hover:underline"
            >
              sdtaxation@gmail.com
            </Link>
          </span>
          <span className="flex items-center space-x-2">
            <span className="font-semibold">Contact:</span>
            <Link
              to="tel:+919039150897"
              className="text-green-600 hover:underline"
            >
              +91 90391 50897
            </Link>
          </span>
          <span className="flex items-center space-x-2">
            <span className="font-semibold">Address:</span>
            <span>S.D Taxation Associate, Main St.</span>
          </span>
        </div>

        <div className="flex items-center justify-center lg:justify-end mx-auto mt-5 lg:mt-0 lg:mx-0 space-x-6 text-xl">
          <Link
            to="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            <FaFacebookF />
          </Link>
          <Link
            to="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition duration-200"
          >
            <FaInstagram />
          </Link>
          <Link
            to="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition duration-200"
          >
            <FaLinkedin />
          </Link>
          <Link
            to="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-400 transition duration-200"
          >
            <FaTwitter />
          </Link>
          <Link
            to="https://wa.me/919039150897"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-400 transition duration-200"
          >
            <FaWhatsapp />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
