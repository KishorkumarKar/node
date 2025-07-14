const logger = require("../utils/logger.utility");

const errorHandler = async (err, req, res, next) => {
  logger.error(err);
  const status = err.statusCode || res.statusCode || 500;
  const message = err.message || "internal Error";
  res.status(status).json({
    success: false,
    message: message,
  });
};
module.exports = errorHandler;
