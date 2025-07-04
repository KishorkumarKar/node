const Joi = require("joi");
const userSchemaValidation = {
  register: Joi.object({
    email: Joi.string().min(3).max(30).email().required().messages({
      "string.email": "Please enter valid Email",
      "string.empty": "Email is required",
      "string.any": "Email not provider",
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    name: Joi.string().required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter valid Email",
      "string.empty": "Email is required",
      "string.any": "Email not provider",
    }),
    password: Joi.string().required(),
  }),
};

module.exports = userSchemaValidation;
