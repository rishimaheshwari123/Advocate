import React from "react";

const Payroll = () => {
  return (
    <div>
      <div className="flex max-w-7xl mx-auto flex-col lg:flex-row items-center justify-center lg:justify-between p-8 lg:p-16 bg-white">
        <div className="flex flex-col items-center lg:items-start lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Payroll
            <span className="text-blue-600">Management</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Save 100s of hours every month by automatically calculating payroll,
            distribute payslips, file statutory compliances and more.
          </p>

          <ul className="space-y-2 text-lg">
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Fixed & Variable Salary</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Calculated and Variable Deductions</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Bonus, Gratuity, & Leave Encashment</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Compliance for ESI, PF, Prof. Tax & LWF</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>IT Declaration, Computation and FORM-16</span>
            </li>
          </ul>
          <a
            href="#"
            className="text-blue-600 font-semibold hover:underline mt-4"
          >
            More on Payroll Management →
          </a>
        </div>
        <div>
          <img
            src="https://runtimehrms.com/assets/images/home-payroll-management.png"
            alt="not found"
          />
        </div>
      </div>
    </div>
  );
};

export default Payroll;
