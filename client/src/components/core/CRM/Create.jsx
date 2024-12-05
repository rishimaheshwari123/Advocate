import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaPlus } from "react-icons/fa";
import { createLeadsForCompony } from "../../../services/operations/company";
import { useSelector } from "react-redux";
function CreateLeads() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // Validation schema
  const validationSchema = Yup.object().shape({
    leadName: Yup.string()
      .required("Lead name is required")
      .min(3, "Lead name must be at least 3 characters"),
    contactNumber: Yup.string()
      .required("Contact number is required")
      .matches(/^\d{10}$/, "Contact number must be 10 digits"),
    reason: Yup.string().optional(),
    reference: Yup.string().optional(),
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Submit handler
  const onSubmit = async(data) => {
    const payload = {
      companyId:"674826d0c1ead0dba0315ab5",
      ...data,
    };
    console.log("Lead Data:", user);
    await createLeadsForCompony(payload)
    // reset();
    // setIsOpen(false); // Close modal after submission
  };

  return (
    <div className="p-4 ">
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
        <FaPlus className="mr-2" />
        Create Deal
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
            <h2 className="text-xl font-bold mb-4">Create Lead</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Lead Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Lead Name</label>
                <input
                  type="text"
                  {...register("leadName")}
                  className={`w-full px-4 py-2 border rounded ${
                    errors.leadName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-red-500 text-sm">{errors.leadName?.message}</p>
              </div>

              {/* Contact Number */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  {...register("contactNumber")}
                  className={`w-full px-4 py-2 border rounded ${
                    errors.contactNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-red-500 text-sm">
                  {errors.contactNumber?.message}
                </p>
              </div>

              {/* Reason */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Reason</label>
                <textarea
                  {...register("reason")}
                  className="w-full px-4 py-2 border rounded border-gray-300"
                />
              </div>

              {/* Reference */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Reference</label>
                <input
                  type="text"
                  {...register("reference")}
                  className="w-full px-4 py-2 border rounded border-gray-300"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateLeads;
