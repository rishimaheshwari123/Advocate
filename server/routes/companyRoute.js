const express = require("express")
const { createCompanyCtrl, loginCompanyCtrl, getAllCompany, createEmployeeCtrl, getAllEmployees, getSingleEmpCtrl, sendOfferLetter } = require("../controllers/companyCtrl")
const router = express.Router()


router.post("/create", createCompanyCtrl)
router.post("/login", loginCompanyCtrl)
router.get("/getAll", getAllCompany)



// from employee  

router.post("/create-employee", createEmployeeCtrl)
router.get("/get-employee/:companyId", getAllEmployees)
router.get("/get-single-employee/:id", getSingleEmpCtrl)



// offer letter  
router.post("/create-offerletter", sendOfferLetter)
module.exports = router