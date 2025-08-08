const postSchema = require("./postSchema.validation.middleware");
const asyncHandler = require("express-async-handler");
const postCreation = asyncHandler(async (req, res, next) => {
  const { error, value } = postSchema.create.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  console.log(error);
  next();
});

module.exports = {
  postCreation,
};
