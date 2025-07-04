const userSchemaValidation = require("./user.validation.Schema.middleware");

const registerUserValidation = async (req, res, next) => {
  const { error, value } = userSchemaValidation.register.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  } else {
    next();
  }
};
const loginValidation = async (req, res, next) => {
  const { error, value } = userSchemaValidation.login.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  } else {
    next();
  }
};

module.exports = {
  registerUserValidation,
  loginValidation,
};
