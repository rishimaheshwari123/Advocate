const Group = require("../models/groupModel");
const ledgerModels = require("../models/ledgerModel");

const createLedgerCtrl = async (req, res) => {
    try {
        const {
            name,
            group,
            sName,
            address,
            state,
            pin,
            country,
            mobile,
            bank,
            ifsc,
            acc,
            bankName,
            pan,
            gst,
            typeOfDealer
        } = req.body;



        const newLedger = new ledgerModels({
            name,
            group,
            sName,
            address,
            state,
            pin,
            country,
            mobile,
            bank,
            ifsc,
            acc,
            bankName,
            pan,
            gst,
            typeOfDealer,
        });


        await newLedger.save();


        const updatedGroup = await Group.findByIdAndUpdate(
            group,
            { $push: { ledger: newLedger._id } },
            { new: true }
        );


        res.status(201).json({
            message: "Ledger created successfully",
            ledger: newLedger,
            group: updatedGroup,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};



const getAllLedgerCtrl = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json({ message: "Ledger fetched successfully", groups });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};






module.exports = { createLedgerCtrl, getAllLedgerCtrl }