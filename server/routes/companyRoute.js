const { Router } = require("express");
const {
    register,
    getCompanies,
    getCompanyById,
} = require("../controllers/companyController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isRecruiter = require("../middlewares/isRecruiter");

const companyRouter = Router();

companyRouter.use(isLoggedIn);
companyRouter.use(isRecruiter);

companyRouter.post("/registerCompany", register);
companyRouter.get("/companies", getCompanies);
companyRouter.get("/:companyId", getCompanyById);

module.exports = companyRouter;
