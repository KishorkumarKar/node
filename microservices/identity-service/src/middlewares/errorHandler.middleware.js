const logger = require("../utils/logger.utils");

const errorHandler = async (error, req, res, next) => {
  logger.error("errorHandler:- ", error);
  res
    .status(error?.status || 500)
    .json({ message: error.message || "internal Server Error" });
};
module.exports = errorHandler;
