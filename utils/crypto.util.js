// Import Dependecies
const crypto = require("crypto");

// Import Utils
const logger = require("./logger.util");

// function: Generate Hash
function generateHash(text, salt = crypto.randomBytes(32).toString("hex")) {
  try {
    // Password Encryption
    const generatedHash = crypto.pbkdf2Sync(text, salt, 1000, 64, "sha512").toString("hex");
    return { salt, hash: generatedHash };
  } catch (err) {
    logger.error("Error", err);
    return {};
  }
}

// Function: Validate Hash
function validateHash(text, hash, salt) {
  try {
    const { hash: generatedHash } = generateHash(text, salt);
    const isHashValid = generatedHash === hash;
    return isHashValid;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

module.exports = {
  generateHash,
  validateHash,
};
