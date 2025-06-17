import Joi from "joi";

const quoteSchema = {
  addProduct: Joi.object({
    qty: Joi.number().integer().required().messages({
      "number.base": "Qty Integer number is required",
      "number.integer": "Qty Integer number is required.",
    }),
    sku: Joi.string().messages({
      "string.base": "Sku should be string",
      "string.empty": "Sku is required",
    }),
  }),
};

export default quoteSchema;
