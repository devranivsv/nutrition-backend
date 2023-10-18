// Import Models
const { User } = require("../models");

// Import Utils
const { logger, crypto } = require("../utils");

// Function: Register User
async function registerUser(payload) {
  try {
    payload.password = crypto.generateHash(payload.password);
    const user = new User(payload);
    await user.save();

    logger.info(`Email: ${payload.email} | Name: ${payload.name}`);

    return user;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

// Function: Login User
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

// Function: Check Email Exists
async function checkEmailExists(email) {
  try {
    let emailExists = false;
    const user = await User.findOne({ email });
    if (user) emailExists = true;

    return emailExists;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

module.exports = {
  registerUser,
  getUserByEmail,
  checkEmailExists,
};
