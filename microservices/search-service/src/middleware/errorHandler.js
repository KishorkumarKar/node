const logger = require("../utils/logger.utils");

const errorHandler = (err, req, res, next) => {
  const status = err?.status || req?.statusCode || 500;
  const message = err?.message || "internal Error";
  logger.error(err);
  console.log("====", status);

  return res.status(500).json({
    success: false,
    message: message,
  });
};

module.exports = errorHandler;
