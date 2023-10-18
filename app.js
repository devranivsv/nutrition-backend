// Import packages
const express = require("express");
const cors = require("cors");

// Import utilities
const { database } = require("./utils");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize database connection
database.mongooseConnection();

// START: Routes
const { userRouter, foodRouter, activityRouter, userFoodRouter, userActivityRouter } = require("./routes");

app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/activity", activityRouter);
app.use("/userFood", userFoodRouter);
app.use("/userActivity", userActivityRouter);
// END: Routes

module.exports = { app };
