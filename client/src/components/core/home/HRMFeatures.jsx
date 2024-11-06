import React from "react";
import {
  FaMapMarkerAlt,
  FaHandsHelping,
  FaFileAlt,
  FaFingerprint,
  FaBolt,
  FaChartPie,
} from "react-icons/fa";

const HRMFeatures = () => {
  return (
    <div className="p-8 bg-white  max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h4 className="text-sm uppercase font-semibold text-gray-500 tracking-wide">
          Tools to get more done
        </h4>
        <h2 className="text-2xl font-bold text-gray-900">
          Everything <span className="text-blue-600">that you desire</span> in
          an HRMS solution
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex items-start space-x-4">
          <FaMapMarkerAlt className="text-blue-400 w-10 h-10" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Geo-Fencing</h3>
            <p className="text-gray-600">
              Define office location to allow punch only from geo-fenced area.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <FaHandsHelping className="text-blue-400 w-10 h-10" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Helpdesk</h3>
            <p className="text-gray-600">
              Helpdesk for employees to raise requests and resolve queries.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <FaFileAlt className="text-blue-400 w-10 h-10" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Claim Management
            </h3>
            <p className="text-gray-600">
              Claim request submission and input to payroll. Policies for claim
              request limit.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <FaFingerprint className="text-blue-400 w-10 h-10" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Biometric Integration
            </h3>
            <p className="text-gray-600">
              Integrate with almost any biometric using Runtime Sync Utility.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <FaBolt className="text-blue-400 w-10 h-10" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Custom Workflows
            </h3>
            <p className="text-gray-600">
              Create custom forms with flexible forms and multi-approval steps.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <FaChartPie className="text-blue-400 w-10 h-10" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              50+ MIS Reports
            </h3>
            <p className="text-gray-600">
              50+ reports for MIS, Compliance, and HR decision making.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRMFeatures;
