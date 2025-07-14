const env = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/mongoose.config");
const helmet = require("helmet");
const cors = require("cors");
connectDB();
const media = require("./routes/media.routes");
const errorHandler = require("./middlewares/errorHandler.middleware");
const commonLoggerForRequest = require("./middlewares/commonLog.middleware");
const app = express();

//middle ware
app.use(helmet());
app.use(cors());
app.use(express.json());
//middle ware

const port = process.env.PORT || 3004;

app.use(commonLoggerForRequest);
app.use("/app/media", media);
app.get("/", (req, res) => res.send("media World!"));

app.use(errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
