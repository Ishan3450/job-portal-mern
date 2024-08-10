const mongoose = require("mongoose");

const jobApplicationSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("jobapplication", jobApplicationSchema);