import Joi from "joi";

export const add = Joi.object({
  name: Joi.string().required(),
  school_id: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  start_time: Joi.string().required(),
  // end_time:Joi.string().required(),
  class_duration: Joi.number().required(),
  break_time: Joi.number().required(),
  break_time_started: Joi.number().required(),
  address: {
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
  },
});

export const massDelete = Joi.object({
  ids: Joi.array().items(Joi.string().required()).min(1).required(),
});
