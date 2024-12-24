const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Group name should be unique
        trim: true,
    },
    isPrimary: {
        type: Boolean,
        default: false, // By default, it's not a primary group
    },
    underGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group", // Refers to another group (self-referencing)
        default: null, // If it's not under any group
    },
    subGroups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group", // Sub-groups reference
        },
    ],
});

// Pre-save middleware to ensure consistency
groupSchema.pre("save", async function (next) {
    if (this.isPrimary && this.underGroup) {
        throw new Error("Primary group cannot have an 'underGroup'.");
    }
    next();
});

// Add subgroup to parent group automatically
groupSchema.methods.addToParentGroup = async function () {
    if (this.underGroup) {
        const parentGroup = await mongoose.model("Group").findById(this.underGroup);
        if (parentGroup) {
            parentGroup.subGroups.push(this._id);
            await parentGroup.save();
        }
    }
};

module.exports = mongoose.model("Group", groupSchema);
