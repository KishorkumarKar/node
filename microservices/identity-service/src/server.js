const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
dotenv.config();
const app = express();
const connectDB = require("./configs/mongoose.config");
const customLogger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");
const rateLimit = require("./middlewares/rateLimit.middleware");
const userRouter = require("./routes/user.router");
connectDB();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(rateLimit());
app.use(customLogger);

app.use(express.json());
app.use(
  "/api/users/",
  rateLimit(60 * 1000, 30, "TO many request for register"),
  userRouter,
);
app.get("/", (req, res) => res.send("Hello World!"));
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
