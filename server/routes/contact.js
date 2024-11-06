const express = require("express");
const { contactCtrl } = require("../controllers/contactCtrl");
const router = express.Router();



router.post("/create", contactCtrl);
module.exports = router;