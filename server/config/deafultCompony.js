

const Company = require("../models/companyModel")
const Group = require("../models/groupModel")

const DEFAULT_GROUPS = [
    "Bank Accounts",
    "Bank OCC A/c",
    "Bank OD A/c",
    "Branch/Divisions",
    "Capital Account",
    "Cash-in-Hand",
    "Current Assets",
    "Current Liabilities",
    "Deposits (Asset)",
    "Direct Expenses",
    "Direct Incomes",
    "Duties & Taxes",
    "Expenses (Direct)",
    "Expenses (Indirect)",
    "Fixed Assets",
    "Income (Direct)",
    "Income (Indirect)",
    "Indirect Expenses",
    "Indirect Incomes",
    "Investments",
    "Loans & Advances (Asset)",
    "Loans (Liability)",
    "Misc. Expenses (ASSET)",
    "Provisions",
    "Purchase Accounts",
    "Reserves & Surplus",
    "Retained Earnings",
    "Sales Accounts",
    "Secured Loans",
    "Stock-in-Hand",
    "Sundry Creditors",
    "Sundry Debtors",
    "Suspense A/c",
    "Unsecured Loans",
];



exports.createDefaultGroups = async (companyId) => {
    const groups = DEFAULT_GROUPS.map((name) => ({
        name,
        isPrimary: false,
        underGroup: null,
        company: companyId,
    }));

    // Bulk insert default groups
    const createdGroups = await Group.insertMany(groups);

    // Link groups to the company
    await Company.findByIdAndUpdate(companyId, {
        $push: { groups: { $each: createdGroups.map((group) => group._id) } },
    });

    return createdGroups;
};
