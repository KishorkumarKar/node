import { RequestHandler } from "express";
import quoteSchema from "./quoteSchema.middleware";
const addProductValidation: RequestHandler = (req, res, next) => {
  const body = req.body;
  const { error } = quoteSchema.addProduct.validate(body);
  if (error) {
    throw new Error(error.details[0].message);
  } else {
    next();
  }
};
export { addProductValidation };
