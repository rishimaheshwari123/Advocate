const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        images: [
            {
                public_id: String,
                url: String,
            },
        ],
        type: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);



module.exports = mongoose.model("Gallery", gallerySchema); 
