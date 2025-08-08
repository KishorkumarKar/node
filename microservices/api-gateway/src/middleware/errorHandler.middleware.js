const logger = require("../utils/logger.utils");
const errorHandler = async (error, req, res, next) => {
  const status = res.statusCode || error.statusCode || 500;
  const message = error.message || "Internal server error";
  logger.error(`errorHandler:- ${message}`);
  return res.status(status).json({
    success: false,
    message: message,
  });
};

module.exports = errorHandler;
