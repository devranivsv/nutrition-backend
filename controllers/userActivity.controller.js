// Import Services
const { userActivityService } = require("../services");

// Import Utils
const { logger } = require("../utils");

// Import config
const { responseMessages } = require("../config");

// Controller: Save User Activity
const saveUserActivity = async (req, res) => {
  try {
    const requestData = req.body;
    const userID = req.user._id;
    const userActivity = await userActivityService.saveUserActivity(userID, requestData);
    return res.status(200).send({
      hasError: false,
      data: userActivity,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

// Controller: Get User Activities
const getUserActivities = async (req, res) => {
  try {
    const userActivities = await userActivityService.getUserActivities();
    return res.status(200).send({
      hasError: false,
      data: userActivities,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = {
  saveUserActivity,
  getUserActivities,
};
