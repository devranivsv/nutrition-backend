const mongoose = require("mongoose");

// Schema for Users
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: { salt: String, hash: String },
    age: Number,
    country: String,
    weight: Number,
  },
  {
    timestamps: true,
  },
);

// Model for Users
const User = mongoose.model("User", UserSchema, "users");

module.exports = { User };
