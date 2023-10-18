// Import Router
const router = require("express").Router();

// Import Controller
const { userController } = require("../controllers");

// ROUTE: Register User
router.post("/register", userController.registerUser);

// ROUTE: Login User
router.post("/login", userController.loginUser);

module.exports = router;
