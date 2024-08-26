const zod = require("zod");
const { Company } = require("../db/index");
const { getDataUri } = require("../utils/getDataUri");
const { cloudinary } = require("../utils/cloudinary");

async function register(req, res) {
  try {
    const { name, description, location } = req.body;
    const registeredBy = req.userId;
    const file = req.file;

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

    if (!inputValidationResult.success || !file) {
      return res.status(400).json({
        message: "Missing or wrong inputs provided",
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

    // TODO: logo cloudinary
    const fileUri = getDataUri(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      fileUri.content,
      {
        resource_type: "auto",
      }
    );

    await Company.create({
      name,
      description,
      location,
      registeredBy,
      logo: cloudinaryResponse.secure_url,
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
        success: false,
      });
    }
    res.status(200).json({
      company,
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

async function updateCompanyDetails(req, res) {
  try {
    const id = req.params.id;
    const { name, description, website, location } = req.body;
    const file = req.file;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        message: "No company found",
        success: false,
      });
    }

    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudinaryResponse = await cloudinary.uploader.upload(
        fileUri.content,
        {
          resource_type: "auto",
        }
      );

      if (cloudinaryResponse) {
        company.logo = cloudinaryResponse.secure_url;
      }
    }
    await company.save();

    res.status(200).json({
      company,
      message: "Details updated",
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

module.exports = {
  register,
  getCompanies,
  getCompanyById,
  updateCompanyDetails,
};
