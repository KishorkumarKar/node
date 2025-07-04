const express = require("express");
const env = require("dotenv");
const proxy = require("express-http-proxy");
env.config();
const logger = require("./utils/logger.utils");
const errorHandler = require("./middleware/errorHandler.middleware");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
//middleware

const proxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: function (err, res, next) {
    // logger.error("proxyErrorHandler:- " + err.message); // this will not print the stack
    logger.error(`proxyErrorHandler:- ${err}`); // to print the stack
    res.status(400).json({
      message: err.message || `Internal server error`,
      success: false,
    });
  },
};

app.use(
  "/v1/users/",
  proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from Identity service: ${proxyRes.statusCode}`,
      );
      return proxyResData;
    },
  }),
);

app.get("/", (req, res) => res.send("Hello API-Gateway!"));
app.use(errorHandler);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
