const { Router } = require("express");
const {
  register,
  getCompanies,
  getCompanyById,
  updateCompanyDetails,
} = require("../controllers/companyController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isRecruiter = require("../middlewares/isRecruiter");
const { singleUpload } = require("../middlewares/multer");

const companyRouter = Router();

companyRouter.use(isLoggedIn);
companyRouter.use(isRecruiter);

companyRouter.post("/registerCompany", singleUpload, register);
companyRouter.get("/getAll", getCompanies);
companyRouter.get("/get/:companyId", getCompanyById);
companyRouter.put("/update/:id", singleUpload, updateCompanyDetails);

module.exports = companyRouter;
