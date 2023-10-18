const mongoose = require("mongoose");

// Schema For UserFood
const UserFoodSchema = new mongoose.Schema(
  {
    date: String,
    userID: String,
    foods: [{
      foodID: String,
      name: String,
      unit: Number,
      amount: Number,
    }],
  },
  {
    timestamps: true,
  },
);

// Model For UserFood
const UserFood = mongoose.model("UserFood", UserFoodSchema, "userFoods");

module.exports = { UserFood };
