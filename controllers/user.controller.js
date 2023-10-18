// Import services
const { userService } = require("../services");

// Import utilities
const { logger, jwt, crypto } = require("../utils");

// Import config
const { responseMessages } = require("../config");

// Controller: Register User
const registerUser = async (req, res) => {
  try {
    const requestData = req.body;
    if (await userService.checkEmailExists(requestData.email)) {
      logger.error("Email Already Exists");
      return res.status(200).send({
        hasError: true,
        message: responseMessages.EMAIL_EXISTS,
      });
    }

    // Save User
    const user = await userService.registerUser(requestData);
    return res.status(200).send({
      hasError: false,
      data: user,
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      hasError: true,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

// Controller: Login User
const loginUser = async (req, res) => {
  try {
    const userCredential = req.body;
    const user = await userService.getUserByEmail(userCredential.email);
    if (!user) {
      logger.info("User Not Found!");
      return res.status(200).send({
        hasError: false,
        data: responseMessages.USER_NOT_FOUND,
      });
    }

    // Validate Hash
    const isHashValid = crypto.validateHash(
      userCredential.password,
      user.password.hash,
      user.password.salt,
    );
    if (!isHashValid) {
      logger.error("Incorrect Password");
      return res.status(400).send({
        hasError: true,
        message: responseMessages.INCORRECT_PASSWORD,
      });
    }

    // Generate JWT Token
    const jwtToken = jwt.generateJwtToken({ email: userCredential.email });
    logger.info("User Logged In");
    return res.status(200).send({
      hasError: false,
      data: { token: jwtToken },
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
  registerUser,
  loginUser,
};
