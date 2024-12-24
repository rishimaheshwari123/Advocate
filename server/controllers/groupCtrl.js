const Group = require("../models/groupModel");

const createGroup = async (req, res) => {
    try {
        const { name, isPrimary, underGroup } = req.body;

        const existingGroup = await Group.findOne({ name });
        if (existingGroup) {
            return res.status(400).json({ message: "Group with this name already exists." });
        }

        if (!isPrimary && !underGroup) {
            return res.status(400).json({ message: "Non-primary group must have a parent group." });
        }

        if (isPrimary && underGroup) {
            return res.status(400).json({ message: "Primary group cannot have an 'underGroup'." });
        }

        const newGroup = new Group({
            name,
            isPrimary,
            underGroup: isPrimary ? null : underGroup,
        });

        await newGroup.save();

        if (underGroup) {
            await newGroup.addToParentGroup();
        }

        res.status(201).json({ message: "Group created successfully", group: newGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find()
            .populate("underGroup", "name")
            .populate("subGroups", "name");

        res.status(200).json({ message: "Groups fetched successfully", groups });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};



const getSubGroupsById = async (req, res) => {
    try {
        const { id } = req.params;

        const group = await Group.findById(id)
            .populate("subGroups", "name");

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.status(200).json({
            message: "Subgroups fetched successfully",
            subGroups: group.subGroups
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};


module.exports = { createGroup, getAllGroups, getSubGroupsById }