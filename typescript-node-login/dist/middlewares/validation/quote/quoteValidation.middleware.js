"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductValidation = void 0;
const quoteSchema_middleware_1 = __importDefault(require("./quoteSchema.middleware"));
const addProductValidation = (req, res, next) => {
    const body = req.body;
    const { error } = quoteSchema_middleware_1.default.addProduct.validate(body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    else {
        next();
    }
};
exports.addProductValidation = addProductValidation;
