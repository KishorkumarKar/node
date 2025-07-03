const logger = require("../utils/logger.utils");

const errorHandler = async (error, req, res, next) => {
  console.log("-----",res.statusCode,error?.status)
  logger.error("errorHandler:- ", error);
  res
    .status(error?.statusCode || res?.statusCode ||  500)
    .json({ message: error.message || "internal Server Error" });
};
module.exports = errorHandler;
