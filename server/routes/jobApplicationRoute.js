const { Router } = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isRecruiter = require("../middlewares/isRecruiter");
const { applyJob, getApplicants, getAppliedJobs, updateStatus } = require("../controllers/jobApplicationController");

const jobApplicationRouter = Router();

jobApplicationRouter.post("/apply/:jobId", applyJob);
jobApplicationRouter.get("/get/applied", getAppliedJobs);
jobApplicationRouter.get("/:jobId/applicants", isRecruiter, getApplicants);
jobApplicationRouter.put("/updateStatus/:applicationId", isRecruiter, updateStatus);

module.exports = jobApplicationRouter;
