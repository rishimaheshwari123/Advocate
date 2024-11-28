import React, { useState, useEffect } from "react";
import { getALLEmployeeApi } from "../../../../services/operations/company"; // Adjust the import path
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GetEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]); // For filtered results
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const { company } = useSelector((state) => state.company);
  const companyId = company._id || "";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch employees when component mounts
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const result = await getALLEmployeeApi(companyId);
        setEmployees(result);
        setFilteredEmployees(result); // Initialize filtered employees
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [companyId]);

  // Handle search functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter employees based on the query
    const filtered = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.contactNumber.toLowerCase().includes(query) ||
        employee.position.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        employee.address.toLowerCase().includes(query)
    );

    setFilteredEmployees(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {loading ? (
        <p>Loading employees...</p>
      ) : filteredEmployees.length === 0 ? (
        <p>No employees found for this company.</p>
      ) : (
        <div className="overflow-x-auto">
          {" "}
          {/* Added wrapper for horizontal scroll */}
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">First Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Contact Number
                </th>
                <th className="border border-gray-300 px-4 py-2">Position</th>
                <th className="border border-gray-300 px-4 py-2">Department</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.email}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    navigate(`/company/get-employee/${employee._id}`)
                  } // Navigate on row click
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.firstName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.contactNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.position}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.department}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetEmployee;
