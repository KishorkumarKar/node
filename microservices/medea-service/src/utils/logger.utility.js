const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(
      winston.format.simple(),
      winston.format.json(),
      winston.format.colorize(),
    ),
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({
      filename: "./log/error.log",
      level: "error",
    }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: "./log/combined.log" }),
  ],
});

module.exports = logger;
