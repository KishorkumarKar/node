import Joi from "joi";

const addOrUpdate = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(13).required(),
  class: Joi.array(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(13).required(),
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

export { addOrUpdate, login, forgotPassword };
