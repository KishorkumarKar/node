import Joi from "joi";

const userSchema = {
  loginUser: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter valid Email",
      "string.empty": "Email is required",
      "string.any": "Email not provider",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  }),
};

export default userSchema;
