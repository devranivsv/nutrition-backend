// Import Dependencies
const jwt = require("jsonwebtoken");

// Import Utils
const logger = require("./logger.util");

// Function: Generate JWT Token
function generateJwtToken(payload) {
  try {
    const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return token;
  } catch (err) {
    logger.error("Error", err);
    return false;
  }
}

module.exports = {
  generateJwtToken,
};
