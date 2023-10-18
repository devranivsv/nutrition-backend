// Import Models
const { UserActivity, Activity } = require("../models");

// Import Utils
const { logger } = require("../utils");

// Function: Save User Activity
async function saveUserActivity(userID, userActivity) {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const activityObj of userActivity.activities) {
      // eslint-disable-next-line no-await-in-loop
      const activity = await Activity.findOne({ _id: activityObj.activityID, userID });
      activityObj.name = activity.name;
    }

    const response = await UserActivity.create({
      userID,
      ...userActivity,
    });

    logger.info("User Activity Save Successfully");
    return {
      hasError: false,
      data: response,
    };
  } catch (err) {
    logger.error(err);
    return {
      hasError: true,
      message: err,
    }
  }
}

// Function: Get User Activities
async function getUserActivities() {
  try {
    const userActivities = await UserActivity.find();
    return {
      hasError: false,
      data: userActivities,
    }
  } catch (err) {
    logger.error(err);
    return {
      hasError: true,
      message: err,
    }
  }
}

module.exports = {
  saveUserActivity,
  getUserActivities,
};
