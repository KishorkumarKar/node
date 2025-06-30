const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const connectDB = require("./configs/mongoose.config");
const customLogger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");
const userRouter = require("./routes/user.router");
connectDB();
const port = process.env.PORT || 3000;

app.use(errorHandler);
app.use(customLogger);

app.use(express.json());
app.use("/api/users/", userRouter);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
