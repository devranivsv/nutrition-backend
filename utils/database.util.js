require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("./logger.util");

function mongooseConnection() {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      logger.info("Connected to Database");
    }).catch((err) => {
      logger.error(err);
    });
}

module.exports = { mongooseConnection };
