const Group = require("../models/groupModel");
const Company = require("../models/companyModel");
const { createDefaultGroups } = require("../config/deafultCompony");



const createGroup = async (req, res) => {
    try {
        const { name, isPrimary, underGroup, companyId } = req.body;

        // Check if the company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }

        // Check if the group already exists in the company
        const existingGroup = await Group.findOne({ name, company: companyId });
        if (existingGroup) {
            return res.status(400).json({ message: "Group with this name already exists." });
        }

        // If the group is not primary, ensure it has a parent group
        if (!isPrimary && !underGroup) {
            return res.status(400).json({ message: "Non-primary group must have a parent group." });
        }

        // Ensure primary group does not have a parent
        if (isPrimary && underGroup) {
            return res.status(400).json({ message: "Primary group cannot have an 'underGroup'." });
        }

        const newGroup = new Group({
            name,
            isPrimary,
            underGroup: isPrimary ? null : underGroup,
            company: companyId, // Link to company
        });

        // Save the group
        await newGroup.save();

        // If the group has a parent, add it as a sub-group in the parent group
        if (underGroup) {
            await newGroup.addToParentGroup();
        }

        // Link the new group to the company
        company.groups.push(newGroup._id);
        await company.save();

        res.status(201).json({ message: "Group created successfully", group: newGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

const getAllGroups = async (req, res) => {
    try {
        
        const { companyId } = req.params;  // Get companyId from query parameters
        console.log(req.params)

        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required" });
        }

        const groups = await Group.find({ company: companyId })  // Filter groups based on companyId
            .populate("underGroup", "name")
            .populate("subGroups", "name")
            .populate("company", "companyName");  // Add company details

        if (groups.length === 0) {
            await createDefaultGroups(companyId)
            return res.status(404).json({ message: "No groups found for this company" });
        }

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
            .populate("subGroups", "name")
            .populate("underGroup", "name"); // Populate parent group details

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.status(200).json({
            message: "Subgroups fetched successfully",
            subGroups: group.subGroups,
            parentGroup: group.underGroup, // Return the parent group
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};



module.exports = { createGroup, getAllGroups, getSubGroupsById }