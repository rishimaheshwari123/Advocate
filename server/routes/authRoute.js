const express = require("express")
const { registerCtrl, loginCtrl, frogetPasswordCtrl } = require("../controllers/authCtrl")
const router = express.Router()


router.post("/login", loginCtrl)
router.post("/register", registerCtrl)
router.put("/forget-password", frogetPasswordCtrl)



module.exports = router