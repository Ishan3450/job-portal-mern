const zod = require("zod");
const { Job } = require("../db/index");

async function postJob(req, res) {
  try {
    const {
      title,
      description,
      salary,
      location,
      jobType,
      positions,
      company,
      requirements,
      experience,
    } = req.body;
    const createdBy = req.userId;

    const postJobZodSchema = zod.object({
      title: zod.string().min(1),
      description: zod.string().min(1),
      salary: zod.number().min(1),
      location: zod.string().min(1),
      jobType: zod.string().min(1),
      positions: zod.number().min(1),
      company: zod.string().min(1),
      requirements: zod.string().min(1),
      experience: zod.number().min(0),
    });

    const validationResponse = postJobZodSchema.safeParse({
      title,
      description,
      salary,
      location,
      jobType,
      positions,
      company,
      requirements,
      experience,
    });

    if (!validationResponse.success) {
      return res.status(400).json({
        message: "Invalid inputs provided",
        success: false,
      });
    }

    await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      positions,
      company,
      createdBy,
      experience,
    });

    res.status(201).json({
      message: "Job posted",
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

// will fetch all the jobs based on the keyword passed as query param
async function getJobsBasedOnKeyword(req, res) {
  try {
    const keyword = req.query.keyword || "";
    const jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate("company")
      .populate("createdBy")
      .populate("applicants");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found with corresponding keyword",
        success: false,
      });
    }

    res.status(200).json({
      jobs,
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

async function getJobById(req, res) {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findOne({ _id: jobId })
      .populate("company")
      .populate("createdBy")
      .populate("applicants", "applicant -_id"); // excluding _id because mongoose will by default add it

    if (!job) {
      return res.status(404).json({
        message: "No job found with corresponding id",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
}

async function getRecruiterJobs(req, res) {
  try {
    const recruiterId = req.userId;
    const jobs = await Job.find({ createdBy: recruiterId });

    if (!jobs) {
      return res.status(404).json({
        message: "Recruiter has no job posts",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
}

module.exports = {
  postJob,
  getJobsBasedOnKeyword,
  getJobById,
  getRecruiterJobs,
};
