// Import Models
const { Food } = require("../models");

// Import Utils
const { logger, helpers } = require("../utils");

// Function: Save Food
async function saveFood(payload) {
  try {
    const food = new Food(payload);
    await food.save();

    logger.info(`Food ${food.name} with ID ${food._id} Saved Successfully`);
    return food;
  } catch (err) {
    logger.error(err);
    return false;
  }
} 

// Function: Get Foods
async function getFoods({ userID, pageNumber = 1, pageSize = 10 }) {
  try {
    logger.info(`UserID: ${userID} | PageNumber: ${pageNumber} | PageSize: ${pageSize}`);

    const foods = await Food.find({ userID })
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize);

    logger.info(`${foods.length} Foods Retrieved`);

    return foods;
  } catch (err) {
    logger.error(err);
    return [];
  }
}

// Function: Get Food
async function getFood(userID, foodID) {
  try {
    logger.info(`UserID: ${userID} | FoodID: ${foodID}`);

    const food = await Food.findOne({ _id: foodID, userID });
    return food;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

// Function: Update Food
async function updateFood(payload) {
  try {
    const { userID, foodID, ...food } = payload;
    const updatedFood = await Food.findOneAndUpdate(
      { _id: foodID, userID },
      { $set: helpers.convertToDotNotation(food) },
      { new: true },
    );
    return updatedFood;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

// Function: Delete Food
async function deleteFood(foodID) {
  try {
    await Food.findByIdAndDelete(foodID);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

module.exports = {
  saveFood,
  getFoods,
  getFood,
  updateFood,
  deleteFood,
};
