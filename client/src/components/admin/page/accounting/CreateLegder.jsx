import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaEye } from "react-icons/fa"; // Import icons
import {
  createGroupApi,
  getAllGroupsApi,
} from "../../../../services/operations/group";
const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Andhra Pradesh (New)",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep Islands",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Pondicherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const CreateLegder = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchGroup = async () => {
    try {
      const response = await getAllGroupsApi("67454b90d519e0f67f7b2985");
      console.log(response);
      if (response) {
        setGroups(response);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const updatedFormData = {
      ...formData,
    };

    const result = await createGroupApi(updatedFormData);
    if (result) {
      setFormData({
        name: "",
      });
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  return (
    <div className="flex items-start justify-center mt-10 ">
      {/* Sidebar with icons */}
      <div className="flex flex-col items-center mt-3 space-y-4 mr-4">
        <button className="flex items-center justify-center cursor-pointer  w-16 h-10 bg-[#c5e0b5] border border-black rounded-md ">
          <FaPlus className="text-red-600" />
        </button>
        <button className="flex items-center justify-center w-16 h-10 bg-[#c5e0b5] border border-black rounded-md ">
          <FaEdit className="text-red-600" />
        </button>
        <button className="flex items-center justify-center w-16 h-10 bg-[#c5e0b5] border border-black rounded-md ">
          <FaEye className="text-black" />
        </button>
      </div>

      {/* Main form */}
      <div className="w-fit font-semibold rounded-3xl  s border-[#c5e0b5] border-2 px-1 py-5 shadow-lg shadow-[#c5e0b5]">
        <div>
          <h2 className="bg-[#fbe5d6] text-center  py-2 border-[2px] rounded-lg border-white">
            Create New Ledger
          </h2>

          <div className="mt-2">
            <div className="flex flex-col lg:flex-row items-center space-x-1">
              <label
                htmlFor="name"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span> Name</span>
              </label>
              <input
                className="p-2 border-black border-2 rounded-lg w-full"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <label
                htmlFor="underGroup"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span>Under</span>
              </label>
              <select
                className="p-2 ml-1 border-black border-2 rounded-lg w-full"
                name="underGroup"
                value={formData.underGroup}
                onChange={handleChange}
                required={formData.isPrimary === "No"}
              >
                <option value="">Select Parent Group</option>
                {isLoading ? (
                  <option disabled>Loading groups...</option>
                ) : groups.length > 0 ? (
                  groups.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No groups available</option>
                )}
              </select>
            </div>
            <div className="bg-[#fbe5d6] text-center  py-2 border-[2px] rounded-lg border-white ">
              Details
            </div>

            <div className="flex flex-col lg:flex-row items-center space-x-1">
              <label
                htmlFor="name"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span> Name</span>
              </label>
              <input
                className="p-2 border-black border-2 rounded-lg w-full"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[2px] flex-col lg:flex-row  space-x-1">
              <label
                htmlFor="address"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit h-fit lg:w-[12vw]"
              >
                <span> Address</span>
              </label>
              <textarea
                className="p-2 border-black border-2 rounded-lg w-full h-20 "
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <label
                htmlFor="state"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span> State</span>
              </label>
              <select
                className="p-2 border-black border-2 rounded-lg w-full"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a state
                </option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-2 mt-[2px] lg:space-y-0 lg:space-x-[4px] w-full">
              <label
                htmlFor="name"
                className="border-2 border-black pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                Pin Code
              </label>
              <div className="flex flex-col lg:flex-row space-x-[2px]  flex-grow w-full">
                <input
                  className="p-2 border-black border-2 rounded-lg flex-grow"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border-black border-2 rounded-lg flex-grow"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Country"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-2 mt-[2px] lg:space-y-0 lg:space-x-[4px] w-full">
              <label
                htmlFor="mobile"
                className="border-2 border-black pl-2 py-[8px] rounded-lg w-fit lg:w-[13.6vw]"
              >
                Mobile
              </label>

              <select
                name="countryCode"
                className="border-2 border-black pl-2 py-[8px] rounded-lg w-fit"
                id="countryCode"
              >
                <option value="91">+91</option>
                {/* You can add more country codes as needed */}
                <option value="1">+1</option>
                <option value="44">+44</option>
                <option value="61">+61</option>
              </select>

              <div className="flex flex-col lg:flex-row space-x-[2px] flex-grow w-full">
                <input
                  className="p-2 border-black border-2 rounded-lg flex-grow"
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 border-black border-2 rounded-lg flex-grow"
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Telephone No."
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-y-2 mt-[2px] lg:space-y-0 lg:space-x-[4px] w-full">
              <label
                htmlFor="bankDetails"
                className="border-2 border-black pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                Bank Details
              </label>

              <div className="flex flex-col lg:flex-row space-x-[2px] flex-grow w-full">
                <select
                  name="bankDetails"
                  id="bankDetails"
                  className="border-2 border-black pl-2 py-[8px] rounded-lg w-full"
                  value={formData.bankDetails}
                  onChange={handleChange}
                >
                  <option value="">Bank Details</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                <input
                  className="p-2 border-black border-2 rounded-lg w-full"
                  type="text"
                  id="country"
                  name="country"
                  placeholder="IFSC Code"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <label
                htmlFor="name"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span> Account No.</span>
              </label>
              <input
                className="p-2 border-black border-2 rounded-lg w-full"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
              <label
                htmlFor="name"
                className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span> Bank Name</span>
              </label>
              <input
                className="p-2 border-black border-2 rounded-lg w-full"
                type="text"
                id="name"
                name="name"
                placeholder="Bank Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bg-[#fbe5d6] text-center  py-2 border-[2px] rounded-lg border-white ">
              Party Tax Details
            </div>
            <div className="flex justify-center gap-1 ">
              {" "}
              <button
                className="bg-[#fff2cc] w-fit text-center   px-10 text-black border-black border-[2px] p-2 rounded-lg mt-4"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLegder;
