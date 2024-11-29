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

      crm: permissions.crm || false,
      accounting: permissions.accounting || false,
      hrm: permissions.hrm || false,
      payroll: permissions.payroll || false,

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
        message: "Employee created successfully. A welcome email has been sent!",
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
    const { companyName, employeeName, email, registrationNo, phone, joiningDate, id } = req.body;

    // Send the offer letter email
    await mailSender(email, "Offer Letter Send Successfully!", offerLetterEmail(companyName, employeeName, email, registrationNo, phone, joiningDate));

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

    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const employee = await employeeModel.findById(id);

    // Check if attendance is already recorded for today
    const todayAttendance = employee.attendance.find(
      (att) => att.date.split('T')[0] === currentDate
    );

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






module.exports = { createCompanyCtrl, loginCompanyCtrl, getAllCompany, createEmployeeCtrl, getAllEmployees, getSingleEmpCtrl, sendOfferLetter, createAttandanceCtrl };
