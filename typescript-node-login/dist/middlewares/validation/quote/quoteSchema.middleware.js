"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const quoteSchema = {
    addProduct: joi_1.default.object({
        qty: joi_1.default.number().integer().required().messages({
            'required': 'Qty is required...',
            'number.base': 'Qty Integer number is required',
            'number.integer': 'Qty Integer number is required.',
        }),
        sku: joi_1.default.string().messages({
            "string.base": "Sku not provided",
            "string.empty": "Sku is required",
        })
    }),
};
exports.default = quoteSchema;
