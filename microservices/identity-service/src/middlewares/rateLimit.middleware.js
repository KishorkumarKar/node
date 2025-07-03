const { rateLimit } = require("express-rate-limit");
const logger = require("../utils/logger.utils");

const manageRateLimit = (
  time = 15 * 60 * 1000,
  limit = 100,
  message = "Too many requests, please try again later.",
) => {
  logger.info(`rate-limit:- ${time} ${limit} `); // this log will be printer when app is loaded only once
  const limiter = rateLimit({
    windowMs: time, // 15 minutes
    limit: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  });

  return (req, res, next) => {
    logger.info(`rate-limit middleware:- ${time} ${limit} `); // this will be called every time as a
    limiter(req, res, next);
  };
};

module.exports = manageRateLimit;
