const env = require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const mongoose = require("./config/mongoose.config");
mongoose();
const logger = require("./utils/logger.utils");
const postRouter = require("./routes/post.router");
//middle ware
app.use(express.json());
app.use(helmet());
app.use(cors());
//middle ware

const port = process.env.PORT || 3005;

app.get("/", (req, res) => res.send("Hello POST SERVICE!"));
app.use("/api/post/", postRouter);
app.listen(port, () => logger.info(`Example app listening on port ${port}!`));

//unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at", promise, "reason:", reason);
});
