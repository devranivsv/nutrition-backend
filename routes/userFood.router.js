// Import Router
const router = require("express").Router();

// Import Controller
const { userFoodController } = require("../controllers");

// Import Middleware
const { authMiddleware } = require("../middlewares");

router.post("/save", authMiddleware.verifyToken, userFoodController.saveUserFood);

module.exports = router;
