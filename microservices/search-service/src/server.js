const env = require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./utils/logger.utils");
const { getConnection } = require("./utils/rabbitMq.utils");
const errorHandler = require("./middleware/errorHandler");
const searchRoute = require("./routers/search.route");
const consumer = require("./consumer/index.consumer");
const connectDB = require("./config/mongoose.config");
const app = express();
const port = process.env.PORT || 3000;

connectDB();

//middleWare
cors();
helmet();
app.use(express.json());
//middleWare

//route
app.use("/api/search", searchRoute);

//error handler
app.use(errorHandler);

startServer = () => {
  try {
    getConnection();
    consumer();
    app.get("/", (req, res) => res.send("Hello World!"));
    app.listen(port, () =>
      logger.info(`Example app listening on port ${port}!`),
    );
  } catch (error) {
    logger.error(error);
  }
};

startServer();

//unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at", promise, "reason:", reason);
});
