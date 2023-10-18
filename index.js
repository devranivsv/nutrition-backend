require("dotenv").config();

// Import packages
const http = require("http");

// Import app
const { app } = require("./app");

// Import utilities
const { logger } = require("./utils");

const httpServer = http.createServer(app);

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  logger.info(`🚀 App Started: http://localhost:${port}`);
});
