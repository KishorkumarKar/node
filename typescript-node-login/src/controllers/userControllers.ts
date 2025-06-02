import { IUser, UserRequestBody } from "../interfaces/user";
import { Response } from "express";
const Joi = require("joi");
const asyncHandler = require("express-async-handler");

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false); // 👈 Disallow unknown (extra) keys

const registerUser = asyncHandler(
  async (req: UserRequestBody<IUser>, res: Response) => {
    let userData: IUser = req.body;
    const { error } = userSchema.validate(userData);
    console.log(error);
    if (error) {
      throw new Error(error.details[0].message);
    } else {
      res.json(req.body);
    }
  },
);

export { registerUser };
