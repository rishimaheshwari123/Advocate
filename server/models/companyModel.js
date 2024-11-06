const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            trim: true,
        },
        companyAddress: {
            type: String,
            trim: true,
        },
        registrationNumber: {
            type: String,
            unique: true,
            trim: true,
        },
        taxId: {
            type: String,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
        contactNumber: {
            type: String,
            trim: true,
        },
        industryType: {
            type: String,
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ["User", "Employee", "Company", "SuperAdmin"],
            default: "Company",
        },
        companySize: {
            type: String,
            enum: ["Small", "Medium", "Large"],
            default: "Small",
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
