const { Job, JobApplication, User } = require("../db/index");
const zod = require("zod")

// for candidate
async function applyJob(req, res) {
    try {
        const userId = req.userId;
        const jobId = req.params.jobId;

        const isJobExists = await Job.findOne({ _id: jobId });
        if (!isJobExists) {
            return res.status(400).json({
                message: "No job found this id",
                success: false
            })
        }

        const isApplicationAlreadyExists = await JobApplication.findOne({ job: jobId, applicant: userId });
        if (isApplicationAlreadyExists) {
            return res.status(400).json({
                message: "Already applied",
                success: false
            })
        }

        const newApplication = await JobApplication.create({
            job: jobId,
            applicant: userId
        })

        await Job.updateOne({ _id: jobId }, { $push: { applicants: newApplication._id } });
        await User.updateOne({_id: userId}, {$push: { "profile.companiesApplied": newApplication._id}})
        res.status(201).json({
            message: "Application received",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong",
            success: false
        })
    }
}

// for candidate
async function getAppliedJobs(req, res) {
    try {
        const userId = req.userId;
        const appliedJobs = await JobApplication.find({ applicant: userId }).populate({
            path: "job",
            populate: {
                path: "company"
            }
        });

        if (!appliedJobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        }

        res.status(200).json({
            appliedJobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong",
            success: false
        })
    }
}

// for recruiter
// will fetch all the applicants applied to a job based on jobid
async function getApplicants(req, res) {
    try {
        const jobId = req.params.jobId;
        const job = await Job.find({ _id: jobId }).populate({
            path: "applicants",
            populate: {
                path: "applicant"
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "No job found with this id",
                success: false
            })
        }
        res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong",
            success: false
        })
    }
}

// for recruiter
async function updateStatus(req, res) {
    try {
        const applicationId = req.params.applicationId;
        const { status } = req.body;

        const validStatusZodSchema = zod.object({
            status: zod.enum(["accepted", "rejected", "pending"])
        })
        const validStatusRes = validStatusZodSchema.safeParse({ status });

        if (!validStatusRes.success) {
            return res.status(400).json({
                message: "Invalid status",
                success: false
            })
        }

        const updateOperation = await JobApplication.updateOne({ _id: applicationId }, { status });
        if (!updateOperation.acknowledged) {
            return res.status(400).json({
                message: "Status not updated",
                success: false
            })
        }
        res.status(200).json({
            message: "Status updated",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Something went wrong",
            success: false
        })
    }
}

module.exports = {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
}