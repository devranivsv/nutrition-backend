// Import Services
const { foodService } = require("../services");

// Import Utilities
const { logger } = require("../utils");

// Import Config
const { responseMessages } = require("../config");

// Controller: Save Food
const saveFood = async (req, res) => {
  try {
    const requestData = req.body;
    const userID = req.user._id;
    requestData.userID = userID;
    const food = await foodService.saveFood(requestData);
    return res.status(200).send({
      hasError: false,
      data: food,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

// Controller: Get Food
const getFood = async (req, res) => {
  try {
    const { foodID } = req.body;
    const userID = req.user._id;

    logger.info(`UserID: ${userID} | FoodID: ${foodID}`);

    const food = await foodService.getFood(userID, foodID);
    return res.status(200).send({
      hasError: false,
      data: food,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

// Controller: Get Foods
const getFoods = async (req, res) => {
  try {
    const requestData = req.body;
    const userID = req.user._id;

    logger.info(`UserID: ${userID} | PageNumber: ${requestData.pageNumber} | PageSize: ${requestData.pageSize}`);

    const foods = await foodService.getFoods({ userID, ...requestData });
    return res.status(200).send({
      hasError: false,
      data: foods,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

// Controller: Update Food
const updateFood = async (req, res) => {
  try {
    const requestData = req.body;
    const userID = req.user._id;
    const updatedFood = await foodService.updateFood({ userID, ...requestData });
    return res.status(200).send({
      hasError: false,
      data: updatedFood,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

// Controller: Delete Food
const deleteFood = async (req, res) => {
  try {
    const { foodID } = req.body;
    await foodService.deleteFood(foodID);
    return res.status(200).send({
      hasError: false,
      message: responseMessages.FOOD_DELETED,
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
  saveFood,
  getFoods,
  getFood,
  updateFood,
  deleteFood,
};
