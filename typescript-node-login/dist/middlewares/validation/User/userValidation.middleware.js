"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterValidation = exports.userLoginValidation = void 0;
const userSchema_middleware_1 = __importDefault(require("./userSchema.middleware"));
const userLoginValidation = (req, res, next) => {
    let userData = req.body;
    const { error } = userSchema_middleware_1.default.loginUser.validate(userData);
    console.log("error:-", error);
    if (error) {
        throw new Error(error.details[0].message);
    }
    else {
        // res.json(req.body);    IF this is added the it will not go to controller
        next();
    }
};
exports.userLoginValidation = userLoginValidation;
const userRegisterValidation = (req, res, next) => {
    let userData = req.body;
    const { error } = userSchema_middleware_1.default.registerUser.validate(userData);
    console.log("error:-", error);
    if (error) {
        throw new Error(error.details[0].message);
    }
    else {
        // res.json(req.body);    IF this is added the it will not go to controller
        next();
    }
};
exports.userRegisterValidation = userRegisterValidation;
