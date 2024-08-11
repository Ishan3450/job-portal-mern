const zod = require("zod");
const { Company } = require("../db/index");

async function register(req, res) {
    try {
        const { name, description, location } = req.body;
        const registeredBy = req.userId;

        const registerUserZodSchema = zod.object({
            name: zod.string().min(2),
            description: zod.string().min(1),
            location: zod.string().min(1),
        });
        const inputValidationResult = registerUserZodSchema.safeParse({
            name,
            description,
            location,
        });

        if (!inputValidationResult.success) {
            return res.status(400).json({
                message: "Wrong inputs provided",
                success: false,
            });
        }

        const isCompanyExists = await Company.findOne({ name });
        if (isCompanyExists) {
            return res.status(400).json({
                message: "Company is already registered",
                success: false,
            });
        }

        await Company.create({
            name,
            description,
            location,
            registeredBy,
        });

        res.status(201).json({
            message: "Company registered successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong",
            success: false,
        });
    }
}

async function getCompanies(req, res) {
    try {
        const userId = req.userId;
        const companies = await Company.find({ registeredBy: userId });

        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false,
            });
        }

        res.status(200).json({
            companies,
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong",
            success: false,
        });
    }
}

async function getCompanyById(req, res) {
    try {
        const companyId = req.params.companyId;
        const company = await Company.findOne({ _id: companyId });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong",
            success: false,
        });
    }
}

// TODO: add update company

module.exports = {
    register,
    getCompanies,
    getCompanyById
};
