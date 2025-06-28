"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSchema = {
    loginUser: joi_1.default.object({
        email: joi_1.default.string().email().required().messages({
            "string.email": "Please enter valid Email",
            "string.empty": "Email is required",
            "string.any": "Email not provider",
        }),
        password: joi_1.default.string().required().messages({
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),
    }),
    registerUser: joi_1.default.object({
        first_name: joi_1.default.string().required().messages({
            "string.empty": "First Name is required",
            "string.any": "First Name not provider",
        }),
        last_name: joi_1.default.string().required().messages({
            "string.empty": "Last Name is required",
            "string.any": "Last Name not provider",
        }),
        email: joi_1.default.string().email().required().messages({
            "string.email": "Please enter valid Email",
            "string.empty": "Email is required",
            "string.any": "Email not provider",
        }),
        password: joi_1.default.string().required().min(6).max(12).messages({
            "string.min": "Password Minimum 6 character required",
            "string.max": "Maximum 12 character allowed",
            "any.required": "Password is required",
        }),
        confirm_password: joi_1.default.any().valid(joi_1.default.ref("password")).required().messages({
            "string.empty": "Confirm Password is required",
            "any.required": "Confirm Password must match password",
        }),
        age: joi_1.default.number().strict().messages({
            "string.empty": "Age Should be number",
        }),
    }),
};
exports.default = userSchema;
