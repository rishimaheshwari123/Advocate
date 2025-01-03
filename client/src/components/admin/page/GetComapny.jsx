import React, { useEffect, useState } from "react";
import { getALLCompanyApi } from "../../../services/operations/company";

const GetCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  const getAllCompany = async () => {
    const response = await getALLCompanyApi();
    setCompanies(response);
  };

  useEffect(() => {
    getAllCompany();
  }, []);

  const formatFinancialYear = (from, to) => {
    const startYear = from?.split("-")[0];
    const endYear = to?.split("-")[0]?.slice(2); // Extract last two digits of the end year
    return startYear && endYear ? `${startYear}-${endYear}` : "N/A";
  };

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto bg-[#f2f2f2] rounded-[90px] p-5 border-2 border-blue-500 shadow-lg shadow-blue-500">
      {/* Search Input */}
      <div className="flex flex-col md:flex-row items-center bg-[#c5e0b4] shadow-md rounded-t-lg px-4 py-2 mb-4">
        <span className="font-bold text-gray-700 mr-4">
          Find Establishment Search
        </span>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-300 bg-[#dae3f3] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto ml-10 max-h-[60vh]">
        {/* Table Header */}
        <div className="grid grid-cols-[auto,4fr,1fr,2fr] gap-[2px] p-2 text-center font-bold min-w-[800px]">
          <div className="bg-white rounded p-2 border-2 w-10 text-[14px] border-black shadow">
            S.N.
          </div>
          <div className="bg-white rounded p-2 border-2 text-[14px] border-black shadow">
            Establishment Name
          </div>
          <div className="bg-white rounded p-2 border-2 text-[14px] border-black shadow">
            Code
          </div>
          <div className="bg-white rounded p-2 border-2 text-[14px] w-32 border-black shadow">
            Financial Year
          </div>
        </div>

        {/* Table Rows */}
        {filteredCompanies.length > 0
          ? filteredCompanies.map((company, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto,4fr,1fr,2fr] gap-[2px] -mt-3 text-[12px] p-2 text-center min-w-[800px]"
              >
                <div className="bg-white rounded text-[12px] border-2 border-black p-2 w-10 shadow font-bold">
                  {index + 1}
                </div>
                <div className="bg-white rounded text-[12px] border-2 border-black p-2 shadow font-semibold">
                  {company.companyName || "N/A"}
                </div>
                <div className="bg-white rounded text-[12px] border-2 border-black p-2 shadow">
                  {`SDBZU000${index + 1}`}
                </div>
                <div className="bg-white text-[12px] rounded w-32 border-2 border-black p-2 shadow">
                  {formatFinancialYear(
                    company.from || "2024",
                    company.to || "25"
                  )}
                </div>
              </div>
            ))
          : [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto,4fr,1fr,2fr] gap-[2px] bg-white p-2 rounded-lg shadow-md text-center min-w-[800px]"
              >
                <div className="bg-gray-100 rounded p-2 shadow font-bold">
                  {index + 1}
                </div>
                <div className="bg-gray-100 rounded p-2 shadow font-semibold">
                  {index === 0 ? "Mansarovar The School Betul" : ""}
                </div>
                <div className="bg-gray-100 rounded p-2 shadow">
                  {index === 0 ? "SDBZU0001" : ""}
                </div>
                <div className="bg-gray-100 rounded p-2 shadow">
                  {index === 0 ? "2024-25" : ""}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default GetCompany;
