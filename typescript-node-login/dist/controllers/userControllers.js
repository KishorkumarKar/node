"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const error_constant_1 = require("../constants/error.constant");
// const Joi = require("joi");
const asyncHandler = require("express-async-handler");
//----------Remove this to middleware------
/* const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false); // 👈 Disallow unknown (extra) keys */
//----------Remove this to middleware------
const registerUser = asyncHandler(async (req, res) => {
    //----------Remove this to middleware------
    /*     let userData: IUser = req.body;
    const { error } = userSchema.validate(userData);
    console.log(error);
    if (error) {
      throw new Error(error.details[0].message);
    } else {
      res.json(req.body);
    } */
    //----------Remove this to middleware------
    try {
        //has code
        // const hashedPassword = await createToken(password);
        // console.log("Hashed Password: ", hashedPassword);
        const user = await user_model_1.default.create(req.body);
        console.log(`User created ${user}`);
        if (user) {
            return res
                .status(error_constant_1.STATUS.NEW_DATA_CREATED)
                .json({ _id: user.id, email: user.email });
        }
        else {
            res.status(error_constant_1.STATUS.VALIDATION_ERROR);
            throw new Error("User data is not valid");
        }
    }
    catch (error) {
        res.status(error_constant_1.STATUS.BCRYPT_ERROR);
        throw new Error(error.message);
    }
});
exports.registerUser = registerUser;
const loginUser = asyncHandler(async (req, res) => {
    try {
        const userData = req.body;
        const user = await user_model_1.default.findOne({ email: userData.email });
        res.json(user);
    }
    catch (error) {
        res.status(error_constant_1.STATUS.BCRYPT_ERROR);
        throw new Error(error.message);
    }
});
exports.loginUser = loginUser;
