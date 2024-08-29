const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    registeredBy: {
      // id of the person who registered the company on the job hunt portal
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("company", companySchema);
