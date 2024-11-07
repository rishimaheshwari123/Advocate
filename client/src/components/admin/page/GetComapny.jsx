import React, { useEffect, useState } from "react";
import { getALLCompanyApi } from "../../../services/operations/company";

const GetCompany = () => {
  const [companies, setCompanies] = useState([]);

  const getAllCompany = async () => {
    const response = await getALLCompanyApi();
    setCompanies(response);
  };

  useEffect(() => {
    getAllCompany();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">All Companies</h1>
      {companies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                {company.companyName}
              </h2>
              <p className="text-gray-600">
                <strong>Address:</strong> {company.companyAddress}
              </p>
              <p className="text-gray-600">
                <strong>Pincode:</strong> {company.pin}
              </p>
              <p className="text-gray-600">
                <strong>PAN:</strong> {company.pan}
              </p>
              <p className="text-gray-600">
                <strong>Country:</strong> {company.country}
              </p>
              <p className="text-gray-600">
                <strong>Contact Number:</strong> {company.contactNumber}
              </p>
              <p className="text-gray-600">
                <strong>State:</strong> {company.state}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {company.email}
              </p>
              <p className="text-gray-600">
                <strong>User Name:</strong> {company.userName}
              </p>
              <p className="text-gray-600">
                <strong>From:</strong> {company.from}
              </p>
              <p className="text-gray-600">
                <strong>To:</strong> {company.to}
              </p>
              <p className="text-gray-600">
                <strong>GST:</strong> {company.gst}
              </p>
              <h3 className="text-lg font-semibold mt-4">Permissions</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>
                  <strong>CRM:</strong>{" "}
                  {company.permissions?.admin?.crm ? "Yes" : "No"}
                </li>
                <li>
                  <strong>Accounting:</strong>{" "}
                  {company.permissions?.admin?.accounting ? "Yes" : "No"}
                </li>
                <li>
                  <strong>HRM:</strong>{" "}
                  {company.permissions?.admin?.hrm ? "Yes" : "No"}
                </li>
                <li>
                  <strong>Payroll:</strong>{" "}
                  {company.permissions?.admin?.payroll ? "Yes" : "No"}
                </li>
                <li>
                  <strong>HR:</strong> {company.permissions?.hr ? "Yes" : "No"}
                </li>
                <li>
                  <strong>Other:</strong>{" "}
                  {company.permissions?.other ? "Yes" : "No"}
                </li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No companies found.</p>
      )}
    </div>
  );
};

export default GetCompany;
