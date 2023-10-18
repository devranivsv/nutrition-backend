// Import Router
const router = require("express").Router();

// Import Controller
const { activityController } = require("../controllers");

// Import Middleware
const { authMiddleware } = require("../middlewares");

// ROUTE: Save Activity
router.post("/save", authMiddleware.verifyToken, activityController.saveActivity);

// ROUTE: Get Activities
router.post("/all", authMiddleware.verifyToken, activityController.getActivities);

// ROUTE: Get Activity
router.post("/get", authMiddleware.verifyToken, activityController.getActivity);

// ROUTE: Update Activity
router.post("/update", authMiddleware.verifyToken, activityController.updateActivity);

// ROUTE: Delete Activity
router.post("/delete", authMiddleware.verifyToken, activityController.deleteActivity);

module.exports = router;

