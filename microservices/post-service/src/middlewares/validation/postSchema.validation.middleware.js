const joi = require("joi");
const postSchema = {
  create: joi.object({
    content: joi.string().required().max(150),
    mediaId: joi.array(),
  }),
};

module.exports = postSchema;
