import React, { useState, useEffect } from "react";
import { getALLEmployeeApi } from "../../../../services/operations/company";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // For showing success/error notifications
import { attendanceApi } from "../../../../services/operations/company"; // Assuming this is the API for attendance

const AddAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { company } = useSelector((state) => state.company);
  const companyId = company._id || "";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState(null); // To hold attendance status
  const [disabledEmployees, setDisabledEmployees] = useState({}); // Track disabled status of buttons

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const result = await getALLEmployeeApi(companyId);
        setEmployees(result);
        setFilteredEmployees(result);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [companyId]);

  useEffect(() => {
    // Check if attendance has been recorded today for any employee
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    // Load the disabled state from localStorage or reset it
    const storedState =
      JSON.parse(localStorage.getItem("attendanceState")) || {};
    const updatedState = {};

    employees.forEach((employee) => {
      const todayAttendance = employee?.attendance?.find(
        (att) => att.date.split("T")[0] === currentDate
      );
      if (todayAttendance) {
        updatedState[employee._id] = true;
      } else {
        updatedState[employee._id] = storedState[employee._id] || false;
      }
    });

    setDisabledEmployees(updatedState);
  }, [employees]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };

  const handleAttendance = async (employeeId, status) => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    const employee = employees.find((e) => e._id === employeeId);
    const todayAttendance = employee?.attendance?.find(
      (att) => att.date.split("T")[0] === currentDate
    );

    if (todayAttendance) {
      Swal.fire("Error", "Attendance already recorded for today", "error");
      return;
    }

    try {
      const formData = { status };
      const response = await attendanceApi(formData, employeeId);
      if (response) {
        Swal.fire("Success", "Attendance recorded successfully", "success");

        // Update the disabled state for the employee and store it
        setDisabledEmployees((prev) => {
          const updatedState = { ...prev, [employeeId]: true };
          localStorage.setItem("attendanceState", JSON.stringify(updatedState)); // Save to localStorage
          return updatedState;
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to record attendance", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
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
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">First Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Contact Number
                </th>
                <th className="border border-gray-300 px-4 py-2">Attendance</th>{" "}
                {/* New column */}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.email}
                  className="cursor-pointer hover:bg-gray-100"
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
                    <button
                      onClick={() => handleAttendance(employee._id, "P")}
                      className={`px-4 py-2 rounded mr-2 ${
                        disabledEmployees[employee._id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 text-white"
                      }`}
                      disabled={disabledEmployees[employee._id]}
                    >
                      P
                    </button>
                    <button
                      onClick={() => handleAttendance(employee._id, "A")}
                      className={`px-4 py-2 rounded ${
                        disabledEmployees[employee._id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 text-white"
                      }`}
                      disabled={disabledEmployees[employee._id]}
                    >
                      A
                    </button>
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

export default AddAttendance;
