import React, { useEffect, useState } from "react";
import { createComapanyApi } from "../../../services/operations/company";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CreateCompany = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [gstAV, setGstAV] = useState(true);
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    pin: "",
    pan: "",
    country: "",
    state: "",
    email: "",
    contactNumber: "",
    from: "",
    to: "",
    gst: "Not Provide",
    hasGST: false, // New property
    permissions: {
      crm: false,
      accounting: false,
      hrm: false,
      payroll: false,
    },
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      // Update permissions for the checkbox toggle
      setFormData((prevData) => ({
        ...prevData,
        permissions: {
          ...prevData.permissions,
          [name]: checked,
        },
      }));
    } else {
      // Handle other input changes
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        if (name === "companyName" || name === "from") {
          updatedData.userName = `${updatedData.companyName}_${updatedData.from}`;
        }
        return updatedData;
      });
    }
  };

  useEffect(() => {
    const { companyName } = formData;

    if (companyName) {
      // Generate a username based on the company name
      const uniqueNumber = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit random number
      const formattedUsername = `${companyName
        .replace(/\s+/g, "")
        .toLowerCase()}${uniqueNumber}`;
      setFormData((prevData) => ({
        ...prevData,
        userName: formattedUsername,
      }));
    }

    // Calculate the current financial year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-11
    const year = currentDate.getFullYear();

    if (currentMonth <= 3) {
      setFormData((prevData) => ({
        ...prevData,
        from: `${year - 1}-04-01`,
        to: `${year}-03-31`,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        from: `${year}-04-01`,
        to: `${year + 1}-03-31`,
      }));
    }
  }, [formData.companyName]);

  const handleSubmit = async () => {
    const result = await createComapanyApi(formData);
    if (result) {
      setFormData({
        companyName: "",
        companyAddress: "",
        pin: "",
        pan: "",
        country: "",
        state: "",
        email: "",
        contactNumber: "",
        from: "",
        to: "",
        gst: "",
        hasGST: false,

        permissions: {
          crm: false,
          accounting: false,
          hrm: false,
          payroll: false,
        },
        userName: "",
        password: "",
      });
      setStep(1);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const nextPage = () => setStep(step + 1);
  const prevPage = () => setStep(step - 1);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <div className="bg-white shadow-md rounded-lg p-6">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Company Registration
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <label>
                Company Name
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Company Address
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Pincode
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Pancard
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Country
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                State
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email
                <input
                  className="p-2 border rounded w-full"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Contact Number
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                From
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                />
              </label>
              <label>
                To
                <input
                  className="p-2 border rounded w-full"
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                />
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formData.hasGST}
                  name="hasGST"
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      hasGST: e.target.checked,
                      gst: e.target.checked ? prevData.gst : "", // Clear GST field if unchecked
                    }))
                  }
                />
                Do you have a GST number?
              </label>

              {formData.hasGST && (
                <label>
                  GST Number
                  <input
                    className="p-2 border rounded w-full"
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={handleChange}
                    placeholder="Enter your GST number"
                  />
                </label>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={nextPage}
              >
                Next Page
              </button>
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={handleSubmit}
              >
                Save and Quit
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              User Information
            </h2>
            <label>
              Username
              <input
                className="p-2 border rounded w-full mb-4"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password
              <div className="relative">
                <input
                  className="p-2 border rounded w-full "
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </div>
              </div>
            </label>

            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={prevPage}
              >
                Previous Page
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={nextPage}
              >
                Next Page
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Features</h2>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Admin Permissions</h3>
              {["crm", "accounting", "hrm", "payroll"].map((perm) => (
                <label key={perm} className="mr-4">
                  <input
                    type="checkbox"
                    name={`${perm}`}
                    checked={formData.permissions[perm]}
                    onChange={handleChange}
                  />
                  {perm.charAt(0).toUpperCase() + perm.slice(1)}
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={prevPage}
              >
                Previous Page
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCompany;
