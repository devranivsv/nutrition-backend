// Import Models
const { UserFood, Food } = require("../models");

// Import Utils
const { logger } = require("../utils");

// Function: Save User Food
async function saveUserFood(userID, userFood) {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const foodObj of userFood.foods) {
      // eslint-disable-next-line no-await-in-loop
      const food = await Food.findOne({ _id: foodObj.foodID, userID });
      foodObj.name = food.name;
      foodObj.amount = foodObj.unit * food.price;
    }

    const response = await UserFood.create({
      userID,
      ...userFood,
    });

    logger.info("User Food Save Successfully");
    return {
      hasError: false,
      data: response,
    };
  } catch (err) {
    logger.error(err);
    return {
      hasError: true,
      message: err,
    };
  }
}

module.exports = {
  saveUserFood,
};
