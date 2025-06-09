import {
  IUser,
  UserRequestBody,
  UserLoginBody,
} from "../interfaces/user.interface";
import { Response } from "express";
import User from "../models/user.model";
import { STATUS } from "../constants/error.constant";
// const Joi = require("joi");
const asyncHandler = require("express-async-handler");

//----------Remove this to middleware------
/* const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false); // 👈 Disallow unknown (extra) keys */
//----------Remove this to middleware------

const registerUser = asyncHandler(
  async (req: UserRequestBody<IUser>, res: Response) => {
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
      const user = await User.create(req.body);
      console.log(`User created ${user}`);
      if (user) {
        return res
          .status(STATUS.NEW_DATA_CREATED)
          .json({ _id: user.id, email: user.email });
      } else {
        res.status(STATUS.VALIDATION_ERROR);
        throw new Error("User data is not valid");
      }
    } catch (error: any) {
      res.status(STATUS.BCRYPT_ERROR);
      throw new Error(error.message);
    }
  },
);

const loginUser = asyncHandler(
  async (req: UserLoginBody<IUser>, res: Response) => {
    try {
      const userData = req.body;
      const user = await User.findOne({ email: userData.email });
      res.json(user);
    } catch (error: any) {
      res.status(STATUS.BCRYPT_ERROR);
      throw new Error(error.message);
    }
  },
);

export { registerUser, loginUser };
