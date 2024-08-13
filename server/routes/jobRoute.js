const { Router } = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isRecruiter = require("../middlewares/isRecruiter");
const { postJob, getJobsBasedOnKeyword, getJobById, getRecruiterJobs } = require("../controllers/jobController");
const jobApplicationRouter = require("../routes/jobApplicationRoute");

const jobRouter = Router();

jobRouter.use(isLoggedIn);

jobRouter.post("/postJob", isRecruiter, postJob);
jobRouter.get("/getJobs", getJobsBasedOnKeyword);
jobRouter.get("/get/:jobId", getJobById);
jobRouter.get("/getRecruiterJobs", isRecruiter, getRecruiterJobs);

// another router
jobRouter.use("/applications", jobApplicationRouter);

module.exports = jobRouter;