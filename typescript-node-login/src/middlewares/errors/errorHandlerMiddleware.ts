import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status);
  res.json({
    title: "error message",
    message: error.message,
    stackTrace: error.stack,
  });
};

export default errorHandler;
