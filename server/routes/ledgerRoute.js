const express = require("express");
const { createLedgerCtrl, getAllLedgerCtrl } = require("../controllers/ledgerCtrl");
const router = express.Router();


router.post("/create", createLedgerCtrl);

router.get("/getAll", getAllLedgerCtrl);


module.exports = router;
