const env = require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const mongoose = require("./config/mongoose.config");
mongoose();
const logger = require("./utils/logger.utils");
const postRouter = require("./routes/post.router");
const errorHandler = require("./middlewares/errorHandler.middleware");
// const mediaCreateConsumer = require("./consumers/mediaCreate.consumer");
const { getConnection } = require("./utils/rabbitMq.utils");
//middle ware
app.use(express.json());
app.use(helmet());
app.use(cors());
//middle ware

//consumer
// mediaCreateConsumer();
//consumer

const port = process.env.PORT || 3005;

app.get("/", (req, res) => res.send("Hello POST SERVICE!"));
app.use("/api/post/", postRouter);
app.use(errorHandler);
runServer = () => {
  try {
    getConnection();
    app.listen(port, () =>
      logger.info(`Example app listening on port ${port}!`),
    );
  } catch (error) {
    logger.info(error);
  }
};
runServer();

//unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at", promise, "reason:", reason);
});
