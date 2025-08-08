const logger = require("../utils/logger.utility");

const commonLoggerForRequest = async (req, res, next) => {
  const date = new Date().toString();
  console.log(date);
  logger.info(`Request data time:- ${date} IP:- ${req.ip} url:- ${req.url}`);
  next();
};

module.exports = commonLoggerForRequest;
