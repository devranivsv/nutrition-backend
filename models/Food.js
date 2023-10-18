const mongoose = require("mongoose");

// Schema for Food
const FoodSchema = new mongoose.Schema(
  {
    userID: String,
    name: String,
    unit: String,
    weight: Number,
    calories: Number,
    protien: Number,
    carb: Number,
    fat: Number,
    fibre: Number,
    price: Number,
  },
  {
    timestamps: true,
  },
);

// Model for Food
const Food = mongoose.model("Food", FoodSchema, "foods");

module.exports = { Food };
