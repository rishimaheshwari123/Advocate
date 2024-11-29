import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getSingleEmployeeApi } from "../../../../services/operations/company";
import { sendOfferLetterApi } from "../../../../services/operations/company";

const SingleEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [isAttendanceSheetVisible, setIsAttendanceSheetVisible] =
    useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const result = await getSingleEmployeeApi(id);
        setEmployee(result);
        filterAttendance(result.attendance);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  useEffect(() => {
    if (employee) {
      filterAttendance(employee.attendance);
    }
  }, [selectedMonth, selectedYear, employee]);

  const filterAttendance = (attendance) => {
    const filtered = attendance.filter((entry) => {
      const date = new Date(entry.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      return month === selectedMonth && year === selectedYear;
    });
    setFilteredAttendance(filtered);
  };

  const handleSendOfferLetter = async () => {
    if (!companyName || !registrationNo || !joiningDate) {
      Swal.fire("Error", "Please fill all the fields.", "error");
      return;
    }

    const data = {
      companyName,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      email: employee.email,
      registrationNo,
      phone: employee.contactNumber,
      joiningDate,
      id: employee._id,
    };

    const success = await sendOfferLetterApi(data);
    if (success) {
      setEmployee((prev) => ({ ...prev, isOffer: false }));
      setIsModalOpen(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleAttendanceSheet = () => {
    setIsAttendanceSheetVisible((prev) => !prev);
  };

  const countPresentsInCurrentMonth = () => {
    const currentMonthAttendances = filteredAttendance.filter(
      (entry) => entry.status === "P"
    );
    return currentMonthAttendances.length;
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!employee) {
    return <p className="text-center text-lg">Employee not found.</p>;
  }

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Employee Details
      </h1>
      <div className="bg-white shadow-xl p-6 rounded-xl border border-gray-200">
        <div className="space-y-6">
          <p className="text-lg">
            <strong>Name:</strong> {employee.firstName} {employee.lastName}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {employee.email}
          </p>
          <p className="text-lg">
            <strong>Contact Number:</strong> {employee.contactNumber}
          </p>
          <p className="text-lg">
            <strong>Position:</strong> {employee.position}
          </p>
          <p className="text-lg">
            <strong>Department:</strong> {employee.department}
          </p>
          <p className="text-lg">
            <strong>Address:</strong> {employee.address}
          </p>
        </div>

        {employee.isOffer && (
          <div className="mt-6 text-center">
            <button
              onClick={openModal}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Send Offer Letter
            </button>
          </div>
        )}
      </div>

      {/* Attendance Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Attendance Summary</h2>

        {/* Filter for Month and Year */}
        <div className="mt-4 flex space-x-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          >
            {[...Array(12).keys()].map((month) => (
              <option key={month} value={month}>
                {new Date(0, month).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg"
          >
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <p className="font-medium mt-4">
          Attendance for{" "}
          {new Date(selectedYear, selectedMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
          :
        </p>
        <div className="flex space-x-4">
          <p className="text-lg">
            Present Days: {countPresentsInCurrentMonth()}
          </p>
        </div>

        <button
          onClick={toggleAttendanceSheet}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          {isAttendanceSheetVisible
            ? "Hide Attendance Sheet"
            : "Show Full Attendance"}
        </button>

        {isAttendanceSheetVisible && (
          <div className="mt-6">
            <h3 className="text-xl font-medium">Full Attendance Sheet</h3>
            <table className="w-full mt-4 table-auto border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Day</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((entry, index) => {
                  const date = new Date(entry.date);
                  const day = date.toLocaleString("en-us", { weekday: "long" });
                  return (
                    <tr key={index}>
                      <td className="border p-2">
                        {date.toLocaleDateString()}
                      </td>
                      <td className="border p-2">{day}</td>
                      <td className="border p-2">
                        {entry.status === "P" ? "Present" : "Absent"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for entering company details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl w-96">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Enter Company Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter Company Name"
                />
              </div>
              <div>
                <label className="block text-lg font-medium">
                  Registration No
                </label>
                <input
                  type="text"
                  value={registrationNo}
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter Registration No"
                />
              </div>
              <div>
                <label className="block text-lg font-medium">
                  Joining Date
                </label>
                <input
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={handleSendOfferLetter}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg"
              >
                Send Offer Letter
              </button>
              <button
                onClick={closeModal}
                className="bg-red-600 text-white py-3 px-6 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleEmployee;
