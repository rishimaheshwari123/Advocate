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


    },
    { timestamps: true }
);

module.exports = mongoose.model("Compani", companiSchema);
