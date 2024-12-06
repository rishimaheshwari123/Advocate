const express = require("express")
const { createCompanyCtrl, loginCompanyCtrl, getAllCompany, createEmployeeCtrl, getAllEmployees, getSingleEmpCtrl, sendOfferLetter, createAttandanceCtrl, createDeal, getAllLeads, createLead, frogetPasswordCtrl } = require("../controllers/companyCtrl")
const router = express.Router()


router.post("/create", createCompanyCtrl)
router.post("/login", loginCompanyCtrl)
router.get("/getAll", getAllCompany)
router.put("/forget-password", frogetPasswordCtrl)




// from employee  

router.post("/create-employee", createEmployeeCtrl)
router.get("/get-employee/:companyId", getAllEmployees)
router.get("/get-single-employee/:id", getSingleEmpCtrl)



// offer letter  
router.post("/create-offerletter", sendOfferLetter)


// attandance 
router.post("/create-attandance/:id", createAttandanceCtrl)

//Leads Routes
router.post("/leads/create", createLead); // Endpoint to create a lead
router.post("/deals/create", createDeal); // Endpoint to create a deal
router.get("/leads/:companyId", getAllLeads);


module.exports = router