import React from "react";

const HRManagement = () => {
  return (
    <div className="flex max-w-7xl mx-auto flex-col lg:flex-row items-center justify-center lg:justify-between p-8 lg:p-16 bg-white">
      <div>
        <img
          src="https://runtimehrms.com/assets/images/home-hr-management.png"
          alt="not found"
        />
      </div>
      <div className="flex flex-col items-center lg:items-start lg:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          HR <span className="text-blue-600">Management</span>
        </h2>
        <p className="text-gray-700 text-lg">
          No more juggling apps for managing human resources. Everything you
          need, conveniently located in one place.
        </p>
        <p className="text-gray-700 text-lg">
          From Onboarding to Separation, we've got everything for you.
        </p>
        <ul className="space-y-2 text-lg">
          <li className="flex items-center space-x-2">
            <span className="text-blue-600">✓</span>
            <span>Self-Onboarding for new Joiners</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-blue-600">✓</span>
            <span>Loans & Advance Management</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-blue-600">✓</span>
            <span>One Click Letter Generation</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-blue-600">✓</span>
            <span>Digital Notice Board</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-blue-600">✓</span>
            <span>Exit Management</span>
          </li>
        </ul>
        <a
          href="#"
          className="text-blue-600 font-semibold hover:underline mt-4"
        >
          Explore HR Management →
        </a>
      </div>
    </div>
  );
};

export default HRManagement;
