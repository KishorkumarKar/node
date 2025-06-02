import { RequestHandler } from "express";
import userSchema from "./userSchema.middleware";

const userLoginValidation: RequestHandler = (req, res, next) => {
  let userData = req.body;
  const { error } = userSchema.loginUser.validate(userData);
  console.log(error);
  if (error) {
    throw new Error(error.details[0].message);
  } else {
    res.json(req.body);
  }
};

export { userLoginValidation };
