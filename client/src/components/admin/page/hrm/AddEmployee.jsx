import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { createEmployeeApi } from "../../../../services/operations/company"; // Import API function
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddEmployee = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { company } = useSelector((state) => state.company);
  const companyId = company._id || "";

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      position: "",
      password: "",
      department: "",
      address: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contactNumber: Yup.string()
        .matches(/^\d{10}$/, "Contact Number must be 10 digits")
        .required("Contact Number is required"),
      position: Yup.string().required("Position is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      department: Yup.string().required("Department is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = { ...values, companyId };
        const response = await createEmployeeApi(data);
        if (response) {
          resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
      <form onSubmit={formik.handleSubmit}>
        {/** First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.firstName && formik.errors.firstName
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.firstName}
            </p>
          )}
        </div>

        {/** Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.lastName && formik.errors.lastName
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.lastName}
            </p>
          )}
        </div>

        {/** Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/** Contact Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.contactNumber && formik.errors.contactNumber
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.contactNumber && formik.errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.contactNumber}
            </p>
          )}
        </div>

        {/** Position */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Position</label>
          <input
            type="text"
            name="position"
            value={formik.values.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.position && formik.errors.position
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.position && formik.errors.position && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.position}
            </p>
          )}
        </div>

        {/** Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            type={passwordVisible ? "text" : "password"} // Toggle password visibility
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {/* Button to toggle password visibility */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-8 text-gray-500"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}{" "}
            {/* Show appropriate icon */}
          </button>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/** Department */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.department && formik.errors.department
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.department && formik.errors.department && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.department}
            </p>
          )}
        </div>

        {/** Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              formik.touched.address && formik.errors.address
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/** Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
