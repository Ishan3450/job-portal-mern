const { Router } = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isRecruiter = require("../middlewares/isRecruiter");
const {
  postJob,
  getJobsBasedOnKeyword,
  getJobById,
  getRecruiterJobs,
  updateJobDetails,
} = require("../controllers/jobController");
const jobApplicationRouter = require("../routes/jobApplicationRoute");

const jobRouter = Router();

jobRouter.get("/getJobs", getJobsBasedOnKeyword);

jobRouter.use(isLoggedIn);

jobRouter.post("/postJob", isRecruiter, postJob);
jobRouter.get("/get/:jobId", getJobById);
jobRouter.get("/getRecruiterJobs", isRecruiter, getRecruiterJobs);
jobRouter.put("/update/:jobId", isRecruiter, updateJobDetails);

// another router
jobRouter.use("/applications", jobApplicationRouter);

module.exports = jobRouter;
