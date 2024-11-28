const bcrypt = require("bcrypt");
const employeeModel = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const companyModel = require("../models/companyModel");



const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields for login
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Find employee by email
    const employee = await employeeModel.findOne({ email });

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Employee is not registered. Please sign up to continue.",
      });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, employee.password);
    if (isPasswordMatch) {
      // Generate JWT token
      const token = jwt.sign(
        { email: employee.email, id: employee._id, role: "Employee" },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      // Send token as cookie and response
      employee.password = undefined; // Exclude password from response
      const options = {
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        employee,
        message: "Employee login successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};

module.exports = { registerCtrl, loginCtrl };
