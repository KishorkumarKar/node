const express = require("express");
const {
  userRegister,
  customerLogin,
} = require("../controllers/user.controller");
const {
  registerUserValidation,
  loginValidation,
} = require("../middlewares/route/user/user.validation.middleware");
const router = express.Router();

router.post("/register", registerUserValidation, userRegister);
router.post("/login", loginValidation, customerLogin);

module.exports = router;
