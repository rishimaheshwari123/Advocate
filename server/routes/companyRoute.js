const express = require("express")
const { createCompanyCtrl, loginCompanyCtrl, getAllCompany } = require("../controllers/companyCtrl")
const router = express.Router()


router.post("/create", createCompanyCtrl)
router.post("/login", loginCompanyCtrl)
router.get("/getAll", getAllCompany)



module.exports = router