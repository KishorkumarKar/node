"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentConfig = void 0;
exports.environmentConfig = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 8000,
    MONGODB_CONNECTION_STRING: process.env.CONNECTION_STRING,
};
exports.default = exports.environmentConfig;
