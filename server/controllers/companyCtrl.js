const bcrypt = require("bcrypt");
const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSenderr");
const { welcomeEmailTemplate } = require("../template/welcomeEmailTemplate");
const mailSender2 = require("../utils/mailSender2");
const { offerLetterEmail } = require("../template/offerLetter");

const createCompanyCtrl = async (req, res) => {
  try {
    const {
      companyName,
      code,
      flatOrBlock,
      building,
      roadStreet,
      area,
      city,
      pin,
      state,
      country,
      pen, ten,
      email,
      mNumber,
      tNumber,
      manageFor,
      from,
      to,
      gst,
      typeOfDealer,
      userName,
      password,
      permissions = {},
      role = "Company",
    } = req.body;

    // Validate required fields
    if (
      !companyName ||
      !flatOrBlock ||
      !building ||
      !roadStreet ||
      !area ||
      !city ||
      !pin ||
      !state ||
      !country ||
      !email ||
      !password ||
      !mNumber
    ) {
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
        message: "Email already exists. Please log in to continue.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare permissions structure with defaults
    const formattedPermissions = {
      crm: permissions.crm || false,
      accounting: permissions.accounting || false,
      hrm: permissions.hrm || false,
      payroll: permissions.payroll || false,
    };

    // Create new company record
    const company = await companyModel.create({
      companyName,
      code,
      flatOrBlock,
      building,
      roadStreet,
      area,
      city,
      pin,
      state,
      country,
      pen, ten,
      email,
      mNumber,
      tNumber,
      manageFor,
      from,
      to,
      gst,
      typeOfDealer,
      userName,
      password: hashedPassword,
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

    console.log(password)
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
    console.log(isPasswordMatch)
    console.log(company.password)
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
    const companyModeles = await companyModel.find({});
    return res.status(200).json({
      success: true,
      totalcompanyModeles: companyModeles.length,
      companyModeles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in getting all company. Please try again.",
    });
  }
};

const createEmployeeCtrl = async (req, res) => {
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
      companyId,
    } = req.body;

    // Check required fields for employee registration
    if (
      !firstName ||
      !lastName ||
      !email ||
      !contactNumber ||
      !position ||
      !password ||
      !department ||
      !address ||
      !companyId
    ) {
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee
    const employee = await employeeModel.create({
      firstName,
      lastName,
      email,
      contactNumber,
      position,
      password: hashedPassword,
      department,
      address,
      companyId,
    });

    // Add the employee to the company's employee list
    if (employee) {
      await companyModel.findByIdAndUpdate(companyId, {
        $push: { employeeId: employee._id },
      });
    }

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

    // Send a welcome email
    const name = `${firstName} ${lastName}`;
    const emailRes = await mailSender2(
      email,
      welcomeEmailTemplate(name, email, password)
    );

    // Check the response of the email sending
    if (emailRes) {
      return res.status(200).json({
        success: true,
        token,
        employee,
        message:
          "Employee created successfully. A welcome email has been sent!",
      });
    } else {
      return res.status(200).json({
        success: true,
        token,
        employee,
        message:
          "Employee created successfully, but we were unable to send the welcome email. Please verify the email address.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Employee registration failed. Please try again.",
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    // Destructure companyId from params
    const { companyId } = req.params;

    // Find all employees for the given companyId
    const employees = await employeeModel.find({ companyId });

    // Return success response
    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error(error);
    // Return error response
    return res.status(500).json({
      success: false,
      message: "Error in getting employees for the company. Please try again.",
    });
  }
};
const getSingleEmpCtrl = async (req, res) => {
  try {
    // Destructure companyId from params
    const { id } = req.params;

    // Find all employees for the given companyId
    const employee = await employeeModel.findById(id);

    // Return success response
    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error(error);
    // Return error response
    return res.status(500).json({
      success: false,
      message: "Error in getting Single employees . Please try again.",
    });
  }
};

const sendOfferLetter = async (req, res) => {
  try {
    const {
      companyName,
      employeeName,
      email,
      registrationNo,
      phone,
      joiningDate,
      id,
    } = req.body;

    // Send the offer letter email
    await mailSender(
      email,
      "Offer Letter Send Successfully!",
      offerLetterEmail(
        companyName,
        employeeName,
        email,
        registrationNo,
        phone,
        joiningDate
      )
    );

    // Update the isOffer field to false
    await employeeModel.findByIdAndUpdate(
      id,
      { isOffer: false },
      { new: true } // This ensures the updated document is returned
    );

    // Send a successful response
    res.status(200).send({
      message: "Offer Letter sent successfully!",
      success: true,
    });
  } catch (error) {
    // Handle error
    return res.status(500).json({
      success: false,
      message: "Error in sending offer letter. Please try again.",
    });
  }
};

const createAttandanceCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Attendance status is required.",
      });
    }

    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const employee = await employeeModel.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    // Check if attendance is already recorded for today
    const todayAttendance = employee.attendance.find((att) => {
      const attendanceDate =
        att.date instanceof Date
          ? att.date.toISOString().split("T")[0]
          : att.date.split("T")[0];
      return attendanceDate === currentDate;
    });

    if (todayAttendance) {
      return res.status(400).json({
        success: false,
        message: "Attendance already recorded for today.",
      });
    }

    const newAttendance = {
      status,
      date: new Date(),
    };

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      { $push: { attendance: newAttendance } },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Attendance added successfully.",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in creating attendance. Please try again.",
    });
  }
};


const createLead = async (req, res) => {
  try {
    const { companyId, leadName, contactNumber, reason, reference } = req.body;

    // Validate input
    if (!companyId || !leadName || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "companyId, leadName, and contactNumber are required.",
      });
    }

    // Create a new lead object
    const newLead = {
      leadName,
      contactNumber,
      reason,
      reference,
    };

    // Add the lead to the company's leads array
    const company = await companyModel.findByIdAndUpdate(
      companyId,
      { $push: { leads: newLead } },
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      lead: newLead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};


const createDeal = async (req, res) => {
  try {
    const { companyId, leadId, dealName, assignedTo, remarks } = req.body;

    // Validate input
    if (!companyId || !leadId || !dealName || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "companyId, leadId, dealName, and assignedTo are required.",
      });
    }

    // Create a new deal object
    const newDeal = {
      dealName,
      assignedTo,
      remarks,
    };

    // Update the lead with the new deal
    const company = await companyModel.findOneAndUpdate(
      { _id: companyId, "leads._id": leadId },
      { $push: { "leads.$.deals": newDeal } },
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company or lead not found.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Deal created successfully.",
      deal: newDeal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
const getAllLeads = async (req, res) => {
  try {
    const { companyId } = req.params; // Get companyId from route parameters
    const { page = 1, limit = 10 } = req.query; // Get pagination parameters from query, default to page 1 and limit 10

    // Validate input
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "companyId is required.",
      });
    }

    // Find the company by ID
    const company = await companyModel.findById(companyId, { leads: 1 });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const totalLeads = company.leads.length; // Total number of leads
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Sort leads by createdAt descending and apply pagination
    const paginatedLeads = company.leads
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      totalLeads,
      currentPage: page,
      totalPages: Math.ceil(totalLeads / limit),
      leads: paginatedLeads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};


const frogetPasswordCtrl = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Ensure email and password are provided
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required.",
      });
    }

    // Find the user by email
    const user = await companyModel.findOne({ email });

    // If user doesn't exist, return error message
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register the user.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password with the hashed password
    const updatedUser = await companyModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Your password has been updated successfully!",
      updatedUser
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};



module.exports = {
  createCompanyCtrl,
  loginCompanyCtrl,
  getAllCompany,
  createEmployeeCtrl,
  getAllEmployees,
  getSingleEmpCtrl,
  sendOfferLetter,
  createAttandanceCtrl,
  createLead,
  createDeal,
  getAllLeads,
  frogetPasswordCtrl
};
