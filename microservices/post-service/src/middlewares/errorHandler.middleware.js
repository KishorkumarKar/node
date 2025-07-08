const logger = require("../utils/logger.utils");
const errorHandler = async (err, req, res, next) => {
  logger.error(err);
  const status = err.statusCode || res.statusCode || 500;
  const message = err.message || "internal Error";
  res.status(status).json({ message: message, status: false });
};

module.exports = errorHandler;
