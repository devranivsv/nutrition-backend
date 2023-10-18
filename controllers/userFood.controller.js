// Import Services
const { userFoodService } = require("../services");

// Import Utils
const { logger } = require("../utils");

// Import config
const { responseMessages } = require("../config");

// Controller: Save User Food
const saveUserFood = async (req, res) => {
  try {
    const requestData = req.body;
    const userID = req.user._id;
    const userFood = await userFoodService.saveUserFood(userID, requestData);
    return res.status(200).send({
      hasError: false,
      data: userFood,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = {
  saveUserFood,
};
