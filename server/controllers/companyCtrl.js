const bcrypt = require("bcrypt");
const companyModel = require("../models/companyModel");
const jwt = require("jsonwebtoken");


const createCompanyCtrl = async (req, res) => {
  try {
    const {
      companyName,
      companyAddress,
      pin,
      pan,
      country,
      state,
      email,
      password,
      contactNumber,
      userName,
      from,
      to,
      gst,
      permissions = {},
      role = "Company",
    } = req.body;

    if (!companyName || !companyAddress || !pin || !pan || !email || !password || !contactNumber) {
      return res.status(403).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const existingCompany = await companyModel.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "email already exists. Please log in to continue.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare permissions structure with defaults
    const formattedPermissions = {

        crm: permissions.admin?.crm || false,
        accounting: permissions.admin?.accounting || false,
        hrm: permissions.admin?.hrm || false,
        payroll: permissions.admin?.payroll || false,
    
    };

    // Create new company record
    const company = await companyModel.create({
      companyName,
      companyAddress,
      pin,
      pan,
      country,
      state,
      email,
      password: hashedPassword,
      contactNumber,
      userName,
      from,
      to,
      gst,
      permissions: formattedPermissions,
      role,
    });

    return res.status(200).json({
      success: true,
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


const loginCompanyCtrl = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check required fields for login
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Find company by email
    const company = await companyModel.findOne({ userName });

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



const getAllCompany = async (req, res) => {
  try {
    const companies = await companyModel.find({})
    return res.status(200).json({
      success: true,
      totalCompanies: companies.length,
      companies
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in getting all company. Please try again.",
    });
  }
}
module.exports = { createCompanyCtrl, loginCompanyCtrl, getAllCompany };
