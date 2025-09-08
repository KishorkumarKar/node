import Joi from "joi";
export const add = Joi.object({
  name: Joi.string().required(),
  school_id: Joi.string().required(),
  class_id: Joi.string().required(),
  class_teacher: Joi.string().required(),
  number_of_class: Joi.number().required(),
  students: Joi.array().items(Joi.string().required()).min(1).required(),
  subjects: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().min(1).required(),
        teacher_id: Joi.string().min(1).required(),
      }),
    )
    .min(1)
    .required(),
  schedule: Joi.array()
    .items(
      Joi.object({
        day: Joi.string().min(1).required(),
        periods: Joi.array().items({
          start: Joi.string().min(1).required(),
          end: Joi.string().min(1).required(),
          subject: Joi.string().min(1).required(),
          teacher_id: Joi.string().min(1).required(),
        }),
      }),
    )
    .min(1)
    .required(),
});
