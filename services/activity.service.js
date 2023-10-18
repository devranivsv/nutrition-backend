// Import Models
const { Activity } = require("../models");

// Import Utilities
const { logger, helpers } = require("../utils");

// Function: Save Activity
async function saveActivity(payload) {
  try {
    const activity = new Activity(payload);
    await activity.save();

    logger.info(`Activity ${activity.name} with ID ${activity._id} Saved Successfully`);
    return activity;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

// Function: Get Activities
async function getActivities({ userID, pageNumber = 1, pageSize = 10 }) {
  try {
    logger.info(`UserID: ${userID} | PageNumber: ${pageNumber} | PageSize: ${pageSize}`);

    const activities = await Activity.find({ userID })
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize);

    logger.info(`${activities.length} Activities Retrieved`);

    return activities;
  } catch (err) {
    logger.error(err);
    return [];
  }
}

// Function: Get Activity
async function getActivity(userID, activityID) {
  try {
    logger.info(`UserID: ${userID} | ActivityID: ${activityID}`);

    const activity = await Activity.findOne({ _id: activityID, userID });
    return activity;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

// Function: Update Activity
async function updateActivity(payload) {
  try {
    const { userID, activityID, ...activity } = payload;
    const updatedActivity = await Activity.findByIdAndUpdate(
      { _id: activityID, userID},
      { $set: helpers.convertToDotNotation(activity) },
      { new: true },
    );
    return updatedActivity;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

// Function: Delete Activity
async function deleteActivity(activityID) {
  try {
    await Activity.findByIdAndDelete(activityID);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

module.exports = {
  saveActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
};