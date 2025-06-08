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
  registerUser: Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Email is required",
      "string.any": "Email not provider",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter valid Email",
      "string.empty": "Email is required",
      "string.any": "Email not provider",
    }),
    password: Joi.string().required().min(6).max(12).messages({
      "string.min": "Password Minimum 6 character required",
      "string.max": "Maximum 12 character allowed",
      "any.required": "Password is required",
    }),
    confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
      "string.empty": "Confirm Password is required",
      "any.required": "Confirm Password must match password",
    }),
    age: Joi.number().strict().messages({
      "string.empty": "Age Should be number",
    }),
  }),
};

export default userSchema;
