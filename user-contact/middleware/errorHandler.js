const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log("----ERROR MESSAGE----",err.message,statusCode);
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.BCRYPT_ERROR:
      res.json({
        title: "Bcrypt Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.MONGOOSE_ERROR:
      res.json({
        title: "Mongoose Error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      console.log("No Error, All good !---");
      break;
  }
};

module.exports = errorHandler;
