import React from "react";

const Time = () => {
  return (
    <div>
      <div className="flex max-w-7xl mx-auto flex-col lg:flex-row items-center justify-center lg:justify-between p-8 lg:p-16 bg-white">
        <div>
          <img
            src="https://runtimehrms.com/assets/images/home-time-attendance.png"
            alt="not found"
          />
        </div>
        <div className="flex flex-col items-center lg:items-start lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Time &<span className="text-blue-600">Attendance</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Geo-tagged & Geo-fenced mobile attendance.
          </p>

          <ul className="space-y-2 text-lg">
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Daily Attendance Dashboard</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Late Coming & Early Going Mark</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Leave Grant & Lapse Rules</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Overtime & Comp Off Automation</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-600">✓</span>
              <span>Shift & Week Off Roster</span>
            </li>
          </ul>
          <a
            href="#"
            className="text-blue-600 font-semibold hover:underline mt-4"
          >
            Discover Time & Attendance →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Time;
