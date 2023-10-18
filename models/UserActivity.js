const mongoose = require("mongoose");

// Schema For UserActivity
const UserActivitySchema = new mongoose.Schema(
  {
    data: String,
    userID: String,
    activities: [{
      activityID: String,
      name: String,
      time: Number,
      unit: String
    }],
  },
  {
    timestamps: true,
  },
);

// Model For UserActivity
const UserActivity = mongoose.model("UserActivity", UserActivitySchema, "userActivities");

module.exports = { UserActivity };