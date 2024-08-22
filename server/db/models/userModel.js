const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
    },
    profile: {
      bio: { type: String },
      skills: { type: String },
      resumeUrl: { type: String },
      companiesApplied: [
        { type: mongoose.Schema.Types.ObjectId, ref: "company" },
      ],
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model('user', userSchema);
