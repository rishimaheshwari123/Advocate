const bcrypt = require("bcrypt");
const companyModel = require("../models/companyModel");
const jwt = require("jsonwebtoken");

const registerCtrl = async (req, res) => {
  try {
    const {
      companyName,
      companyAddress,
      registrationNumber,
      taxId,
      email,
      password,
      contactNumber,
      industryType,
      website,
      companySize
    } = req.body;

    // Check required fields for company registration
    if (!companyName || !companyAddress || !email || !contactNumber || !industryType || !companySize || !password) {
      return res.status(403).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Check if the company already exists
    const existingCompany = await companyModel.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists. Please log in to continue.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company record
    const company = await companyModel.create({
      companyName,
      companyAddress,
      registrationNumber,
      taxId,
      email,
      contactNumber,
      industryType,
      website,
      companySize,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { email: company.email, id: company._id, role: "Company" },
      process.env.JWT_SECRET,
      { expiresIn: "3d" } // Optional: Set token expiration
    );

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };
    res.cookie("token", token, options);

    return res.status(200).json({
      success: true,
      token,
      company,
      message: "Company registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Company registration failed. Please try again.",
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

    // Find company by email
    const company = await companyModel.findOne({ email });

    if (!company) {
      return res.status(401).json({
        success: false,
        message: "Company is not registered. Please sign up to continue.",
      });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, company.password);
    if (isPasswordMatch) {
      // Generate JWT token
      const token = jwt.sign(
        { email: company.email, id: company._id, role: "Company" },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      // Send token as cookie and response
      company.password = undefined; // Exclude password from response
      const options = {
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        company,
        message: "Company login successful",
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
