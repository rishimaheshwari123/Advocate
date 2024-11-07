const express = require("express")
const { createCompanyCtrl, loginCompanyCtrl, getAllCompany } = require("../controllers/companyCtrl")
const router = express.Router()


router.post("/create", createCompanyCtrl)
router.post("/login", loginCompanyCtrl)
router.post("/getAll", getAllCompany)



module.exports = router