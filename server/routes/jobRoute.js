const { Router } = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isRecruiter = require("../middlewares/isRecruiter");
const { postJob, getJobsBasedOnKeyword, getJobById, getRecruiterJobs } = require("../controllers/jobController");

const jobRouter = Router();

jobRouter.use(isLoggedIn);

jobRouter.post("/postJob", isRecruiter, postJob);
jobRouter.get("/getJobs", getJobsBasedOnKeyword);
jobRouter.get("/get/:jobId", getJobById);
jobRouter.get("/getRecruiterJobs", isRecruiter, getRecruiterJobs);

module.exports = jobRouter;