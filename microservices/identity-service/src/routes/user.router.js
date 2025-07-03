const express = require("express");
const { userRegister } = require("../controllers/user.controller");
const {
  registerUserValidation,
} = require("../middlewares/route/user/user.validation.middleware");
const router = express.Router();

router.post("/register", registerUserValidation, userRegister);

module.exports = router;
