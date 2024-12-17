import React, { useEffect, useState } from "react";
import { createComapanyApi } from "../../../services/operations/company";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CreateCompany = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    code: "",
    flatOrBlock: "",
    building: "",
    roadStreet: "",
    area: "",
    city: "",
    pin: "",
    state: "",
    country: "",
    email: "",
    mNumber: "",
    tNumber: "",
    manageFor: "",
    from: "",
    to: "",
    gst: "Not Provide",
    typeOfDealer: "",
    userName: "",
    password: "",
    permissions: {
      crm: false,
      accounting: false,
      hrm: false,
      payroll: false,
    },
    role: "Company",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        permissions: {
          ...prevData.permissions,
          [name]: checked,
        },
      }));
    } else {
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
      const uniqueNumber = Math.floor(1000 + Math.random() * 9000);
      const formattedUsername = `${companyName
        .replace(/\s+/g, "")
        .toLowerCase()}${uniqueNumber}`;
      setFormData((prevData) => ({
        ...prevData,
        userName: formattedUsername,
      }));
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
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
        code: "",
        flatOrBlock: "",
        building: "",
        roadStreet: "",
        area: "",
        city: "",
        pin: "",
        state: "",
        country: "",
        email: "",
        mNumber: "",
        tNumber: "",
        manageFor: "",
        from: "",
        to: "",
        gst: "",
        typeOfDealer: "",
        userName: "",
        password: "",
        permissions: {
          crm: false,
          accounting: false,
          hrm: false,
          payroll: false,
        },
        role: "Company",
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className=" w-[50vw] mx-auto  rounded-[100px] p-5 border-2 border-blue-500 shadow-lg shadow-blue-500">
      <div className="">
        <h2 className="text-center bg-[#fcd5b5] font-bold rounded-md px-4 py-2 w-fit mx-auto">
          Create New Company
        </h2>
        <div className="">
          <div className="companyName flex flex-col lg:flex-row mt-10  items-center space-x-4">
            <label
              htmlFor="name"
              className="border-2 my-2 border-black px-4 py-[7px] rounded-md text-center w-fit lg:w-[15vw]"
            >
              <span>Company Name</span>
            </label>
            <input
              className="p-2 border-black border-2 rounded w-full"
              type="text"
              id="name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="companyName flex flex-col lg:flex-row space-x-4">
            <label
              htmlFor="name"
              className="border-2 my-2 border-black px-4 h-fit py-2 rounded-md text-center w-fit lg:w-[15vw]"
            >
              <span>Address</span>
            </label>
            <div className="address grid lg:grid-cols-2 border-2 border-black rounded-3xl p-3 w-full">
              <div className="flex items-center">
                <span className="text-sm mt-5">Flat/Block</span>
                <input
                  className="p-2 border-b-2 border-black focus:border-black focus:outline-none w-full"
                  type="text"
                  name="flatOrBlock"
                  value={formData.flatOrBlock}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm mt-5">Building</span>
                <input
                  className="p-2 border-b-2 border-black focus:border-black focus:outline-none w-full"
                  type="text"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm mt-5">Road/Street</span>
                <input
                  className="p-2 border-b-2 border-black focus:border-black focus:outline-none w-full"
                  type="text"
                  name="roadStreet"
                  value={formData.roadStreet}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm mt-5">Area</span>
                <input
                  className="p-2 border-b-2 border-black focus:border-black focus:outline-none w-full"
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center">
                <span className="text-sm mt-5">City</span>
                <input
                  className="p-2 border-b-2 border-black focus:border-black focus:outline-none w-full"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm mt-5">Pin</span>
                <input
                  className="p-2 border-b-2 border-black focus:border-black focus:outline-none w-full"
                  type="text"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm mt-5">State</span>
                <input
                  className="p-2 border-b-2 border-black focus:border-black focus:outline-none w-full"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm mt-5">Country</span>
                <input
                  className="p-2 border-b-2 border-black focus:border-black focus:outline-none w-full"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="companycode flex flex-col lg:flex-row mt-10  items-center space-x-4">
            <label
              htmlFor="name"
              className="border-2 my-2 border-black px-4 py-[7px] rounded-md text-center w-fit lg:w-[15vw]"
            >
              <span> Company Code</span>
            </label>
            <input
              className="p-2 border-black border-2 rounded w-full"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="email flex flex-col lg:flex-row items-center space-x-4">
            <label
              htmlFor="name"
              className="border-2 my-2 border-black px-4 py-[7px] rounded-md text-center w-fit lg:w-[15vw]"
            >
              <span> EmailId </span>
            </label>
            <input
              className="p-2 border-black border-2 rounded w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-2">
            <div className="mobile flex flex-col lg:flex-row items-center space-x-4">
              <label
                htmlFor="name"
                className="border-2 my-2 border-black px-4 py-[7px] rounded-md text-center w-fit lg:w-[22vw]"
              >
                <span> Mobile Number </span>
              </label>
              <input
                className="p-2 border-black border-2 rounded w-full"
                type="text"
                name="mNumber"
                value={formData.mNumber}
                onChange={handleChange}
              />
            </div>

            <div className="telephone flex flex-col lg:flex-row items-center space-x-4">
              <label
                htmlFor="name"
                className=" my-2 border-2 border-black px-4 py-[7px] rounded-md text-center min-w-fit "
              >
                <span> Telephone Number </span>
              </label>
              <input
                className="p-2 border-black border-2 rounded w-full"
                type="text"
                name="tNumber"
                value={formData.tNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-center">
            <h3 className="border-2 border-black px-4 py-[7px] rounded-md text-center w-fit lg:w-[15vw]">
              Manage For
            </h3>
            <div className="border-2 border-black px-2 py-[7px] rounded-md w-full">
              {[
                "Only Accounts",
                "Inventory With Accounts",
                "School Account",
              ].map((option) => (
                <label key={option} className="ml-5  ">
                  <input
                    type="radio"
                    name="manageFor"
                    value={option}
                    checked={formData.manageFor === option}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-2">
            <div className="mobile flex flex-col lg:flex-row items-center space-x-4">
              <label
                htmlFor="name"
                className="border-2 my-2 border-black px-4 py-[7px] rounded-md text-center w-fit lg:w-[22vw]"
              >
                <span> Finacial Year </span>
              </label>
              <input
                className="p-2 border-black border-2 rounded w-full"
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
              />
            </div>

            <div className="telephone flex flex-col lg:flex-row items-center space-x-4">
              <label
                htmlFor="name"
                className=" my-2 border-2 border-black px-4 py-[7px] rounded-md text-center min-w-fit "
              >
                <span>Books Beginning From </span>
              </label>
              <input
                className="p-2 border-black border-2 rounded w-full"
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="companycode flex flex-col lg:flex-row   items-center space-x-4">
            <label
              htmlFor="name"
              className="border-2 my-2 border-black px-4 py-[7px] rounded-md text-center w-fit lg:w-[15vw]"
            >
              <span> Gst Details</span>
            </label>
            <input
              className="p-2 border-black border-2 rounded w-full"
              type="text"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              placeholder="Enter your GST number"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-5 items-center">
            <h3 className="border-2 border-black px-4 py-[7px] rounded-md text-center w-fit lg:w-[15vw]">
              Type of Dealer
            </h3>
            <div className="border-2 border-black px-4 py-[7px] rounded-md w-full">
              {["Regular", "Composition"].map((option) => (
                <label key={option} className="ml-5  ">
                  <input
                    type="radio"
                    name="typeOfDealer"
                    value={option}
                    checked={formData.typeOfDealer === option}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <h2 className="text-center mt-3 bg-[#fcd5b5] font-bold rounded-md px-4 py-2 w-fit mx-auto">
            Permission Software
          </h2>

          <div className="border-2 border-black bg-[#b0d48c] py-2 text-center mt-3">
            {["crm", "accounting", "hrm", "payroll"].map((perm) => (
              <label key={perm} className="mr-4">
                <input
                  type="checkbox"
                  name={perm}
                  checked={formData.permissions[perm]}
                  onChange={handleChange}
                />
                {perm.charAt(0).toUpperCase() + perm.slice(1)}
              </label>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-3 mt-3">
            <input
              className="p-2 border-2 bg-[#ffe49c] border-black rounded w-full"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="user name"
              required
            />

            <div className="relative">
              <input
                className="p-2 border-2 z-0 bg-[#ffe49c] border-black rounded w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="password"
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
          </div>
        </div>

        <button
          className="bg-blue-500 w-fit text-center mx-auto flex justify-center px-10 text-white p-2 rounded mt-6 "
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CreateCompany;
