const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    group: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        },
    ],
    sName: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    pin: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    mobile: {
        type: String,
        trim: true,
    },
    bank: {
        type: Boolean
    },
    ifsc: {
        type: Number,
    },
    acc: {
        type: Number,
    },
    bankName: {
        type: String,
    },
    pan: {
        type: String,
    },
    gst: {
        type: String,
        trim: true,
    },
    typeOfDealer: {
        type: String,
        enum: ['Regular', 'Composition', "Unregistered"],
    },

});


module.exports = mongoose.model("Legder", ledgerSchema);
