import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { updatePassword } from "../services/operations/auth"; // Import the function
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";

function ForgetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { email, newPassword, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await updatePassword(email, newPassword); // Call the updated function

      navigate("/login"); // Redirect to login after successful password change
    } catch (error) {
      alert(error.message); // If error occurs, show alert message
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={handleOnChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your new password"
                required
              />
              <div
                className="absolute right-3 top-10 cursor-pointer text-gray-600"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Confirm your new password"
                required
              />
              <div
                className="absolute right-3 top-10 cursor-pointer text-gray-600"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Update Password
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm">Remembered your password? </span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
