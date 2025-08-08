const logger = require("../utils/logger.utils");
const customLogger = async (req, res, next) => {
  console.log("---------");
  const currentDate = new Date();
  logger.info(
    `log request info ip :- ${req.ip} method:- ${req.method} path:- ${req.url}`,
  );
  next();
};

module.exports = customLogger;
