const bcrypt = require("bcrypt");
const employeeModel = require("../models/employeeModel");
const jwt = require("jsonwebtoken");

const registerCtrl = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      position,
      password,
      department,
      address,
      companyId
    } = req.body;

    // Check required fields for employee registration
    if (!firstName || !lastName || !email || !contactNumber || !position || !password || !department || !address || !companyId) {
      return res.status(403).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Check if the employee already exists
    const existingEmployee = await employeeModel.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists. Please log in to continue.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee record
    const employee = await employeeModel.create({
      firstName,
      lastName,
      email,
      contactNumber,
      position,
      password: hashedPassword,
      department,
      address,
      companyId
    });

    // Generate JWT token
    const token = jwt.sign(
      { email: employee.email, id: employee._id, role: "Employee" },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options);

    return res.status(200).json({
      success: true,
      token,
      employee,
      message: "Employee registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Employee registration failed. Please try again.",
    });
  }
};

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
