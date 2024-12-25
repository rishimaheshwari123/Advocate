import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaEye } from "react-icons/fa"; // Import icons
import {
  createGroupApi,
  getAllGroupsApi,
} from "../../../../services/operations/group";
import { Link } from "react-router-dom";

const CreateGroup = () => {
  const [formData, setFormData] = useState({
    name: "",
    isPrimary: "No",
    underGroup: "",
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
      const response = await getAllGroupsApi();
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
      isPrimary: formData.isPrimary === "Yes" ? true : false,
    };

    const result = await createGroupApi(updatedFormData);
    if (result) {
      setFormData({
        name: "",
        isPrimary: "No",
        underGroup: "",
      });
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  return (
    <div className="flex items-start justify-center mt-10">
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
      <div className="w-fit font-semibold rounded-3xl p-5 border-2 border-blue-500 shadow-lg shadow-blue-500">
        <div>
          <h2 className="text-center bg-[#fcd5b5] font-bold rounded-md px-4 py-2 w-fit mx-auto">
            Create New Group
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
                htmlFor="isPrimary"
                className="border-2 border-black  -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
              >
                <span>Primary Group</span>
              </label>
              <select
                className="p-2 border-black border-2 rounded-lg w-full"
                name="isPrimary"
                value={formData.isPrimary}
                onChange={handleChange}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {formData.isPrimary === "No" && (
              <div className="flex flex-col lg:flex-row items-center space-x-1 mt-[2px]">
                <label
                  htmlFor="underGroup"
                  className="border-2 border-black -mr-[1px] pl-2 py-[8px] rounded-lg w-fit lg:w-[12vw]"
                >
                  <span>Under Group</span>
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
            )}

            <div className="flex justify-center gap-1">
              {" "}
              <button
                className="bg-[#fff2cc] w-fit text-center   px-4 text-black border-black border-[2px] p-2 rounded-lg mt-4"
                onClick={handleSubmit}
              >
                Save
              </button>
              <Link
                to={"/admin/dashboard"}
                className="bg-[#fff2cc] w-fit text-center px-4 text-black border-black border-[2px] p-2 rounded-lg mt-4"
              >
                Exit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
