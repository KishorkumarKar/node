"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || res.statusCode || 500;
    res.status(status);
    res.json({
        title: "error message",
        message: error.message,
        stackTrace: error.stack,
    });
};
exports.default = errorHandler;
