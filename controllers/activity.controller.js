// Import Services
const { activityService } = require("../services");

// Import Utilities
const { logger } = require("../utils");

// Import Config
const { responseMessages } = require("../config");

// Controller: Save Activity
const saveActivity = async (req, res) => {
  try {
    const requestData = req.body;
    const userID = req.user._id;
    requestData.userID = userID;
    const activity = await activityService.saveActivity(requestData);
    return res.status(200).send({
      hasError: false,
      data: activity,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

// Controller: Get All Activity
const getActivities = async (req, res) => {
  try {
    const requestData = req.body;
    const userID = req.user._id;

    logger.info(`UserId: ${usesrID} | PageNumber: ${requestData.pageNumber} | PageSize: ${requestData.pageSize}`);

    const activities = await activityService.getActivities({ userID, ...requestData});
    return res.status(200).send({
      hasError: false,
      data: activities,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
}

// Controller: Get Activity
const getActivity = async (req, res) => {
  try {
    const { activityID } = req.body;
    const userID = req.user._id;

    logger.info(`UserID: ${userID} | ActivityID: ${activityID}`);

    const activity = await activityService.getActivity(userID, activityID);
    return res.status(200).send({
      hasError: false,
      data: activity,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
}

// Controller: Update Activity
const updateActivity = async (req, res) => {
  try {
    const requestData = req.body;
    const userID = req.user._id;
    const updatedActivity = await activityService.updateActivity({ userID, ...requestData });
    return res.status(200).send({
      hasError: false,
      data: updatedActivity,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
}

// Controller: Delete Activity
const deleteActivity = async (req, res) => {
  try {
    const { activityID } = req.body;
    await activityService.deleteActivity(activityID);
    return res.status(200).send({
      hasError: false,
      message: responseMessages.ACTIVITY_DELETED,
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
  saveActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
};