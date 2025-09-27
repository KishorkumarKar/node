import Joi from "joi";

const addOrUpdate = Joi.object({
  name: Joi.string().min(3).required(),
  teacher_id: Joi.string()
    .regex(/^teacher_\d+$/)
    .min(3)
    .required()
    .messages({
      "string.pattern.base": "teacher_id should start with teacher_",
    }),
  gender: Joi.string().required(),
  school_id: Joi.string().required(),
  phone: Joi.string().required(),
  joining_date: Joi.date().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(13).required(),
  class: Joi.array().items(Joi.string()),
  subjects: Joi.array().required().items(Joi.string().required()),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(13).required(),
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

export { addOrUpdate, login, forgotPassword };
