// Import Router
const router = require("express").Router();

// Import Controller
const { foodController } = require("../controllers");

// Import Middleware
const { authMiddleware } = require("../middlewares");

// ROUTE: Save Food
router.post("/save", authMiddleware.verifyToken, foodController.saveFood);

// ROUTE: Get Foods
router.post("/all", authMiddleware.verifyToken, foodController.getFoods);

// ROUTE: Get Food
router.post("/get", authMiddleware.verifyToken, foodController.getFood);

// ROUTE: Update Food
router.post("/update", authMiddleware.verifyToken, foodController.updateFood);

// ROUTE: Delete Food
router.post("/delete", authMiddleware.verifyToken, foodController.deleteFood);

module.exports = router;
