const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            trim: true,
        },
        contactNumber: {
            type: String,
            trim: true,
        },
        position: {
            type: String,
            trim: true,
        },
        department: {
            type: String,
            trim: true,
        },

        address: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ["User", "Employee", "Company", "SuperAdmin"],
            default: "Employee",
        },
        companyId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Compani",
        }],
        isOffer: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("Employee", employeeSchema);
