const mongoose = require("mongoose");

// Schema for activity
const ActivitySchema = new mongoose.Schema(
  {
    name: String,
    met: Number,
  },
  {
    timestamps: true,
  },
);

// Model for Activity
const Activity = mongoose.model("Activity", ActivitySchema, "activities");

module.exports = { Activity };
