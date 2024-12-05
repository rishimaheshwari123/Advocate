const mongoose = require("mongoose");

const companiSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
    },
    companyAddress: {
      type: String,
      trim: true,
    },
    pin: {
      type: String,
    },
    pan: {
      type: String,
    },
    country: {
      type: String,
      trim: true,
    },

    contactNumber: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    from: {
      type: String,
      trim: true,
    },
    to: {
      type: String,
      trim: true,
    },
    gst: {
      type: String,
      trim: true,
    },

    permissions: {
      crm: { type: Boolean, default: false },
      accounting: { type: Boolean, default: false },
      hrm: { type: Boolean, default: false },
      payroll: { type: Boolean, default: false },
    },

    role: {
      type: String,
      enum: ["User", "Employee", "Company", "SuperAdmin"],
      default: "Company",
    },
    employeeId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],

    leads: [
        {
            leadName: { type: String, required: true, trim: true }, // Name of the lead
            contactNumber: { type: String, required: true, trim: true }, // Contact number of the lead
            reason: { type: String, trim: true }, // Reason for lead creation
            reference: { type: String, trim: true }, // Reference source
            createdAt: { type: Date, default: Date.now }, // Timestamp for lead creation
            updatedAt: { type: Date }, // Timestamp for the last update
            deals: [
                {
                    dealName: { type: String, trim: true }, // Name of the deal
                    dealStatus: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }, // Deal status
                    assignedTo: { type: String, required: true, }, // Employee managing the deal
                    remarks: { type: String, trim: true }, // Additional remarks
                    createdAt: { type: Date, default: Date.now }, // Timestamp for deal creation
                    updatedAt: { type: Date }, // Timestamp for the last deal update
                },
            ],
        },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Compani", companiSchema);
