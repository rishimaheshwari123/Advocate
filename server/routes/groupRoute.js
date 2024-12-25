const express = require("express");
const router = express.Router();
const {
    createGroup,
    getAllGroups,
    getSubGroupsById,
} = require("../controllers/groupCtrl");

router.post("/create", createGroup);

router.get("/getAll/:companyId", getAllGroups);

router.get("/get/:id", getSubGroupsById);

module.exports = router;
