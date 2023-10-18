// Import Router
const router = require("express").Router();

// Import Controller
const { userActivityController } = require("../controllers");

// Import Middleware
const { authMiddleware } = require("../middlewares");

// ROUTE: Save User Activity
router.post("/save", authMiddleware.verifyToken, userActivityController.saveUserActivity);

// ROUTE: Get User Activity
router.post("/all", authMiddleware.verifyToken, userActivityController.getUserActivities);

module.exports = router;
